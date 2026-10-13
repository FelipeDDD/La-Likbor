/* Run with Playwright MCP browser_run_code_unsafe(filename), from a local Shop
   gallery page. Deterministic browser resampling only; originals are untouched. */
async (page) => {
  const products = await page.evaluate(() => items.map(item => getProductImages(item)));
  const sources = [...new Set(products.filter(images => images.length > 1).flat())];
  const manifest = {};
  const report = [];
  for (const source of sources) {
    const response = await page.request.get(source);
    if (!response.ok()) throw new Error(`Thumbnail source failed (${response.status()}): ${source}`);
    const input = await response.body();
    const mime = response.headers()['content-type'];
    const encoded = await page.evaluate(async ({ base64, mime }) => {
      const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
      const bitmap = await createImageBitmap(new Blob([bytes], { type: mime }));
      const ratio = Math.min(1, 192 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(bitmap.width * ratio);
      canvas.height = Math.round(bitmap.height * ratio);
      const context = canvas.getContext('2d');
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      return { width: canvas.width, height: canvas.height, base64: canvas.toDataURL('image/webp', .86).split(',')[1] };
    }, { base64: input.toString('base64'), mime });
    const filename = new URL(source).pathname.split('/').at(-3) + '.webp';
    const path = 'assets/product-thumbnails/' + filename;
    const output = Buffer.from(encoded.base64, 'base64');
    manifest[source] = path;
    report.push({ path, width: encoded.width, height: encoded.height, bytes: output.length, sourceBytes: input.length, base64: encoded.base64 });
  }
  // The caller writes these small derived files and the URL-to-thumbnail map.
  return { images: report, manifest, bytes: report.reduce((total, item) => total + item.bytes, 0),
    originalBytes: report.reduce((total, item) => total + item.sourceBytes, 0) };
}
