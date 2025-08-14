document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = modal?.querySelector('.close');
  const body = document.body;

  if (!modal || !modalImg || !closeBtn) return;

  // استخدام التفويض على document لالتقاط أي صورة حتى لو أضيفت لاحقاً
  document.addEventListener('click', (e) => {
    const img = e.target.closest('.mosaic img, .ex-grid-2 img');
    if (!img) return;

    modalImg.src = img.src;
    modal.classList.add('open');
    body.classList.add('modal-open');
  });

  const closeModal = () => {
    modal.classList.remove('open');
    body.classList.remove('modal-open');
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
