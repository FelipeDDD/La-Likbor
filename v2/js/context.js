/* Local V2 routing adapter. Shared catalog and gallery scripts remain unchanged. */
(() => {
  const grid = document.getElementById('recent-pieces');
  if (grid?.dataset.shopDestination)
    grid.dataset.shopDestination = new URL(grid.dataset.shopDestination, document.baseURI).href;
})();
