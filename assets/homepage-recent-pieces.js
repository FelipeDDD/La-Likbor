/* The existing classic products.js is loaded first. Read only: no copied prices,
   new inventory, inferred availability or chronological ordering. */
(() => {
  const listingIds = ['10202674856', '10304272073', '9564978421', '9486609884'];
  const selection = listingIds.map(id => items.find(item => item.url.includes(`/items/${id}-`))).filter(Boolean);
  const grid = document.getElementById('recent-pieces');
  // Opt-in routing keeps older studies' original-photo dialog unchanged.
  const shopDestination = grid.dataset.shopDestination;
  const productDestination = item => {
    const id = new URL(item.url).pathname.match(/^\/items\/(\d+)(?:-|$)/)?.[1];
    return id ? `${shopDestination}?product=${id}` : shopDestination;
  };
  const modal = document.getElementById('recent-original');
  const original = document.getElementById('recent-original-image');
  const error = document.getElementById('recent-original-error');
  const close = document.getElementById('recent-original-close');
  let trigger;

  function openOriginal(item, button) {
    trigger = button;
    error.hidden = true;
    original.hidden = false;
    original.alt = `Unfiltered original photograph of ${item.title}`;
    original.src = item.img;
    document.getElementById('recent-original-title').textContent = item.title;
    document.getElementById('recent-original-link').href = item.url;
    modal.showModal();
    document.body.classList.add('modal-open');
    close.focus();
  }

  for (const item of selection) {
    const card = document.createElement('li');
    card.className = 'recent-piece';
    const photo = document.createElement(shopDestination ? 'a' : 'button');
    if (shopDestination) photo.href = productDestination(item);
    else photo.type = 'button';
    photo.className = 'recent-photo';
    photo.setAttribute('aria-label', shopDestination ? `View ${item.title} in the Shop gallery` : `View original photograph: ${item.title}`);
    if (!shopDestination) photo.setAttribute('aria-haspopup', 'dialog');
    const image = document.createElement('img');
    image.src = item.img;
    image.alt = `Vinted photograph of ${item.title}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    const unavailable = document.createElement('span');
    unavailable.className = 'recent-photo__error';
    unavailable.hidden = true;
    unavailable.textContent = 'Photo unavailable. Open the listing below.';
    image.addEventListener('error', () => { image.hidden = true; unavailable.hidden = false; });
    const marker = document.createElement('span');
    marker.className = 'recent-photo__marker';
    marker.setAttribute('aria-hidden', 'true');
    marker.textContent = '⤢';
    photo.append(image, marker, unavailable);
    if (!shopDestination) photo.addEventListener('click', () => openOriginal(item, photo));
    const info = document.createElement('div');
    info.className = 'recent-piece__info';
    const heading = document.createElement('h3');
    const listing = document.createElement('a');
    listing.href = shopDestination ? productDestination(item) : item.url;
    if (!shopDestination) {
      listing.target = '_blank';
      listing.rel = 'noopener noreferrer';
    }
    listing.textContent = item.title;
    listing.setAttribute('aria-label', shopDestination ? `View ${item.title} in the Shop gallery` : `View ${item.title} on Vinted (opens in a new tab)`);
    heading.append(listing);
    const detail = document.createElement('p');
    detail.className = 'recent-piece__detail';
    detail.textContent = item.subtitle;
    const price = document.createElement('p');
    price.className = 'recent-piece__price';
    price.textContent = item.price;
    info.append(heading, detail, price);
    card.append(photo, info);
    if (shopDestination) card.addEventListener('click', event => {
      if (event.target.closest('a') || window.getSelection().toString()) return;
      window.location.assign(productDestination(item));
    });
    grid.append(card);
  }
  original.addEventListener('error', () => { original.hidden = true; error.hidden = false; });
  close.addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => {
    const rect = modal.getBoundingClientRect();
    if (event.target === modal && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) modal.close();
  });
  modal.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    trigger?.focus({ preventScroll: true });
  });
})();
