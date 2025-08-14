document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('mediaModal');
  const modalImg = document.getElementById('modalImg');
  const modalVideo = document.getElementById('modalVideo');
  const closeBtn = modal.querySelector('.close');
  const body = document.body;

  modalImg.style.display = 'none';
  modalVideo.style.display = 'none';

  document.addEventListener('click', (e) => {
    const img = e.target.closest('.mosaic img, .ex-grid-2 img');
    const video = e.target.closest('.ex-grid-2 video');

    if (!img && !video) return;

    // إخفاء الاثنين أولاً
    modalImg.style.display = 'none';
    modalVideo.style.display = 'none';

    if (img) {
      modalImg.src = img.src;
      modalImg.style.display = 'block';
    } 
else if (video) {
  modalVideo.src = video.src;
  modalVideo.style.display = 'block';
  modalVideo.muted = true; // عشان يشتغل فوراً
  modalVideo.play().then(() => {
    modalVideo.muted = false; // فك الكتم بعد التشغيل
  }).catch(err => {
    console.warn("Autoplay blocked:", err);
  });
}


    modal.classList.add('open');
    body.classList.add('modal-open');
  });

  const closeModal = () => {
    modal.classList.remove('open');
    body.classList.remove('modal-open');
    modalVideo.pause();
    modalVideo.src = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});
