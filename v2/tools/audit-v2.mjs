/* Audit both released versions and check the preserved V1 tags. No mutations. */
import {readFileSync,existsSync} from 'node:fs';
import {resolve,dirname,relative,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const files=new Set(),missing=[];
function visit(file,from='entry') {
  if(files.has(file))return;
  const path=resolve(root,file);
  if(!existsSync(path)){missing.push({file,from});return;}
  files.add(file);
  if(!['.html','.css','.js','.svg'].includes(extname(file)))return;
  const text=readFileSync(path,'utf8'),refs=[];
  let base=dirname(file);
  const baseHref=extname(file)==='.html'?text.match(/<base\s+href="([^"]+)"/)?.[1]:null;
  if(baseHref)base=relative(root,resolve(root,dirname(file),baseHref));
  for(const match of text.matchAll(/\b(?:src|href|xlink:href)\s*=\s*["']([^"']+)["']/g))if(match[1]!==baseHref)refs.push([match[1],base]);
  for(const match of text.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g))refs.push([match[1],dirname(file)]);
  for(const match of text.matchAll(/@import\s*["']([^"']+)["']/g))refs.push([match[1],dirname(file)]);
  if(['assets/photography-content.js','assets/product-thumbnails.js'].includes(file))
    for(const match of text.matchAll(/["'](assets\/[^"']+)["']/g))refs.push([match[1],'']);
  for(const [ref,directory] of refs){
    if(/^(?:#|\$|[a-z][a-z\d+.-]*:|\/\/)/i.test(ref))continue;
    const pathname=decodeURIComponent(ref.split(/[?#]/)[0]);if(!pathname)continue;
    const target=resolve(root,directory,pathname);
    if(!target.startsWith(root+sep))throw Error('Reference outside workspace: '+ref);
    visit(relative(root,target).split(sep).join('/'),file);
  }
}
for(const page of ['index','shop','archive','photography','about','records-ten-remain'])visit(`v2/${page}.html`);
for(const page of ['home-dark','shop-dark','archive-dark','photography-dark','about-dark','records-ten-remain'])visit(`${page}.html`);
const v1Changes=execFileSync('git',['diff','--name-only','dark-site-v1','--','.'],{cwd:root,encoding:'utf8'}).trim();
const oldTag=execFileSync('git',['rev-parse','dark-home-shop-v1^{}'],{cwd:root,encoding:'utf8'}).trim();
const sealedTag=execFileSync('git',['rev-parse','dark-site-v1^{}'],{cwd:root,encoding:'utf8'}).trim();
console.log(JSON.stringify({dependencies:files.size,missing,v1Changes,oldTag,sealedTag,files:[...files].sort()},null,2));
// Current Dark refinements are authorized; the original snapshots stay in tags.
if(missing.length||oldTag!=='777f7135dd3b17f77c375f634efcf3247f7d09b3'||sealedTag!=='1536b6e709f86f95aaafe6c8e58be9b237d2c626')process.exitCode=1;
