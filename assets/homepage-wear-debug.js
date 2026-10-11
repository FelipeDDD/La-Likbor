/* Inspection overlay only. Does not generate, move or duplicate any crop. */
const debugHero = document.querySelector('.home-hero');
const debugMarks = [...document.querySelectorAll('.micro-mark')];
const debugLabels = document.querySelector('.wear-debug-labels');
const debugPanel = document.querySelector('.wear-debug-panel');
const inventoryBody = document.querySelector('.wear-debug-inventory tbody');
const colors = { border: '#f28a8a', inward: '#76bbf2', logo: '#e5e5e5' };

function showDebugInventory() {
  const heroBox = debugHero.getBoundingClientRect();
  const panelBox = debugPanel.getBoundingClientRect();
  const scale = Number(getComputedStyle(document.body).getPropertyValue('--debug-scale'));
  const fragmentKeys = new Set();
  const labels = [];
  const rows = [];
  for (const mark of debugMarks) {
    const style = getComputedStyle(mark);
    const box = mark.getBoundingClientRect();
    const id = mark.dataset.debugId;
    const group = mark.dataset.debugGroup;
    const source = mark.classList.contains('from-right') ? 'D' : 'E';
    const sourceX = -parseFloat(style.getPropertyValue('--sx'));
    const sourceY = -parseFloat(style.getPropertyValue('--sy'));
    const width = parseFloat(style.width);
    const height = parseFloat(style.height);
    const key = `${source}:${sourceX}:${sourceY}:${width}:${height}`;
    const repeated = fragmentKeys.has(key);
    fragmentKeys.add(key);
    const parentBox = mark.parentElement.getBoundingClientRect();
    const clips = [];
    if (mark.parentElement.classList.contains('micro-wear-perimeter') &&
        (box.left < parentBox.left || box.right > parentBox.right || box.top < parentBox.top || box.bottom > parentBox.bottom)) {
      clips.push('container');
    }
    if (box.left < 0 || box.right > window.innerWidth || box.top < 0 || box.bottom > window.innerHeight) {
      clips.push('viewport');
    }

    const label = document.createElement('span');
    label.className = 'wear-debug-label';
    label.textContent = id;
    label.style.setProperty('--label-color', colors[group]);
    let x = Math.min(Math.max(box.left, 4), window.innerWidth - 44);
    let y = Math.max(box.top - 16, 1);
    if (x + 35 > panelBox.left && x < panelBox.right && y + 15 > panelBox.top && y < panelBox.bottom) {
      y = box.bottom + 3;
    }
    label.style.left = `${x - heroBox.left}px`;
    label.style.top = `${y - heroBox.top}px`;
    label.title = `${id}: origem ${source} (${sourceX}, ${sourceY}), janela ${width}×${height}; escala ${scale}×`;
    labels.push(label);

    const row = document.createElement('tr');
    const coordinate = `${Math.round(box.left)},${Math.round(box.top)}`;
    const size = `${+(width * scale).toFixed(1)}×${+(height * scale).toFixed(1)}`;
    const cells = [id, `${source} ${sourceX},${sourceY}`, size, coordinate, repeated ? 'SIM' : 'não', clips.join(' + ') || '—'];
    for (const [index, value] of cells.entries()) {
      const td = document.createElement('td');
      td.textContent = value;
      if (index === 0) td.style.color = colors[group];
      if (index === 1) td.className = 'source-cell';
      row.append(td);
    }
    rows.push(row);
  }
  debugLabels.replaceChildren(...labels);
  inventoryBody.replaceChildren(...rows);
  document.querySelector('[data-debug-duplicates]').textContent = `${debugMarks.length - fragmentKeys.size} recortes idênticos`;
  document.querySelector('[data-debug-base-count]').textContent = window.innerWidth <= 700 ? 'Base: 2 faixas originais, além dos 31 recortes.' : 'Base: 1 extração ampla, além dos 31 recortes.';
}

document.querySelector('[data-debug-annotations]').addEventListener('change', event => {
  document.body.classList.toggle('debug-without-annotations', !event.target.checked);
});
document.querySelector('[data-debug-colors]').addEventListener('change', event => {
  document.body.classList.toggle('debug-native-colors', !event.target.checked);
});
debugPanel.addEventListener('toggle', showDebugInventory);
window.addEventListener('resize', showDebugInventory);
window.addEventListener('scroll', showDebugInventory, { passive: true });
document.fonts.ready.then(showDebugInventory);
