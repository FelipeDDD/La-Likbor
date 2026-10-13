/* Audit declared local dependencies; never delete files or change the Git index. */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, extname, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = new Set();
const missing = [];
function visit(file, from = 'entrypoint') {
  if (files.has(file)) return;
  if (!existsSync(resolve(root, file))) { missing.push({ file, from }); return; }
  files.add(file);
  if (!['.html', '.css', '.js', '.svg'].includes(extname(file))) return;
  const source = readFileSync(resolve(root, file), 'utf8');
  const refs = [];
  if (['.html', '.svg'].includes(extname(file))) {
    for (const match of source.matchAll(/\b(?:src|href|xlink:href)\s*=\s*["']([^"']+)["']/g)) refs.push(match[1]);
  }
  for (const match of source.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)) refs.push(match[1].trim());
  for (const match of source.matchAll(/(?:@import\s*|\bfrom\s*)["']([^"']+)["']/g)) refs.push(match[1]);
  // The thumbnail manifest contains root-relative asset paths used dynamically.
  if (file === 'assets/product-thumbnails.js') {
    for (const match of source.matchAll(/["'](assets\/product-thumbnails\/[^"']+)["']/g)) refs.push('/' + match[1]);
  }
  for (const ref of refs) {
    if (/^(?:#|[a-z][a-z\d+.-]*:|\/\/|\$)/i.test(ref)) continue;
    const pathname = decodeURIComponent(ref.split(/[?#]/)[0]);
    if (!pathname || pathname === './') continue;
    const target = resolve(root, pathname.startsWith('/') ? '.' + pathname : dirname(file) + '/' + pathname);
    if (!target.startsWith(root + sep)) throw new Error(`Dependency outside workspace: ${ref}`);
    visit(relative(root, target).split(sep).join('/'), file);
  }
}
// Explicit entries allow reviewing separate Dark pages without changing index.html.
const entrypoints = process.argv.slice(2);
for (const entry of entrypoints.length ? entrypoints : ['homepage.html', 'index.html']) visit(entry);
function walk(directory) {
  return readdirSync(resolve(root, directory), { withFileTypes: true }).flatMap(entry => {
    const path = directory + '/' + entry.name;
    return entry.isDirectory() ? walk(path) : [path];
  });
}
const unusedAssets = walk('assets').filter(file => !files.has(file)).sort();
console.log(JSON.stringify({ files: [...files].sort(), missing, unusedAssets }, null, 2));
if (missing.length) process.exitCode = 1;
