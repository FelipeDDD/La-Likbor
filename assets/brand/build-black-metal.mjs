/* Original outline study: hand-drawn glyphs + deterministic tapered branches.
   No mockup tracing, font file, raster image or external dependency. */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const out = fileURLToPath(new URL('./', import.meta.url));
let seed = 1729;
const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
const f = value => Number(value.toFixed(2));
const glyphs = [
  ['L', 120, 135, 'M25-13C12 0 14 16 9 22L15 126C17 151-7 151-17 155C19 161 35 149 60 154L87 162L101 129L89 136C74 148 42 132 38 136L40 31L50 19L36 6Z'],
  ['a', 235, 190, 'M8 8L38-6L62 7L62 76L75 78L61 94L45 83L45 68L19 88L0 77L0 29ZM18 28L18 68L30 76L45 62L45 20L34 11Z'],
  ['L', 365, 135, 'M25-13C12 0 14 16 9 22L15 126C17 151-7 151-17 155C19 161 35 149 60 154L87 162L101 129L89 136C74 148 42 132 38 136L40 31L50 19L36 6Z'],
  ['i', 468, 190, 'M10-30L25-44L39-29L25-14ZM12 10L28 1L28 66L39 74L25 88L8 76L10 24L2 19Z'],
  ['k', 520, 142, 'M8-12L27-23L28 112L37 121L19 137L5 124L7 17L0 10ZM26 77L65 39L81 46L53 73L37 85L68 113L78 111L87 128L70 143L50 126L27 98Z'],
  ['b', 608, 141, 'M8-8L28-23L28 61L48 42L76 53L80 113L51 141L11 131L10 14L0 7ZM29 76L29 120L47 129L60 115L58 65L47 59Z'],
  ['ø', 710, 190, 'M3 21L33-4L67 12L77 64L44 89L10 76ZM23 25L26 62L42 75L57 61L53 26L40 10Z'],
  ['r', 801, 190, 'M7 12L24-3L38 13L55-4L73 10L57 30L43 17L33 28L32 64L45 77L26 89L9 77L11 28L0 22Z'],
];
const outlines = glyphs.map(([letter, x, y, d]) => `<path data-letter="${letter}" transform="translate(${x} ${y})" fill-rule="evenodd" d="${d}"/>`);
// The slash is its own path so the ø cannot be lost to the counter's even-odd fill.
outlines.push('<path data-letter="ø-slash" d="M703 281L721 277L792 177L773 181Z"/>');

function curvePoint(points, t) {
  const [a, b, c, d] = points, u = 1 - t;
  return [u*u*u*a[0] + 3*u*u*t*b[0] + 3*u*t*t*c[0] + t*t*t*d[0], u*u*u*a[1] + 3*u*u*t*b[1] + 3*u*t*t*c[1] + t*t*t*d[1]];
}
function branch(x, y, endX, endY, width, depth = 2) {
  const dx = endX-x, dy = endY-y, length = Math.hypot(dx,dy);
  const bend = (random()-.5)*length*.45;
  const points = [[x,y],[x+dx*.3-dy/length*bend,y+dy*.3+dx/length*bend],[x+dx*.7+dy/length*bend*.45,y+dy*.7-dx/length*bend*.45],[endX,endY]];
  const left=[], right=[];
  for(let i=0;i<=12;i++) {
    const t=i/12, p=curvePoint(points,t), next=curvePoint(points,Math.min(1,t+.005)), previous=curvePoint(points,Math.max(0,t-.005));
    const vx=next[0]-previous[0],vy=next[1]-previous[1],l=Math.hypot(vx,vy)||1;
    const w=width*Math.pow(1-t,1.3)*(.86+random()*.28)/2;
    left.push([p[0]-vy/l*w,p[1]+vx/l*w]); right.push([p[0]+vy/l*w,p[1]-vx/l*w]);
  }
  outlines.push(`<path d="M${[...left,...right.reverse()].map(p=>p.map(f).join(' ')).join('L')}Z"/>`);
  if(depth===0)return;
  for(let i=0;i<3;i++) {
    const t=.25+i*.23,p=curvePoint(points,t),direction=i%2===0?1:-1;
    const angle=Math.atan2(dy,dx)+direction*(.5+random()*.8),twig=length*(.13+random()*.13)*(1-t*.4);
    branch(p[0],p[1],p[0]+Math.cos(angle)*twig,p[1]+Math.sin(angle)*twig,width*.4,depth-1);
  }
}
const roots = [
  [142,150,125,56,7],[150,163,203,95,3.5],[138,220,61,169,3],[139,243,53,268,3],
  [143,282,88,363,6],[169,281,201,378,4],[187,283,249,325,2.5],
  [244,199,219,151,2],[295,208,321,156,2],[249,270,233,349,4],[293,273,318,331,2.5],
  [386,143,426,56,6],[387,162,358,92,3],[383,276,347,387,5.5],[407,282,457,356,4],
  [487,269,478,356,3],[483,153,468,116,2],[533,139,557,78,4],[546,161,570,121,2],
  [535,272,512,401,4],[585,272,613,339,3],[627,131,607,70,4],[639,170,665,130,2],
  [624,273,653,372,4.5],[665,273,692,343,3],[722,213,694,173,2],[768,197,804,129,2.7],
  [731,275,719,365,3.5],[758,274,795,331,3],[819,208,844,159,2],[864,205,925,146,3],
  [852,233,960,204,3],[822,273,848,381,4],[854,266,932,330,3.5],
];
roots.forEach(([x,y,ex,ey,w])=>branch(x,y,ex,ey,w*1.25));
// Irregular root-like shoulders interrupt the otherwise geometric glyph edges.
for(const [x,start,end,direction] of [[135,174,256,-1],[159,174,256,1],[380,174,256,-1],[404,174,256,1],[479,218,253,-1],[496,218,253,1],[528,164,250,-1],[546,155,208,1],[620,158,252,-1],[636,156,187,1]]) {
  for(let y=start;y<end;y+=9+random()*5) branch(x,y,x+direction*(4+random()*9),y-6-random()*12,2+random()*2,0);
}
// Small tapered spurs attach to the glyph silhouettes; counters remain open.
const spurs=[[134,174,-10,-13],[135,199,12,-11],[143,240,-14,8],[241,220,-10,-10],[294,239,14,12],[377,178,-12,-13],[379,228,14,9],[390,252,-11,9],[480,220,-9,-12],[527,184,-11,-13],[530,230,-12,8],[569,235,17,-9],[620,183,-11,-14],[625,235,-10,13],[675,220,15,9],[716,229,-10,8],[777,229,13,-9],[813,236,-10,-12],[856,204,12,-7]];
spurs.forEach(([x,y,dx,dy])=>branch(x,y,x+dx,y+dy,3.3,0));
const cuts=[];
for(const [x,top,bottom] of [[147,156,265],[392,156,264],[535,146,267],[625,151,259],[485,211,261]]) {
  cuts.push(`<path d="M${x} ${top}q-3 17 1 30t-1 31t2 ${bottom-top-61}" fill="none" stroke="#000" stroke-width="1.3"/>`);
}
for(let i=0;i<150;i++){const x=125+random()*750,y=130+random()*150;cuts.push(`<path d="M${f(x)} ${f(y)}l${f(random()*2+1)} ${f(random()*3+1)}" stroke="#000" stroke-width="${f(random()*.8+.35)}"/>`);}
for(const [variant,ink] of [['ivory','#ded2c2'],['bronze','#a78a65']]) {
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 440" role="img" aria-labelledby="title desc"><title id="title">La Likbør</title><desc id="desc">Original black metal lettering study: branching roots, dry thorns and a clearly slashed ø. ${variant} on a transparent background.</desc><defs><mask id="wear" maskUnits="userSpaceOnUse" x="0" y="0" width="1040" height="440"><path fill="#fff" d="M0 0h1040v440H0z"/>${cuts.join('')}</mask></defs><g fill="${ink}" mask="url(#wear)">${outlines.join('')}</g></svg>`;
  writeFileSync(out+`la-likbor-black-metal-${variant}.svg`,svg);
}
console.log('Black metal: two standalone transparent SVG variants.');
