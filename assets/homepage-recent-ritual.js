/* The existing Recent Pieces script owns products, links and Original dialog.
   This adapter opts only its four previews into the shared Shop treatment. */
(() => {
  for (const image of document.querySelectorAll('.recent-photo > img')) {
    const surface = document.createElement('span');
    surface.className = 'photo-treatment';
    surface.dataset.photoView = 'styled';
    surface.dataset.intensity = 'ritual';
    surface.dataset.photoPalette = 'neutral';
    image.classList.add('photo-treatment__image');
    image.before(surface);
    surface.append(image);
  }
})();
