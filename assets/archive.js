(() => {
  'use strict';
  const content = window.LIKBOR_ARCHIVE_CONTENT;
  if (!content) return;
  const text = (tag, className, value) => {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = value;
    return element;
  };
  const safeURL = (value, youtubeOnly = false) => {
    try {
      const url = new URL(value);
      if (url.protocol !== 'https:') return null;
      if (youtubeOnly) {
        const host = url.hostname.toLowerCase();
        const youtube = ['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(host);
        const videoId = host === 'youtu.be' ? url.pathname.slice(1)
          : youtube && url.pathname === '/watch' ? url.searchParams.get('v')
          : youtube && /^\/(shorts|embed)\//.test(url.pathname) ? url.pathname.split('/')[2] : '';
        if (!/^[\w-]{11}$/.test(videoId || '')) return null;
      }
      return url.href;
    } catch { return null; }
  };
  const list = document.getElementById('record-list');
  if (list) {
    const entries = content.records.map(record => {
      const item = text('li', 'record-entry', '');
      const copy = document.createElement('div');
      copy.append(text('p', 'record-artist', record.artist), text('h2', '', record.title));
      if (Number.isInteger(record.year)) copy.append(text('p', 'kicker', String(record.year)));
      copy.append(text('p', 'record-comment', record.comment));
      const href = safeURL(record.source);
      if (href) {
        const link = text('a', 'record-source', 'Artist / label reference ↗');
        link.href = href; link.target = '_blank'; link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', `${record.artist} — ${record.title}: artist or label reference (new tab)`);
        copy.append(link);
      }
      item.append(copy);
      return item;
    });
    list.replaceChildren(...entries);
  }
  const media = document.getElementById('media-entry');
  if (media && content.media) {
    media.querySelector('[data-media-title]').textContent = content.media.title;
    media.querySelector('[data-media-description]').textContent = content.media.description;
    media.querySelector('[data-media-edition]').textContent = content.media.edition || '';
    media.querySelector('[data-media-credits]').textContent = content.media.credits || '';
    const href = safeURL(content.media.youtubeUrl, true);
    const link = media.querySelector('[data-media-link]');
    if (href) {
      link.href = href; link.hidden = false;
      const preview = media.querySelector('[data-media-thumbnail-link]');
      preview.href = href; preview.hidden = false;
    }
  }
  for (const [id, key, attribute] of [['archive-playlist', 'playlist', 'playlist'], ['archive-channel', 'channel', 'channel']]) {
    const section = document.getElementById(id);
    if (!section || !content[key]) continue;
    section.querySelector(`[data-${attribute}-title]`).textContent = content[key].title;
    const href = safeURL(content[key].url);
    if (href) {
      const link = section.querySelector(`[data-${attribute}-link]`);
      link.href = href; link.hidden = false;
    }
  }
})();
