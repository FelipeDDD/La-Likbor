/* Playwright MCP: open shop-dark.html at the requested viewport, then run this
   file with browser_run_code_unsafe(filename). Checks the expanded catalog and
   new galleries; the previous six-product gallery matrix is not repeated. */
async (page) => {
  const origin = new URL(page.url()).origin;
  const width = page.viewportSize().width;
  const report = { width, errors: [], failedResponses: [], filters: [], galleries: [] };
  const onError = e => report.errors.push(e.message);
  const onConsole = e => { if (e.type() === 'error') report.errors.push(e.text()); };
  const onResponse = r => { if (r.status() >= 400) report.failedResponses.push({ url: r.url(), status: r.status() }); };
  page.on('pageerror', onError); page.on('console', onConsole); page.on('response', onResponse);
  const check = (value, message) => { if (!value) throw new Error(message); };
  const imageReady = async source => {
    await page.evaluate(source => { window.catalogAuditStep = 'Waiting for ' + source; }, source);
    return page.waitForFunction(source => {
    const image = document.getElementById('modalImage');
    return image.src === source && image.complete && image.naturalWidth > 0 && !image.hidden;
    }, source);
  };
  try {
    await page.goto(origin + '/shop-dark.html');
    await page.evaluate(() => document.fonts.ready);
    const catalog = await page.evaluate(() => items.map(p => ({ ...p, images: getProductImages(p) })));
    check(catalog.length === 12, 'Expected twelve verified products');
    check(new Set(catalog.map(p => p.url)).size === 12, 'Duplicate listings');
    check(await page.locator('#intensity').inputValue() === 'ritual', 'Ritual default');
    report.initialImagesLoaded = await page.locator('#gallery .pic img').evaluateAll(imgs => imgs.filter(i => i.complete && i.naturalWidth).length);
    for (const [category, count] of [['garments', 6], ['records', 5], ['accessories', 1], ['all', 12]]) {
      await page.locator(`[data-filter="${category}"]`).click();
      check(await page.locator('#gallery .product').count() === count, 'Category count: ' + category);
      check((await page.locator('#resultCount').innerText()).startsWith(String(count).padStart(2, '0')), 'Result counter');
      check(await page.locator(`[data-filter="${category}"]`).getAttribute('aria-pressed') === 'true', 'Active category state');
      report.filters.push({ category, count });
    }
    for (let index = 0; index < 12; index += width >= 1051 ? 3 : 2) {
      const card = page.locator('#gallery .product').nth(index);
      await card.scrollIntoViewIfNeeded();
      await card.locator('.pic img').evaluate(i => i.decode());
    }
    await page.evaluate(async () => { await Promise.all([...document.querySelectorAll('#gallery .pic img,.hero-media img')].map(i => i.decode())); });
    report.layout = await page.evaluate(() => {
      const products = [...document.querySelectorAll('#gallery .product')];
      const rows = [...new Set(products.map(p => Math.round(p.getBoundingClientRect().top + scrollY)))];
      return { columns: getComputedStyle(document.getElementById('gallery')).gridTemplateColumns.split(' ').length, rows: rows.length,
        overflow: document.documentElement.scrollWidth > innerWidth,
        photographs: products.map(p => { const box = p.querySelector('.pic').getBoundingClientRect(); const image = p.querySelector('.pic img');
          return { ratio: box.width / box.height, fit: getComputedStyle(image).objectFit, loaded: image.complete && image.naturalWidth > 0, lazy: image.loading }; }) };
    });
    check(report.layout.columns === (width >= 1051 ? 3 : 2), 'Grid columns');
    check(report.layout.rows === (width >= 1051 ? 4 : 6), 'Grid rows');
    check(!report.layout.overflow, 'Page horizontal overflow');
    check(report.layout.photographs.every(p => p.loaded && p.fit === 'contain' && Math.abs(p.ratio - .8) < .01 && p.lazy === 'lazy'), 'Photo proportions/loading');
    const links = await page.locator('#gallery .listing-link').evaluateAll(a => a.map(x => x.href));
    check(links.every((url, i) => url === catalog[i].url), 'Catalog Vinted links');
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
    report.bottomVisible = await page.locator('footer').isVisible();
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `.playwright-mcp/shop-expanded-${width}-full.png`, fullPage: true });

    for (let index = 6; index < 12; index++) {
      const product = catalog[index];
      const trigger = page.locator('#gallery .pic').nth(index);
      await trigger.focus(); await page.keyboard.press('Enter');
      await page.locator('#closeModal').waitFor();
      await imageReady(product.images[0]);
      check(await page.locator('#modalTitle').textContent() === product.title, 'Gallery product title');
      check(await page.locator('#modalLink').getAttribute('href') === product.url, 'Gallery listing link');
      check(await page.locator('#galleryThumbnails button').count() === product.images.length, 'Real thumbnails count');
      await page.keyboard.press('ArrowRight'); await imageReady(product.images[1]);
      check(await page.locator('#galleryCounter').innerText() === `2 / ${product.images.length}`, 'Arrow navigation/counter');
      await page.locator('#originalBtn').click();
      const original = await page.locator('#modalImage').evaluate(i => ({ filter: getComputedStyle(i).filter, source: i.src,
        content: ['::before', '::after'].map(p => getComputedStyle(i.parentElement, p).content) }));
      check(original.filter === 'none' && original.source === product.images[1] && original.content.every(c => c === 'none'), 'Unfiltered original');
      await page.locator('#styledBtn').click();
      await page.locator('#intensity').selectOption('strong');
      await page.waitForFunction(() => getComputedStyle(document.getElementById('modalImage')).filter.includes('saturate(0.57)'));
      await page.locator('#intensity').selectOption('ritual');
      await page.waitForFunction(() => getComputedStyle(document.getElementById('modalImage')).filter.includes('saturate(0.18)'));
      const photos = [];
      // Inspect all new photographs at 1440; at other widths check first/second/last.
      const indices = width === 1440 ? product.images.map((_, i) => i) : [...new Set([0, 1, product.images.length - 1])];
      for (const i of indices) {
        await page.locator('#galleryThumbnails button').nth(i).click();
        await imageReady(product.images[i]);
        check(await page.locator('#galleryCounter').innerText() === `${i + 1} / ${product.images.length}`, 'Photo order');
        photos.push(i + 1);
      }
      check(await page.locator('#galleryNext').isDisabled(), 'Last-photo boundary');
      await page.locator('#galleryPrevious').click(); await imageReady(product.images.at(-2));
      check(await page.locator('#modal').evaluate(d => d.scrollWidth <= d.clientWidth), 'Gallery overflow');
      // Load every small derived thumbnail, without requesting additional full images.
      await page.evaluate(async () => {
        const buttons = [...document.querySelectorAll('#galleryThumbnails button')];
        for (const button of buttons) { button.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
        for (const source of buttons.map(b => b.querySelector('img').dataset.source)) {
          const image = new Image(); image.src = source; await image.decode();
        }
      });
      if (index === 6) {
        await page.locator('#galleryThumbnails button').nth(1).click(); await imageReady(product.images[1]);
        await page.locator('#modal').evaluate(d => d.scrollTop = 0);
        await page.screenshot({ path: `.playwright-mcp/shop-expanded-gallery-${width}.png` });
      }
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.getElementById('modal').open && !document.body.classList.contains('modal-open') && document.querySelector('.controls #styledBtn'));
      check(await trigger.evaluate(b => document.activeElement === b), 'Focus restoration');
      report.galleries.push({ title: product.title, count: product.images.length, inspected: photos });
    }

    await page.locator('nav a').filter({ hasText: /^Home$/ }).click();
    await page.waitForURL(origin + '/home-dark.html');
    check(await page.locator('#recent-pieces > li').count() === 4, 'Homepage preview changed');
    report.menuHome = await page.locator('nav a').first().evaluate(a => { const s = getComputedStyle(a); return { family: s.fontFamily, size: s.fontSize, tracking: s.letterSpacing }; });
    report.homeLinks = await page.locator('a[href]').evaluateAll(a => a.filter(x => /shop|pieces|collections/i.test(x.textContent)).map(x => ({ text: x.textContent.trim(), href: x.getAttribute('href') })));
    check(report.homeLinks.filter(l => !l.href.startsWith('http')).every(l => /collections/i.test(l.text) ? l.href === 'archive-dark.html#collections' : l.href === 'shop-dark.html'), 'Homepage Shop destinations');
    const localLinks = await page.locator('a[href]').evaluateAll(a => a.filter(x => x.origin === location.origin).map(x => ({ url: x.href, hash: x.hash, missingAnchor: x.pathname === location.pathname && x.hash && !document.getElementById(x.hash.slice(1)) })));
    check(localLinks.every(l => !l.missingAnchor), 'Homepage anchor destination');
    for (const url of new Set(localLinks.map(l => l.url.split('#')[0]))) check((await page.request.get(url)).ok(), 'Local link: ' + url);
    await page.getByRole('link', { name: /^Shop pieces/ }).click(); await page.waitForURL(origin + '/shop-dark.html');
    report.menuShop = await page.locator('nav a').first().evaluate(a => { const s = getComputedStyle(a); return { family: s.fontFamily, size: s.fontSize, tracking: s.letterSpacing }; });
    check(JSON.stringify(report.menuHome) === JSON.stringify(report.menuShop), 'Menu typography differs');
    await page.locator('nav a').filter({ hasText: /^Home$/ }).click(); await page.waitForURL(origin + '/home-dark.html');
    await page.getByRole('link', { name: /^View all pieces/ }).click(); await page.waitForURL(origin + '/shop-dark.html');
    check(report.errors.length === 0 && report.failedResponses.length === 0, 'Console/network errors');
    return report;
  } finally {
    page.off('pageerror', onError); page.off('console', onConsole); page.off('response', onResponse);
  }
}
