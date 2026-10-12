/* Deterministic visibility masks only. Existing wear images remain unchanged. */
import { readPng } from './png-rgba.mjs';
import { writeFileSync } from 'node:fs';

let state = 0x1a11cb07;
const random = () => {
  state += 0x6d2b79f5;
  let n = Math.imul(state ^ state >>> 15, 1 | state);
  n ^= n + Math.imul(n ^ n >>> 7, 61 | n);
  return ((n ^ n >>> 14) >>> 0) / 4294967296;
};
const number = n => n.toFixed(2);

function build(source, regions, path) {
  const { w, h, data } = source;
  const erased = new Uint8Array(w * h);
  const shapes = [];
  const stats = [];
  const columns = Math.ceil(w / 16);
  const totals = new Uint16Array(columns * Math.ceil(h / 16));
  const used = new Uint16Array(totals.length);
  const cell = (x, y) => Math.floor(y / 16) * columns + Math.floor(x / 16);
  const ink = (x, y) => data[(y * w + x) * 4 + 3] > 8;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (ink(x, y)) totals[cell(x, y)]++;
  }
  function cut(cx, cy, rx, ry, angle) {
    const points = [];
    const demand = new Map();
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const radius = Math.max(rx, ry);
    for (let y = Math.max(0, Math.floor(cy-radius)); y <= Math.min(h-1, Math.ceil(cy+radius)); y++) {
      for (let x = Math.max(0, Math.floor(cx-radius)); x <= Math.min(w-1, Math.ceil(cx+radius)); x++) {
        const dx=x+.5-cx, dy=y+.5-cy;
        if (((dx*cos+dy*sin)/rx)**2 + ((dy*cos-dx*sin)/ry)**2 > 1) continue;
        if (!ink(x, y) || erased[y*w+x]) continue;
        points.push([x,y]);
        const id=cell(x,y); demand.set(id,(demand.get(id)||0)+1);
      }
    }
    if (!points.length) return 0;
    // Never clear a broad patch: retain at least 56% of every 16px ink field.
    for (const [id, amount] of demand) if (used[id]+amount > Math.max(1,totals[id]*.44)) return 0;
    for (const [x,y] of points) { erased[y*w+x]=1; used[cell(x,y)]++; }
    shapes.push(`<ellipse cx="${number(cx)}" cy="${number(cy)}" rx="${number(rx)}" ry="${number(ry)}" transform="rotate(${number(angle*180/Math.PI)} ${number(cx)} ${number(cy)})"/>`);
    return points.length;
  }
  for (const region of regions) {
    const { x0, x1, target, spine } = region;
    const candidates=[];
    let total=0;
    for (let y=0;y<h;y++) for(let x=x0;x<x1;x++) if(ink(x,y)) {
      total++;
      // The very top corners retain their strongest wear.
      if(y>22 && y<h-5) candidates.push([x,y]);
    }
    let removed=0;
    // Tiny uneven interruptions of the straight support trace, not long gaps.
    if(spine!==undefined) for(let n=0;n<85;n++) {
      removed+=cut(spine+(random()-.5)*3, 25+random()*(h-36), .8+random()*.9, .9+random()*1.7, (random()-.5)*.45);
    }
    for(let tries=0;removed<total*target && tries<30000;tries++) {
      const [x,y]=candidates[Math.floor(random()*candidates.length)];
      // Micro-openings stay under 6px across, unlike the earlier large fields.
      removed+=cut(x+random(),y+random(),.75+random()*1.65,.65+random()*2.25,random()*Math.PI);
    }
    stats.push({ side:region.side, totalInkPixels:total, removedInkPixels:removed, removedPercent:Number((100*removed/total).toFixed(1)) });
  }
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<!-- Fixed-seed micro-openings in existing ink; this asset contains no new wear. -->
<defs><mask id="ink" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}" style="mask-type:luminance"><rect width="${w}" height="${h}" fill="white"/><g fill="black">${shapes.join('\n')}</g></mask></defs>
<rect width="${w}" height="${h}" fill="white" mask="url(#ink)"/>
</svg>\n`;
  writeFileSync(path,svg);
  return {path,openings:shapes.length,stats};
}

const directory='assets/bordas/dark-frame-consolidated/';
const results=[
  build(readPng(directory+'reference-wear-enhanced.png'),[
    {side:'left',x0:0,x1:112,target:.25,spine:26},
    {side:'right',x0:1010,x1:1122,target:.22,spine:1096}
  ],'assets/masks/wear-scattered-review.svg'),
  build(readPng(directory+'transition-left.png'),[
    {side:'left connection',x0:0,x1:110,target:.21}
  ],'assets/masks/wear-scattered-transition.svg')
];
console.log(JSON.stringify(results,null,2));
