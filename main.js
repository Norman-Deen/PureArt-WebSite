// Mobile nav toggle
document.querySelector('[data-js="nav-toggle"]')?.addEventListener('click', () => {
  document.querySelector('[data-js="nav"]')?.classList.toggle('is-open');
});
