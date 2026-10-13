/* Opt-in product gallery. Catalog rendering, presentation controls and presets
   stay in shop.js / photo-treatment.css / shop-dark.css. */
function getProductImages(product) {
  const candidates = [product.img, ...(Array.isArray(product.images) ? product.images : [])];
  const seen = new Set();
  return candidates.filter(source => {
    if (typeof source !== 'string' || !source.trim() || seen.has(source)) return false;
    seen.add(source);
    return true;
  });
}

(() => {
  const dialog = document.querySelector('dialog.product-gallery');
  if (!dialog) return;
  const image = document.getElementById('modalImage');
  const error = document.getElementById('modalError');
  const photo = dialog.querySelector('.product-gallery__photo');
  const thumbnails = document.getElementById('galleryThumbnails');
  const previous = document.getElementById('galleryPrevious');
  const next = document.getElementById('galleryNext');
  const counter = document.getElementById('galleryCounter');
  const note = document.getElementById('modalNote');
  const presentation = document.getElementById('galleryPresentation');
  const controls = [document.querySelector('.controls .mode'), document.querySelector('.controls .intensity')];
  // Move the actual controls, preserving IDs, listeners and selected state.
  const homes = controls.map(control => {
    const marker = document.createComment('Gallery presentation control home');
    control.before(marker);
    return marker;
  });
  const cached = new Set();
  let sources = [];
  let current = 0;
  let product;
  let observer;
  const thumbnailSources = typeof productThumbnails === 'undefined' ? {} : productThumbnails;

  function syncNote() {
    const original = document.body.classList.contains('original');
    note.textContent = original
      ? 'Original colours. Unfiltered, full photographs.'
      : `${document.getElementById('intensity').selectedOptions[0].textContent} treatment. Choose Original for unfiltered colours.`;
  }

  function preloadNext() {
    // Keep at most one speculative full-quality neighbour, after the current load.
    const source = sources[current + 1];
    if (!source || cached.has(source)) return;
    cached.add(source);
    const neighbour = new Image();
    neighbour.decoding = 'async';
    neighbour.src = source;
  }

  function selectImage(index, scrollThumbnail = true) {
    if (index < 0 || index >= sources.length) return;
    // Do not reload/flicker when a boundary key or the current thumbnail is used.
    if (index === current && image.getAttribute('src') === sources[index] && !image.hidden) return;
    current = index;
    error.hidden = true;
    image.hidden = true;
    photo.setAttribute('aria-busy', 'true');
    image.alt = `${product.title} — photograph ${current + 1} of ${sources.length}`;
    image.src = sources[current];
    counter.textContent = `${current + 1} / ${sources.length}`;
    previous.disabled = current === 0;
    next.disabled = current === sources.length - 1;
    thumbnails.querySelectorAll('button').forEach((button, index) => {
      button.setAttribute('aria-pressed', String(index === current));
    });
    const selected = thumbnails.children[current];
    if (scrollThumbnail && selected) {
      // Scroll only the thumbnail rail, never the page or image area.
      const left = selected.offsetLeft;
      if (left < thumbnails.scrollLeft + 4) thumbnails.scrollLeft = left - 4;
      else if (left + selected.offsetWidth > thumbnails.scrollLeft + thumbnails.clientWidth - 4)
        thumbnails.scrollLeft = left + selected.offsetWidth - thumbnails.clientWidth + 4;
    }
    if (image.complete) {
      image.hidden = image.naturalWidth === 0;
      error.hidden = image.naturalWidth > 0;
      photo.setAttribute('aria-busy', 'false');
      if (image.naturalWidth > 0) {
        cached.add(sources[current]);
        preloadNext();
      }
    }
  }

  function createThumbnails() {
    observer?.disconnect();
    thumbnails.replaceChildren();
    thumbnails.scrollLeft = 0;
    thumbnails.hidden = sources.length < 2;
    dialog.querySelector('.product-gallery__navigation').hidden = sources.length < 2;
    if (sources.length < 2) return;
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const thumb = entry.target;
        thumb.src = thumb.dataset.source;
        observer.unobserve(thumb);
      }
    }, { root: thumbnails, rootMargin: '0px 80px' });
    sources.forEach((source, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'product-gallery__thumbnail pic';
      button.setAttribute('aria-label', `Show photograph ${index + 1} of ${sources.length}: ${product.title}`);
      button.setAttribute('aria-pressed', String(index === 0));
      const thumb = document.createElement('img');
      thumb.alt = '';
      thumb.decoding = 'async';
      thumb.loading = 'lazy';
      thumb.dataset.source = thumbnailSources[source] || source;
      button.append(thumb);
      button.addEventListener('click', () => selectImage(index));
      thumb.addEventListener('error', () => {
        thumb.hidden = true;
        button.classList.add('product-gallery__thumbnail--failed');
        button.setAttribute('aria-label', `Photograph ${index + 1} unavailable: ${product.title}`);
      });
      thumbnails.append(button);
      observer.observe(thumb);
    });
  }

  dialog.addEventListener('shop:open-product', event => {
    event.preventDefault();
    product = event.detail.item;
    photoTrigger = event.detail.trigger;
    sources = getProductImages(product);
    document.getElementById('modalTitle').textContent = product.title;
    document.getElementById('galleryCategory').textContent = product.cat;
    document.getElementById('galleryDescription').textContent = product.subtitle;
    document.getElementById('galleryPrice').textContent = product.price;
    document.getElementById('modalLink').href = product.url;
    controls.forEach(control => presentation.append(control));
    syncNote();
    createThumbnails();
    selectImage(0, false);
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-open');
    document.getElementById('closeModal').focus({ preventScroll: true });
  });
  image.addEventListener('load', () => {
    image.hidden = false;
    error.hidden = true;
    photo.setAttribute('aria-busy', 'false');
    cached.add(image.getAttribute('src'));
    if (dialog.open) preloadNext();
  });
  image.addEventListener('error', () => { photo.setAttribute('aria-busy', 'false'); });
  previous.addEventListener('click', () => selectImage(current - 1));
  next.addEventListener('click', () => selectImage(current + 1));
  presentation.addEventListener('click', syncNote);
  presentation.addEventListener('change', syncNote);

  dialog.addEventListener('keydown', event => {
    const target = event.target;
    if (event.key === 'Tab') {
      const focusable = [...dialog.querySelectorAll('button:not(:disabled), a[href], select:not(:disabled)')]
        .filter(element => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && target === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && target === last) { event.preventDefault(); first.focus(); }
      return;
    }
    // The intensity select keeps its native arrow-key behaviour.
    if (target.closest('select') || event.altKey || event.ctrlKey || event.metaKey) return;
    const thumb = target.closest('.product-gallery__thumbnail');
    let index;
    if (event.key === 'ArrowRight') index = Math.min(current + 1, sources.length - 1);
    if (event.key === 'ArrowLeft') index = Math.max(current - 1, 0);
    if (event.key === 'Home' && thumb) index = 0;
    if (event.key === 'End' && thumb) index = sources.length - 1;
    if (index === undefined) return;
    event.preventDefault();
    selectImage(index);
    if (thumb) thumbnails.children[index]?.focus({ preventScroll: true });
  });
  dialog.addEventListener('close', () => {
    observer?.disconnect();
    controls.forEach((control, index) => homes[index].after(control));
  });

  // Background/title clicks open the same gallery; Vinted links stay direct.
  document.getElementById('gallery').addEventListener('click', event => {
    if (event.target.closest('a, button') || window.getSelection().toString()) return;
    event.target.closest('.product')?.querySelector('.pic').click();
  });
  function labelGalleryButtons() {
    document.querySelectorAll('#gallery .pic').forEach(button => {
      button.setAttribute('aria-label', button.getAttribute('aria-label').replace('Open original photograph:', 'Open product gallery:'));
    });
  }
  labelGalleryButtons();
  new MutationObserver(labelGalleryButtons).observe(document.getElementById('gallery'), { childList: true });
})();
