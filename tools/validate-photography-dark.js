async (page) => {
  const origin = 'http://127.0.0.1:4175';
  const report = {images:0,albums:[],viewports:[],screenshots:[],errors:[],failedResources:[]};
  const check = (value,message) => { if (!value) throw new Error(message); };
  const onError = e => report.errors.push(String(e));
  const onConsole = m => { if (m.type() === 'error') report.errors.push(m.text()); };
  const onResponse = r => { if(r.url().startsWith(origin) && r.status() >= 400) report.failedResources.push(r.url()); };
  page.on('pageerror',onError); page.on('console',onConsole); page.on('response',onResponse);
  const expected = {
    'DS7-vvTCCct':[2,4,6,7,8,9,14,18,20],'DBE3G3lt79k':[1,2,4,6],'DCpWxuuIOHJ':[1,2,3,6],'C_Yh0BvNZdZ':[1,2,3,4],
    'CtrxmWltRoH':[1,2,4,6,9,10],'CsjtGxpN2XQ':[1,2,3,5,9],'CsmRZpUtl2x':[1,2,4,6],
    'DB7CaE7IAMZ':[1],'Cs1psouNfKn':[1],'CrqRJ0QShmH':[1],'Cb0FUKMKNWs':[1],'CtM0PMCNsM6':[1],'CxEC4CetFf4':[1,2,3],
    'C1VF0lvN6bV':[1,2,3],'Cl4QnVlqYMV':[1,2],'CIWWQrsAnMj':[1],'CVDdUS3IhwT':[1],'CWizEV2oHgN':[1]
  };
  const dialog = page.locator('.photography-gallery');
  const photo = page.locator('.photography-original');
  const close = page.locator('.photography-close');
  async function waitImage() {
    await page.waitForFunction(() => {const i=document.querySelector('.photography-original');return i.complete && i.naturalWidth > 0 && !i.hidden;});
  }
  async function open(album) {
    const trigger = page.locator(`[data-album="${album.id}"]`);
    await trigger.evaluate(e => { const d=e.closest('details'); if(d)d.open=true; });
    await trigger.click(); await waitImage();
    check(await dialog.evaluate(d=>d.open), `${album.title}: open`);
    check(await close.evaluate(e=>e===document.activeElement), `${album.title}: initial focus`);
    check(await page.locator('body').evaluate(b=>getComputedStyle(b).overflow==='hidden'), 'Background scroll lock');
    return trigger;
  }
  try {
    for(const width of [1440,390,320]) {
      await page.setViewportSize({width,height:width===1440?900:844});
      await page.goto(origin+'/photography-dark.html'); await page.evaluate(()=>document.fonts.ready);
      const data=await page.evaluate(()=>window.LIKBOR_PHOTOGRAPHY);
      check(data.categories.length===4 && data.albums.length===9,'Four categories, nine galleries');
      for(const [code,indexes] of Object.entries(expected)) {
        const photos=data.albums.flatMap(a=>a.photos).filter(p=>p.postCode===code);
        check(JSON.stringify(photos.map(p=>p.postIndex))===JSON.stringify(indexes),`${code}: requested selection/order`);
      }
      for(const album of data.albums) {
        const trigger=await open(album);
        const entries=width===1440 ? album.photos : [album.photos[0]];
        for(let i=0;i<entries.length;i++) {
          if(i) { await page.locator('.photography-next').click(); await waitImage(); }
          const actual=await photo.evaluate(e=>({src:e.getAttribute('src'),width:e.naturalWidth,height:e.naturalHeight,filter:getComputedStyle(e).filter,fit:getComputedStyle(e).objectFit,opacity:getComputedStyle(e).opacity}));
          check(actual.src===entries[i].src && actual.width===entries[i].width && actual.height===entries[i].height,`${album.title} ${i}: image integrity/dimensions`);
          check(actual.filter==='none' && actual.fit==='contain' && actual.opacity==='1','Unfiltered full photographs');
          check(await page.locator('.photography-counter').textContent()===`${i+1} / ${album.photos.length}`,'Counter');
          if (entries[i].postCode) check(await page.locator('.photography-post').getAttribute('href')===`https://www.instagram.com/p/${entries[i].postCode}/?img_index=${entries[i].postIndex}`,'Correct source post/index');
          else check(await page.locator('.photography-post').isHidden() && !await page.locator('.photography-post').getAttribute('href'), 'Local photograph has no invented Instagram source');
          if(width===1440) report.images++;
        }
        const last=page.locator('.photography-thumbnails button').last();
        await last.click(); await waitImage();
        check(await last.getAttribute('aria-pressed')==='true','Selected thumbnail');
        check(await page.locator('.photography-next').isDisabled(),'Last boundary');
        await page.keyboard.press('ArrowRight');
        check(await page.locator('.photography-counter').textContent()===`${album.photos.length} / ${album.photos.length}`,'No boundary wrap');
        await page.keyboard.press('ArrowLeft'); await waitImage();
        check(await page.locator('.photography-counter').textContent()===`${album.photos.length-1} / ${album.photos.length}`,'Keyboard previous');
        await page.keyboard.press('Home'); await waitImage();
        check(await page.locator('.photography-previous').isDisabled(),'First boundary');
        await page.keyboard.press('End'); await waitImage();
        check(await last.evaluate(e=>{const a=e.getBoundingClientRect(),b=e.parentElement.getBoundingClientRect();return a.left>=b.left && a.right<=b.right+1;}),'Selected thumbnail auto scroll');
        const dims=await dialog.evaluate(d=>({width:d.getBoundingClientRect().width,scroll:d.scrollWidth,client:d.clientWidth}));
        check(dims.width<=width && dims.scroll<=dims.client,'No horizontal gallery overflow');
        await close.focus(); await page.keyboard.press('Shift+Tab');
        check(await page.evaluate(()=>document.activeElement.matches('.photography-caption summary')),'Backward focus trap');
        await page.keyboard.press('Tab');
        check(await close.evaluate(e=>e===document.activeElement),'Forward focus trap');
        await dialog.evaluate(d=>d.scrollTop=d.scrollHeight);
        check(await close.evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=0 && r.bottom<=innerHeight;}),'Sticky Close stays accessible');
        if(album.id==='DBE3G3lt79k' && width!==320) {
          await page.locator('.photography-thumbnails button').first().click(); await waitImage();
          await dialog.evaluate(d=>d.scrollTop=0); await page.mouse.move(0,0);
          const path=`.playwright-mcp/photography-album-${width===1440?'desktop':'mobile'}.png`;
          await page.screenshot({path}); report.screenshots.push(path);
        }
        if(album.id==='fragments') await close.click(); else await page.keyboard.press('Escape');
        await page.waitForFunction(()=>!document.body.classList.contains('modal-open'));
        check(!await dialog.evaluate(d=>d.open),'Close / Escape');
        check(await trigger.evaluate(e=>e===document.activeElement),'Restore opener focus');
        check(!await page.locator('body').evaluate(b=>b.classList.contains('modal-open')),'Unlock background');
        if(width===1440) report.albums.push({title:album.title,photos:album.photos.length});
      }
      await page.evaluate(()=>{document.querySelector('#photography-music').open=false;document.querySelector('#photography-places').open=false;});
      await page.evaluate(async()=>{for(const i of document.querySelectorAll('#photography-categories img')){i.loading='eager';await i.decode();}});
      const scroll=await page.evaluate(()=>document.documentElement.scrollWidth);
      check(scroll<=width,'Page overflow'); report.viewports.push({width,scroll});
      if(width!==320) {
        const path=`.playwright-mcp/photography-page-${width===1440?'desktop':'mobile'}-categories.png`;
        await page.locator('#photography-categories').screenshot({path}); report.screenshots.push(path);
      }
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.locator('.back-to-top').click();
      await page.waitForFunction(()=>scrollY===0);
      check(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)==='auto','Reduced-motion back to top');
      await page.emulateMedia({reducedMotion:'no-preference'});
      check(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)==='smooth','Smooth back to top');
    }
    await page.goto(origin+'/about-dark.html');
    check(await page.locator('.about-elsewhere a').count()===5,'Five verified Elsewhere profiles');
    check(report.errors.length===0 && report.failedResources.length===0,'Console/resource errors');
    return report;
  } finally { page.off('pageerror',onError);page.off('console',onConsole);page.off('response',onResponse); }
}
