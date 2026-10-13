/* Unfiltered archive gallery. Reuses the product gallery's native dialog,
   bounded navigation, focus handling and thumbnail-rail behaviour, without
   importing Shop controls, product data or photographic presets. */
(() => {
  'use strict';
  const content = window.LIKBOR_PHOTOGRAPHY;
  const host = document.getElementById('photography-categories');
  const dialog = document.querySelector('.photography-gallery');
  if (!content || !host || !dialog) return;
  const element = (tag, className, value) => {
    const node = document.createElement(tag);
    node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  };
  const preview = photo => {
    const image = element('img', '', '');
    image.src = photo.thumbnail;
    image.width = photo.thumbWidth; image.height = photo.thumbHeight;
    image.alt = ''; image.loading = 'lazy'; image.decoding = 'async';
    return image;
  };
  const count = photos => `${photos.length} photograph${photos.length === 1 ? '' : 's'}`;
  const albums = new Map(content.albums.map(album => [album.id, album]));
  for (const category of content.categories) {
    const entries = content.albums.filter(album => album.category === category.id);
    const photos = entries.flatMap(album => album.photos);
    const heading = element('span', '', '');
    heading.append(element('span', 'photography-label', category.title), element('span', 'photography-count', count(photos)));
    if (category.kind === 'subalbums') {
      const group = element('details', 'photography-group', '');
      group.id = `photography-${category.id}`;
      const summary = element('summary', '', '');
      summary.append(element('span', 'photography-number', category.number));
      if (photos[0]) summary.append(preview(photos[0]));
      summary.append(heading);
      const grid = element('div', 'photography-albums', '');
      for (const album of entries) {
        if (!album.photos.length) continue;
        const link = element('a', 'photography-album', '');
        link.href = album.photos[0].src;
        link.dataset.album = album.id;
        link.setAttribute('aria-haspopup', 'dialog');
        link.setAttribute('aria-label', `Open ${album.title} album, ${count(album.photos)}`);
        const picture = element('span', 'photography-album-image', '');
        picture.append(preview(album.photos[0]));
        link.append(picture, element('span', 'photography-album-name', album.title), element('span', 'photography-count', count(album.photos)));
        if (album.titleSource === 'provisional') link.append(element('span', 'photography-count', 'Working title'));
        grid.append(link);
      }
      if (!grid.children.length) grid.append(element('p', 'draft-note', 'Photographs can be added to this category.'));
      group.append(summary, grid); host.append(group);
    } else {
      const button = element('button', 'photography-single', '');
      button.type = 'button'; button.dataset.album = entries[0]?.id || '';
      button.id = `photography-${category.id}`;
      button.setAttribute('aria-haspopup', 'dialog');
      button.setAttribute('aria-label', `Open ${category.title} gallery, ${count(photos)}`);
      button.disabled = photos.length === 0;
      button.append(element('span', 'photography-number', category.number));
      if (photos[0]) button.append(preview(photos[0]));
      button.append(heading); host.append(button);
    }
  }

  const image = dialog.querySelector('.photography-original');
  const stage = dialog.querySelector('.photography-stage');
  const error = dialog.querySelector('.photography-error');
  const previous = dialog.querySelector('.photography-previous');
  const next = dialog.querySelector('.photography-next');
  const counter = dialog.querySelector('.photography-counter');
  const rail = dialog.querySelector('.photography-thumbnails');
  const close = dialog.querySelector('.photography-close');
  const previousAlbum = dialog.querySelector('.photography-album-previous');
  const nextAlbum = dialog.querySelector('.photography-album-next');
  const loaded = new Set();
  let album, current = 0, trigger, observer;
  function keepThumbnailVisible() {
    const selected = rail.children[current];
    if (!selected) return;
    const left = selected.offsetLeft;
    if (left < rail.scrollLeft + 4) rail.scrollLeft = left - 4;
    else if (left + selected.offsetWidth > rail.scrollLeft + rail.clientWidth - 4)
      rail.scrollLeft = left + selected.offsetWidth - rail.clientWidth + 4;
  }
  function loadedImage() {
    image.hidden = false; error.hidden = true;
    stage.setAttribute('aria-busy', 'false');
    loaded.add(image.getAttribute('src'));
    // One neighbouring full rendition only; all remaining originals stay deferred.
    const source = album?.photos[current + 1]?.src;
    if (dialog.open && source && !loaded.has(source)) {
      loaded.add(source); const neighbour = new Image(); neighbour.decoding = 'async'; neighbour.src = source;
    }
  }
  function select(index) {
    if (!album || index < 0 || index >= album.photos.length) return;
    const photo = album.photos[index];
    if (current === index && image.getAttribute('src') === photo.src && !image.hidden) return;
    current = index;
    image.hidden = true; error.hidden = true; stage.setAttribute('aria-busy', 'true');
    image.alt = photo.alt || `${album.title} — photograph ${current + 1}`;
    image.src = photo.src;
    counter.textContent = `${current + 1} / ${album.photos.length}`;
    previous.disabled = current === 0; next.disabled = current === album.photos.length - 1;
    const post = content.posts[photo.postCode];
    const sourceLink = dialog.querySelector('.photography-post');
    sourceLink.hidden = !post?.url;
    if (post?.url) {
      const sourceURL = new URL(post.url); sourceURL.searchParams.set('img_index', String(photo.postIndex));
      sourceLink.href = sourceURL.href;
      sourceLink.textContent = `Instagram / @${post.owner} · photo ${photo.postIndex} ↗`;
    } else {
      sourceLink.removeAttribute('href'); sourceLink.textContent = '';
    }
    const caption = dialog.querySelector('.photography-caption');
    const captionText = post?.caption || photo.caption || '';
    caption.hidden = !captionText; caption.open = false;
    caption.querySelector('summary').textContent = post ? 'Original post caption' : 'Photograph caption';
    caption.querySelector('p').textContent = captionText;
    [...rail.children].forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
    keepThumbnailVisible();
    if (image.complete && image.naturalWidth) loadedImage();
  }
  function makeThumbnails() {
    observer?.disconnect(); rail.replaceChildren(); rail.scrollLeft = 0;
    rail.hidden = album.photos.length < 2;
    dialog.querySelector('.photography-navigation').hidden = album.photos.length < 2;
    if (album.photos.length < 2) return;
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src; observer.unobserve(entry.target);
      }
    }, {root:rail,rootMargin:'0px 80px'});
    album.photos.forEach((photo, index) => {
      const button = element('button', '', ''); button.type = 'button';
      button.setAttribute('aria-label', `Show photograph ${index + 1} of ${album.photos.length}`);
      button.setAttribute('aria-pressed', String(index === 0));
      const thumb = element('img', '', ''); thumb.alt = ''; thumb.decoding = 'async';
      thumb.width = photo.thumbWidth; thumb.height = photo.thumbHeight; thumb.dataset.src = photo.thumbnail;
      button.append(thumb); button.addEventListener('click', () => select(index));
      rail.append(button); observer.observe(thumb);
    });
  }
  document.querySelector('.photography-index')?.addEventListener('click', event => {
    const link = event.target.closest('[data-photography-category]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(link.hash.slice(1));
    if (target?.tagName === 'DETAILS') target.open = true;
    else if (target?.matches('[data-album]')) { event.preventDefault(); target.click(); }
  });
  const revealCategory = () => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target?.matches('.photography-group')) target.open = true;
  };
  revealCategory();
  window.addEventListener('hashchange', revealCategory);
  function siblingAlbums() {
    const category = content.categories.find(c => c.id === album.category);
    return category.kind === 'subalbums'
      ? content.albums.filter(a => a.category === album.category && a.photos.length)
      : [];
  }
  function showAlbum(selectedAlbum) {
    album = selectedAlbum;
    const category = content.categories.find(c => c.id === album.category);
    const title = dialog.querySelector('#photography-gallery-title');
    title.textContent = album.title;
    title.setAttribute('aria-live', 'polite');
    dialog.querySelector('.photography-gallery-category').textContent = category.title;
    const siblings = siblingAlbums(), index = siblings.indexOf(album);
    const hasNavigation = siblings.length > 1;
    previousAlbum.hidden = nextAlbum.hidden = !hasNavigation;
    previousAlbum.disabled = index <= 0;
    nextAlbum.disabled = index >= siblings.length - 1;
    previousAlbum.title = index > 0 ? `Previous album: ${siblings[index - 1].title}` : 'Previous album';
    nextAlbum.title = index < siblings.length - 1 ? `Next album: ${siblings[index + 1].title}` : 'Next album';
    dialog.querySelector('.photography-stage-row').classList.toggle('has-album-navigation', hasNavigation);
    makeThumbnails(); select(0);
    rail.scrollLeft = 0; dialog.scrollTop = 0;
    if (document.activeElement === previousAlbum && previousAlbum.disabled) nextAlbum.focus({preventScroll:true});
    if (document.activeElement === nextAlbum && nextAlbum.disabled) previousAlbum.focus({preventScroll:true});
    requestAnimationFrame(keepThumbnailVisible);
  }
  function changeAlbum(direction) {
    const siblings = siblingAlbums();
    const selectedAlbum = siblings[siblings.indexOf(album) + direction];
    if (selectedAlbum) showAlbum(selectedAlbum);
  }
  previousAlbum.addEventListener('click', () => changeAlbum(-1));
  nextAlbum.addEventListener('click', () => changeAlbum(1));
  host.addEventListener('click', event => {
    const opener = event.target.closest('[data-album]');
    if (!opener || (opener.tagName === 'A' && (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey))) return;
    const selectedAlbum = albums.get(opener.dataset.album);
    if (!selectedAlbum?.photos.length) return;
    event.preventDefault(); trigger = opener;
    showAlbum(selectedAlbum);
    dialog.showModal(); dialog.scrollTop = 0; document.body.classList.add('modal-open');
    close.focus({preventScroll:true});
    requestAnimationFrame(keepThumbnailVisible);
  });
  image.addEventListener('load', loadedImage);
  image.addEventListener('error', () => { image.hidden = true; error.hidden = false; stage.setAttribute('aria-busy', 'false'); });
  close.addEventListener('click', () => dialog.close());
  previous.addEventListener('click', () => select(current - 1)); next.addEventListener('click', () => select(current + 1));
  dialog.addEventListener('close', () => {
    observer?.disconnect(); document.body.classList.remove('modal-open'); trigger?.focus({preventScroll:true});
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      const focusable = [...dialog.querySelectorAll('button:not(:disabled),a[href],summary')].filter(e => e.getClientRects().length);
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      return;
    }
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    let index;
    if (event.key === 'ArrowLeft') index = Math.max(0, current - 1);
    if (event.key === 'ArrowRight') index = Math.min(album.photos.length - 1, current + 1);
    const thumbnail = event.target.closest('.photography-thumbnails button');
    if (thumbnail && event.key === 'Home') index = 0;
    if (thumbnail && event.key === 'End') index = album.photos.length - 1;
    if (index === undefined) return;
    event.preventDefault(); select(index);
    if (thumbnail) rail.children[index]?.focus({preventScroll:true});
  });
})();
