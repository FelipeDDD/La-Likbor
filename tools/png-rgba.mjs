/* Small dependency-free codec for the project's noninterlaced RGBA8 assets. */
import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync, deflateSync } from 'node:zlib';
const paeth=(a,b,c)=>{const p=a+b-c,da=Math.abs(p-a),db=Math.abs(p-b),dc=Math.abs(p-c);return da<=db&&da<=dc?a:db<=dc?b:c;};
export function readPng(path) {
  const f=readFileSync(path),w=f.readUInt32BE(16),h=f.readUInt32BE(20),parts=[];
  if(f[24]!==8||f[25]!==6||f[28]!==0)throw Error('Expected noninterlaced RGBA8 PNG');
  for(let p=8;p<f.length;){const n=f.readUInt32BE(p);if(f.toString('ascii',p+4,p+8)==='IDAT')parts.push(f.subarray(p+8,p+8+n));p+=n+12;}
  const packed=inflateSync(Buffer.concat(parts)),data=Buffer.alloc(w*h*4),stride=w*4;
  for(let y=0;y<h;y++)for(let x=0;x<stride;x++){
    const i=y*stride+x,a=x>=4?data[i-4]:0,b=y?data[i-stride]:0,c=y&&x>=4?data[i-stride-4]:0;
    data[i]=(packed[y*(stride+1)+x+1]+[0,a,b,Math.floor((a+b)/2),paeth(a,b,c)][packed[y*(stride+1)]])&255;
  }
  return {w,h,data};
}
const table=Array.from({length:256},(_,v)=>{for(let k=0;k<8;k++)v=v&1?0xedb88320^v>>>1:v>>>1;return v>>>0;});
function chunk(type,data){const b=Buffer.alloc(data.length+12);b.writeUInt32BE(data.length);b.write(type,4);data.copy(b,8);let v=0xffffffff;for(const n of b.subarray(4,data.length+8))v=table[(v^n)&255]^v>>>8;b.writeUInt32BE((v^0xffffffff)>>>0,data.length+8);return b;}
export function savePng(path,{w,h,data}){
  const hdr=Buffer.alloc(13);hdr.writeUInt32BE(w);hdr.writeUInt32BE(h,4);hdr[8]=8;hdr[9]=6;
  const rows=Buffer.alloc((w*4+1)*h);for(let y=0;y<h;y++)data.copy(rows,y*(w*4+1)+1,y*w*4,(y+1)*w*4);
  writeFileSync(path,Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',hdr),chunk('IDAT',deflateSync(rows,{level:9})),chunk('IEND',Buffer.alloc(0))]));
}
export const plane=(w,h)=>({w,h,data:Buffer.alloc(w*h*4)});
export function crop(source,x,y,w,h){const result=plane(w,h);for(let row=0;row<h;row++)source.data.copy(result.data,row*w*4,((y+row)*source.w+x)*4,((y+row)*source.w+x+w)*4);return result;}
export function place(canvas,source,{region,target,rotation=0,strength=1,cap=255}){
  const [sx,sy,w,h]=region,[dx,dy]=target;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
    const xx=dx+(rotation===90?h-1-y:x),yy=dy+(rotation===90?x:y);
    if(xx<0||yy<0||xx>=canvas.w||yy>=canvas.h)continue;
    const si=((sy+y)*source.w+sx+x)*4,di=(yy*canvas.w+xx)*4;
    const edge=Math.max(0,Math.min(1,(x+.5)/5,(w-x-.5)/5,(y+.5)/8,(h-y-.5)/8));
    const a=Math.round(Math.min(cap,source.data[si+3]*strength)*edge);
    if(a<=canvas.data[di+3])continue;source.data.copy(canvas.data,di,si,si+3);canvas.data[di+3]=a;
  }
}
