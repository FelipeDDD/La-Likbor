// Isolated identity study. Does not read or modify the Shop's state or source.
document.querySelectorAll('[data-color]').forEach(button => button.addEventListener('click', () => {
  const color = button.dataset.color;
  document.querySelectorAll('[data-color]').forEach(other => {
    other.classList.toggle('active', other === button);
    other.setAttribute('aria-pressed', String(other === button));
  });
  document.querySelectorAll('[data-logo]').forEach(image => { image.src = `assets/brand/la-likbor-${image.dataset.logo}-${color}.svg`; });
  document.querySelectorAll('[data-download]').forEach(link => { link.href = `assets/brand/la-likbor-${link.dataset.download}-${color}.svg`; });
  document.querySelector('.portrait + figcaption span:last-child').textContent = color === 'ivory' ? 'Marfim envelhecido' : 'Bronze fosco';
}));
document.getElementById('transparency').addEventListener('click', event => {
  const active = document.body.classList.toggle('checker');
  event.currentTarget.setAttribute('aria-pressed', String(active));
  event.currentTarget.textContent = active ? 'Voltar ao preto' : 'Ver transparência';
});
