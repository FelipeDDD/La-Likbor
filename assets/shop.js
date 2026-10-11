/* Product data is copied verbatim from references/shop_current.html. No image processing or persistence. */
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalError = document.getElementById('modalError');
let photoTrigger;

function render(category = 'all') {
  const selected = items.filter(item => category === 'all' || item.cat === category);
  gallery.replaceChildren();
  document.getElementById('resultCount').textContent = `${String(selected.length).padStart(2, '0')} selected ${selected.length === 1 ? 'piece' : 'pieces'}`;
  selected.forEach(item => {
    const article = document.createElement('article');
    article.className = 'product ornate-card';
    const photo = document.createElement('button');
    photo.type = 'button';
    photo.className = 'pic';
    photo.setAttribute('aria-label', `Open original photograph: ${item.title}`);
    photo.setAttribute('aria-haspopup', 'dialog');
    const ambience = document.createElement('span');
    ambience.className = 'ambience';
    ambience.style.backgroundImage = `url("${item.img}")`;
    ambience.setAttribute('aria-hidden', 'true');
    const image = document.createElement('img');
    image.src = item.img;
    image.alt = `Original Vinted photograph of ${item.title}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    const zoom = document.createElement('span');
    zoom.className = 'photo-label';
    zoom.textContent = '⤢';
    zoom.setAttribute('aria-hidden', 'true');
    const error = document.createElement('span');
    error.className = 'photo-error';
    error.hidden = true;
    error.textContent = 'Photo unavailable from Vinted. View the listing below for the original.';
    image.addEventListener('error', () => { error.hidden = false; photo.classList.add('failed'); });
    photo.append(ambience, image, zoom, error);
    photo.addEventListener('click', () => showOriginal(item, photo));
    const data = document.createElement('div');
    data.className = 'product-data';
    const title = document.createElement('h2');
    title.textContent = item.title;
    const subtitle = document.createElement('div');
    subtitle.className = 'type';
    subtitle.textContent = item.subtitle;
    const tail = document.createElement('div');
    tail.className = 'product-tail';
    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = item.price;
    const listing = document.createElement('a');
    listing.className = 'listing-link';
    listing.href = item.url;
    listing.target = '_blank';
    listing.rel = 'noopener noreferrer';
    listing.textContent = 'View on Vinted ↗';
    listing.setAttribute('aria-label', `View ${item.title} on Vinted (opens in a new tab)`);
    tail.append(price, listing);
    data.append(title, subtitle, tail);
    article.append(photo, data);
    gallery.append(article);
  });
}

function setView(view) {
  document.body.classList.toggle('styled', view === 'styled');
  document.body.classList.toggle('original', view === 'original');
  for (const mode of ['styled', 'original']) {
    const button = document.getElementById(`${mode}Btn`);
    button.classList.toggle('on', mode === view);
    button.setAttribute('aria-pressed', String(mode === view));
  }
  document.getElementById('intensity').disabled = view === 'original';
}
document.getElementById('styledBtn').addEventListener('click', () => setView('styled'));
document.getElementById('originalBtn').addEventListener('click', () => setView('original'));
document.getElementById('intensity').addEventListener('change', event => { document.body.dataset.intensity = event.target.value; });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(other => {
    other.classList.toggle('active', other === button);
    other.setAttribute('aria-pressed', String(other === button));
  });
  render(button.dataset.filter);
}));

function showOriginal(item, trigger) {
  photoTrigger = trigger;
  modalImage.hidden = false;
  modalError.hidden = true;
  modalImage.alt = `Unfiltered original photograph of ${item.title}`;
  modalImage.src = item.img;
  document.getElementById('modalTitle').textContent = item.title;
  document.getElementById('modalLink').href = item.url;
  modal.showModal();
  document.body.classList.add('modal-open');
  document.getElementById('closeModal').focus();
}
modalImage.addEventListener('error', () => { modalImage.hidden = true; modalError.hidden = false; });
document.getElementById('closeModal').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  const rect = modal.getBoundingClientRect();
  if (event.target === modal && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) modal.close();
});
modal.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  photoTrigger?.focus({ preventScroll: true });
});
render();
