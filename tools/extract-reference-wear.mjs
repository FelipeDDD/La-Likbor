/* Deterministic matting of safe continuous regions in the supplied mockup.
   No AI generation, resampling, duplicated fragments or external dependencies. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { inflateSync, deflateSync } from 'node:zlib';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = resolve(root, 'assets/exemplos/base inicial.png');
const output = resolve(root, 'assets/bordas/continuous-reference');
const source = readFileSync(sourcePath);
const width = source.readUInt32BE(16), sourceHeight = source.readUInt32BE(20), height = 560;
if (source[24] !== 8 || source[25] !== 2 || source[28] !== 0) throw new Error('Expected non-interlaced RGB8 PNG.');
const chunks = [];
for (let offset = 8; offset < source.length;) {
  const length = source.readUInt32BE(offset), type = source.toString('ascii', offset + 4, offset + 8);
  if (type === 'IDAT') chunks.push(source.subarray(offset + 8, offset + 8 + length));
  offset += length + 12;
}
const scanlines = inflateSync(Buffer.concat(chunks)), stride = width * 3;
const rgb = Buffer.alloc(stride * height);
function paeth(a, b, c) { const p = a + b - c, da = Math.abs(p - a), db = Math.abs(p - b), dc = Math.abs(p - c); return da <= db && da <= dc ? a : db <= dc ? b : c; }
for (let y = 0; y < height; y++) {
  const filter = scanlines[y * (stride + 1)];
  for (let x = 0; x < stride; x++) {
    const index = y * stride + x, a = x >= 3 ? rgb[index - 3] : 0, b = y ? rgb[index - stride] : 0, c = y && x >= 3 ? rgb[index - stride - 3] : 0;
    const predictors = [0, a, b, Math.floor((a + b) / 2), paeth(a, b, c)];
    rgb[index] = (scanlines[y * (stride + 1) + 1 + x] + predictors[filter]) & 255;
  }
}

// Original coordinates are retained. These regions join at the perimeter;
// no circle, lettering or miniature fragments are reconstructed.
const regions = [
  { id: 'left-continuous', feather: 5, polygon: [[0,0],[94,0],[94,24],[67,45],[100,60],[100,95],[73,105],[67,135],[67,350],[75,375],[76,510],[105,520],[105,560],[0,560]] },
  { id: 'right-continuous', feather: 5, polygon: [[1038,0],[1122,0],[1122,560],[1020,560],[1020,525],[1040,510],[1050,390],[1058,360],[1058,242],[1040,220],[1042,80],[1038,65]] },
  { id: 'upper-black', feather: 4, polygon: [[65,47],[405,47],[405,63],[65,63]] },
  { id: 'top-black', feather: 4, polygon: [[36,0],[430,0],[416,20],[100,19],[92,25],[36,25]] },
  { id: 'lower-black', feather: 6, polygon: [[38,513],[362,513],[362,558],[38,558]] }
];
const exclusions = [
  { id: 'lettering-and-orbit', polygon: [[65,100],[105,75],[458,75],[458,360],[75,370],[65,345]] },
  { id: 'navigation', polygon: [[74,20],[425,20],[425,47],[74,47]] },
  { id: 'copy-buttons-rule', polygon: [[75,332],[415,332],[415,511],[75,511]] },
  { id: 'right-navigation', polygon: [[975,10],[1075,10],[1075,65],[975,65]] },
  { id: 'right-copy-symbol', polygon: [[978,235],[1058,235],[1058,395],[978,395]] },
  { id: 'photograph', polygon: [[405,0],[970,0],[1040,70],[1040,235],[1058,242],[1058,360],[1044,395],[1020,520],[990,565],[375,565],[375,510],[405,450],[430,355],[458,325],[458,90]] }
];
function inside(x, y, polygon) {
  let result = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [ax, ay] = polygon[i], [bx, by] = polygon[j];
    if ((ay > y) !== (by > y) && x < (bx - ax) * (y - ay) / (by - ay) + ax) result = !result;
  }
  return result;
}
function boundaryDistance(x, y, polygon) {
  let distance = Infinity;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [ax, ay] = polygon[i], [bx, by] = polygon[j], dx = bx - ax, dy = by - ay;
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
    distance = Math.min(distance, Math.hypot(x - ax - t * dx, y - ay - t * dy));
  }
  return distance;
}
const luminance = new Float32Array(width * height);
for (let i = 0; i < luminance.length; i++) luminance[i] = .2126 * rgb[i * 3] + .7152 * rgb[i * 3 + 1] + .0722 * rgb[i * 3 + 2];
function morphology(input, horizontal, minimum) {
  const result = new Float32Array(input.length);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    let value = minimum ? Infinity : -Infinity;
    for (let d = -3; d <= 3; d++) {
      const xx = horizontal ? Math.max(0, Math.min(width - 1, x + d)) : x;
      const yy = horizontal ? y : Math.max(0, Math.min(height - 1, y + d));
      value = minimum ? Math.min(value, input[yy * width + xx]) : Math.max(value, input[yy * width + xx]);
    }
    result[y * width + x] = value;
  }
  return result;
}
// Opening estimates the slow dark substrate. Subtraction removes that matte,
// preserving the positive original line/print detail; it never creates strokes.
const substrate = morphology(morphology(morphology(morphology(luminance, true, true), false, true), true, false), false, false);
const normal = Buffer.alloc(width * height * 4), enhanced = Buffer.alloc(normal.length);
let accepted = 0;
for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
  if (exclusions.some(region => inside(x + .5, y + .5, region.polygon))) continue;
  let weight = 0;
  for (const region of regions) if (inside(x + .5, y + .5, region.polygon)) weight = Math.max(weight, Math.min(1, boundaryDistance(x + .5, y + .5, region.polygon) / region.feather));
  if (!weight) continue;
  const pixel = y * width + x, base = substrate[pixel];
  const signal = luminance[pixel] - base;
  if (signal <= 3) continue;
  const peak = Math.max(rgb[pixel * 3], rgb[pixel * 3 + 1], rgb[pixel * 3 + 2]);
  const alpha = Math.min(1, (signal - 3) / 175) ** .92 * weight;
  if (alpha * 255 < 1) continue;
  // Preserve the source chromatic ratios; scalar matting affects alpha only.
  for (let channel = 0; channel < 3; channel++) normal[pixel * 4 + channel] = enhanced[pixel * 4 + channel] = Math.round(195 * rgb[pixel * 3 + channel] / peak);
  normal[pixel * 4 + 3] = Math.round(alpha * 255);
  enhanced[pixel * 4 + 3] = Math.round(Math.min(1, alpha * 2.4) * 255);
  accepted++;
}

const crcTable = Array.from({ length: 256 }, (_, n) => { for (let k = 0; k < 8; k++) n = n & 1 ? 0xedb88320 ^ n >>> 1 : n >>> 1; return n >>> 0; });
function crc(bytes) { let value = 0xffffffff; for (const byte of bytes) value = crcTable[(value ^ byte) & 255] ^ value >>> 8; return (value ^ 0xffffffff) >>> 0; }
function chunk(type, data) {
  const result = Buffer.alloc(data.length + 12); result.writeUInt32BE(data.length); result.write(type, 4); data.copy(result, 8);
  result.writeUInt32BE(crc(result.subarray(4, data.length + 8)), data.length + 8); return result;
}
function savePng(name, data, w, h) {
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  const rows = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) data.copy(rows, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  writeFileSync(resolve(output, name), Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(rows, { level: 9 })), chunk('IEND', Buffer.alloc(0))]));
}
function crop(data, x, y, w, h) {
  const result = Buffer.alloc(w * h * 4);
  for (let row = 0; row < h; row++) data.copy(result, row * w * 4, ((y + row) * width + x) * 4, ((y + row) * width + x + w) * 4);
  return result;
}
mkdirSync(output, { recursive: true });
for (const [name, data] of [['normal', normal], ['enhanced', enhanced]]) {
  savePng(`reference-wear-${name}.png`, data, width, height);
  savePng(`reference-wear-${name}-left.png`, crop(data, 0, 0, 112, height), 112, height);
  savePng(`reference-wear-${name}-right.png`, crop(data, width - 112, 0, 112, height), 112, height);
  savePng(`reference-wear-${name}-lower.png`, crop(data, 112, 513, 250, 45), 250, 45);
}
writeFileSync(resolve(output, 'extraction-map.json'), JSON.stringify({ source: 'assets/exemplos/base inicial.png', sourceSha256: createHash('sha256').update(source).digest('hex'), sourceWidth: width, sourceHeight, outputHeight: height, regions, exclusions, intensities: { normal: 1, enhanced: 2.4 }, acceptedPixels: accepted, mobileCrops: { left: [0,0,112,height], right: [width-112,0,112,height], lower: [112,513,250,45] } }, null, 2));
console.log(JSON.stringify({ output, acceptedPixels: accepted, dimensions: [width, height], intensities: [1, 2.4] }));
