/* Navigate between independent themes. Paths are relative to the shared assets,
   so the site can also be hosted beneath a directory such as /la-likbor/. */
(() => {
  'use strict';
  const switcher = document.querySelector('.version-switch');
  if (!switcher) return;
  const siteRoot = new URL('../', document.currentScript.src);
  const pages = {
    home: ['home-dark.html', 'v2/index.html', ['home', 'home-title', 'archive', 'archive-title', 'recent-title', 'recent-pieces', 'about', 'about-title']],
    shop: ['shop-dark.html', 'v2/shop.html', ['shop', 'shop-title', 'gallery', 'archive-title']],
    archive: ['archive-dark.html', 'v2/archive.html', ['archive-main', 'photography', 'photography-title', 'media-preview', 'media-preview-title', 'records', 'records-title', 'archive-playlist', 'objects', 'objects-title', 'media', 'media-title', 'media-entry', 'archive-channel']],
    photography: ['photography-dark.html', 'v2/photography.html', ['photography-main', 'photography-categories', 'photography-places', 'photography-music', 'photography-portraits', 'photography-fragments']],
    about: ['about-dark.html', 'v2/about.html', ['about-main', 'elsewhere-title']],
    records: ['records-ten-remain.html', 'v2/records-ten-remain.html', ['records-article', 'record-list']]
  };
  const [dark, warm, anchors] = pages[switcher.dataset.page] || pages.home;
  const update = () => {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { id = ''; }
    const hash = id === 'page-top' || anchors.includes(id) ? location.hash : '';
    for (const link of switcher.querySelectorAll('a[data-version]')) {
      const url = new URL(link.dataset.version === 'dark' ? dark : warm, siteRoot);
      url.search = location.search; // Keep an opened Shop product when switching.
      url.hash = hash;
      link.href = url.href;
    }
  };
  update();
  window.addEventListener('hashchange', update);
  window.addEventListener('popstate', update);
  switcher.addEventListener('click', update);
})();
