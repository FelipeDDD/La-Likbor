async (page) => {
  const origin = 'http://127.0.0.1:4175';
  const pages = ['home-dark.html', 'archive-dark.html', 'shop-dark.html', 'about-dark.html', 'records-ten-remain.html', 'photography-dark.html'];
  const menu = pages.slice(0, 4);
  const report = { viewports: [], links: [], errors: [], localFailures: [], screenshots: [] };
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const onError = error => report.errors.push(String(error));
  const onConsole = message => { if (message.type() === 'error') report.errors.push(message.text()); };
  const onResponse = response => { if (response.url().startsWith(origin) && response.status() >= 400) report.localFailures.push(response.url()); };
  page.on('pageerror', onError); page.on('console', onConsole); page.on('response', onResponse);
  const allLinks = new Set();
  try {
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({width, height: width === 1440 ? 900 : 844});
      for (const name of pages) {
        await page.goto(`${origin}/${name}`);
        await page.evaluate(() => document.fonts.ready);
        const links = await page.locator('.site-header nav a').evaluateAll(items => items.map(a => a.getAttribute('href')));
        check(JSON.stringify(links) === JSON.stringify(menu), `${name}: wrong menu`);
        check(await page.locator('.site-header nav [aria-current]').count() === 1, `${name}: active menu`);
        check((await page.locator('.dark-site-footer p').innerText()).toLowerCase() === 'personal archive', `${name}: shared footer`);
        check(await page.locator('.dark-site-footer .back-to-top').getAttribute('href') === '#page-top', `${name}: back to top`);
        const dimensions = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
        check(dimensions.scroll <= dimensions.viewport, `${name}: overflow at ${width}`);
        report.viewports.push({page: name, width, ...dimensions});
        for (const href of await page.locator('a[href]').evaluateAll(items => items.filter(a => a.origin === location.origin).map(a => a.href))) allLinks.add(href);
        if (name === 'archive-dark.html') {
          check(await page.locator('main .archive-section').count() === 5, 'Five Archive sections');
          check(await page.locator('iframe').count() === 0, 'No embedded video');
          check(await page.locator('[data-media-link]').isVisible(), 'Verified video link');
          check(await page.locator('[data-media-link]').getAttribute('href') === 'https://www.youtube.com/watch?v=k-Efz7nG5IA', 'Beacons video destination');
          check(await page.locator('[data-playlist-link]').getAttribute('href') === 'https://www.youtube.com/playlist?list=PLGgtmW1suzvgmc_s6J6Zrb9SHENf08dQl', 'Beacons playlist destination');
          check(await page.locator('[data-channel-link]').getAttribute('href') === 'https://www.youtube.com/@la.likbor', 'Confirmed personal channel');
          await page.locator('.archive-index a[href="#media"]').click();
          check(await page.locator('#media').evaluate(e => e.matches(':target')), 'Media anchor');
        }
        if (name === 'records-ten-remain.html') check(await page.locator('.record-entry').count() === 10, 'Ten real album entries');
        if (name === 'home-dark.html') {
          const expected = ['photography-dark.html', 'archive-dark.html#collections', 'archive-dark.html#records', 'archive-dark.html#objects'];
          check(JSON.stringify(await page.locator('.home-fragments > a').evaluateAll(a => a.map(x => x.getAttribute('href')))) === JSON.stringify(expected), 'Home card links');
        }
        if (['archive-dark.html', 'about-dark.html', 'records-ten-remain.html'].includes(name)) {
          await page.evaluate(async () => {
            const images = [...document.images].filter(i => i.getAttribute('src')); images.forEach(i => { i.loading = 'eager'; });
            await Promise.all(images.map(i => i.decode()));
          });
          if (width !== 320) {
            await page.evaluate(() => scrollTo(0, 0));
            const suffix = width === 1440 ? 'desktop' : 'mobile';
            const file = `.playwright-mcp/${name.replace('.html', '')}-${suffix}.png`;
            await page.screenshot({path: file, fullPage: true}); report.screenshots.push(file);
            if (name === 'archive-dark.html') {
              const mediaFile = `.playwright-mcp/archive-media-${suffix}.png`;
              await page.locator('#media').screenshot({path: mediaFile}); report.screenshots.push(mediaFile);
            }
          }
        }
      }
    }
    // Local HTML links and cross-page fragments, without following external listings.
    for (const href of allLinks) {
      const url = new URL(href); const response = await page.request.get(url.href);
      check(response.ok(), `Broken local link: ${href}`);
      if (url.hash) {
        const html = await response.text();
        const id = decodeURIComponent(url.hash.slice(1));
        if (!html.includes(`id="${id}"`)) {
          await page.goto(href);
          check(await page.evaluate(id => Boolean(document.getElementById(id)), id), `Missing section: ${href}`);
        }
      }
      report.links.push(href);
    }
    // Real keyboard navigation through the primary menu.
    await page.goto(origin + '/home-dark.html');
    await page.keyboard.press('Tab');
    check(await page.locator('.skip-link').evaluate(e => e === document.activeElement), 'Keyboard skip link');
    await page.keyboard.press('Tab'); await page.keyboard.press('Tab');
    check(await page.evaluate(() => document.activeElement.getAttribute('href')) === 'archive-dark.html', 'Keyboard Archive menu');
    await page.keyboard.press('Enter'); await page.waitForURL(origin + '/archive-dark.html');
    await page.locator('a[href="records-ten-remain.html"]').click(); await page.waitForURL(origin + '/records-ten-remain.html');
    await page.getByRole('link', {name: 'Back to Records'}).click(); await page.waitForURL(origin + '/archive-dark.html#records');
    await page.locator('.site-header a[href="about-dark.html"]').click(); await page.waitForURL(origin + '/about-dark.html');
    await page.locator('.site-header a[href="shop-dark.html"]').click(); await page.waitForURL(origin + '/shop-dark.html');
    check(await page.locator('.product').count() === 12, 'Shop catalogue remains intact');
    await page.locator('.site-header nav a[href="home-dark.html"]').click(); await page.waitForURL(origin + '/home-dark.html');
    check(await page.locator('#recent-pieces > li').count() === 4, 'Home Recent Pieces remains intact');
    check(report.errors.length === 0 && report.localFailures.length === 0, 'Console or local resource errors');
    return report;
  } finally { page.off('pageerror', onError); page.off('console', onConsole); page.off('response', onResponse); }
}
