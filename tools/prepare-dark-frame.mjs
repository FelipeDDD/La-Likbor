/* Reuse prepared reference ink. No drawing, AI, interpolation or asset edits.
   Four continuous fields form the companion layer; card variants use longer
   perimeter runs from the same accepted Acentuada material at native scale. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { inflateSync, deflateSync } from 'node:zlib';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const input = 'assets/bordas/continuous-reference/reference-wear-enhanced.png';
const output = resolve(root, 'assets/bordas/dark-frame');
const file = readFileSync(resolve(root, input));
const sw = file.readUInt32BE(16), sh = file.readUInt32BE(20);
if (file[24] !== 8 || file[25] !== 6 || file[28] !== 0) throw new Error('Expected RGBA8 PNG.');
const chunks = [];
for (let p = 8; p < file.length;) {
  const n = file.readUInt32BE(p);
  if (file.toString('ascii', p + 4, p + 8) === 'IDAT') chunks.push(file.subarray(p + 8, p + 8 + n));
  p += n + 12;
}
const packed = inflateSync(Buffer.concat(chunks)), source = Buffer.alloc(sw * sh * 4), stride = sw * 4;
const paeth = (a,b,c) => { const p=a+b-c, da=Math.abs(p-a), db=Math.abs(p-b), dc=Math.abs(p-c); return da<=db&&da<=dc?a:db<=dc?b:c; };
for (let y=0;y<sh;y++) for (let x=0;x<stride;x++) {
  const i=y*stride+x, a=x>=4?source[i-4]:0, b=y?source[i-stride]:0, c=y&&x>=4?source[i-stride-4]:0;
  source[i]=(packed[y*(stride+1)+1+x]+[0,a,b,Math.floor((a+b)/2),paeth(a,b,c)][packed[y*(stride+1)]])&255;
}
const fields = [
  {id:'top', source:[1060,70,30,190], rotation:90, target:[145,0], strength:.72, cap:110},
  {id:'orbit-left', source:[35,135,28,140], rotation:0, target:[82,136], strength:.65, cap:85},
  {id:'orbit-upper', source:[1062,330,28,145], rotation:90, target:[148,58], strength:.65, cap:85},
  {id:'lower', source:[38,513,65,45], rotation:0, target:[155,514], strength:.72, cap:90}
];
function plane(w,h) { return {w,h,data:Buffer.alloc(w*h*4)}; }
function place(canvas, field) {
  const [sx,sy,w,h]=field.source, [dx,dy]=field.target;
  for (let y=0;y<h;y++) for(let x=0;x<w;x++) {
    const xx=dx+(field.rotation===90?h-1-y:x), yy=dy+(field.rotation===90?x:y);
    if(xx<0||yy<0||xx>=canvas.w||yy>=canvas.h)continue;
    const si=((sy+y)*sw+sx+x)*4, di=(yy*canvas.w+xx)*4;
    // Feather only the crop perimeter, in the saved alpha. No CSS compensation.
    const edge=Math.min(1,(x+.5)/5,(w-x-.5)/5,(y+.5)/8,(h-y-.5)/8);
    const alpha=Math.round(Math.min(field.cap,source[si+3]*field.strength)*Math.max(0,edge));
    if(alpha<=canvas.data[di+3])continue;
    source.copy(canvas.data,di,si,si+3);canvas.data[di+3]=alpha;
  }
}
const table=Array.from({length:256},(_,v)=>{for(let k=0;k<8;k++)v=v&1?0xedb88320^v>>>1:v>>>1;return v>>>0;});
function chunk(type,data) {
  const b=Buffer.alloc(data.length+12);b.writeUInt32BE(data.length);b.write(type,4);data.copy(b,8);
  let v=0xffffffff;for(const n of b.subarray(4,data.length+8))v=table[(v^n)&255]^v>>>8;
  b.writeUInt32BE((v^0xffffffff)>>>0,data.length+8);return b;
}
function save(name,canvas) {
  const hdr=Buffer.alloc(13);hdr.writeUInt32BE(canvas.w);hdr.writeUInt32BE(canvas.h,4);hdr[8]=8;hdr[9]=6;
  const rows=Buffer.alloc((canvas.w*4+1)*canvas.h);
  for(let y=0;y<canvas.h;y++)canvas.data.copy(rows,y*(canvas.w*4+1)+1,y*canvas.w*4,(y+1)*canvas.w*4);
  writeFileSync(resolve(output,name),Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',hdr),chunk('IDAT',deflateSync(rows,{level:9})),chunk('IEND',Buffer.alloc(0))]));
}
mkdirSync(output,{recursive:true});
const supplement=plane(sw,sh);fields.forEach(f=>place(supplement,f));save('companion.png',supplement);
for(const f of fields) {
  const [, ,w,h]=f.source, part=plane(f.rotation===90?h:w,f.rotation===90?w:h);
  place(part,{...f,target:[0,0]});save(`companion-${f.id}.png`,part);
}
const cardFields = {
  photography:[
    {source:[12,260,53,250],target:[-7,0],rotation:0},
    {source:[1070,65,47,250],target:[321,0],rotation:0},
    {source:[0,25,30,250],target:[57,-19],rotation:90},
    {source:[112,513,250,45],target:[63,215],rotation:0}
  ],
  collections:[
    {source:[12,40,53,250],target:[-7,0],rotation:0},
    {source:[1070,300,47,250],target:[321,0],rotation:0},
    {source:[1080,110,30,250],target:[43,-19],rotation:90},
    {source:[112,513,250,45],target:[38,215],rotation:0}
  ]
};
for(const [name,regions] of Object.entries(cardFields)) {
  const base=plane(360,250);regions.forEach(f=>place(base,{...f,strength:.60,cap:130}));save(`card-${name}-base.png`,base);
  const detail=plane(360,250);
  place(detail,{...fields[0],target:[75,0],strength:.52,cap:75});
  // A second, noncoincident original fine crease near the lower perimeter.
  place(detail,{source:[42,525,68,28],rotation:0,target:[name==='photography'?37:271,218],strength:.52,cap:75});
  save(`card-${name}-companion.png`,detail);
}
writeFileSync(resolve(output,'preparation-map.json'),JSON.stringify({source:input,sha256:createHash('sha256').update(file).digest('hex'),hero:{size:[sw,sh],fields},cards:{size:[360,250],fields:cardFields},notes:'Original reference RGB retained. Native pixel regions, quarter turns only. Alpha prepared in PNG; normal compositing, no CSS masks. Card companion uses top and lower fields only.'},null,2));
console.log('Dark frame assets prepared; accepted continuous base untouched.');
