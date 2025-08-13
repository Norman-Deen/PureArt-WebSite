document.addEventListener('DOMContentLoaded', () => {
  // ===== استيراد الفوتر =====
  fetch("../components/footer.html")
    .then(res => res.text())
    .then(data => {
      document.body.insertAdjacentHTML("beforeend", data);
    })
    .catch(err => console.error("Error loading footer:", err));

  // ===== منطق المودال =====
  const modal = document.getElementById('imgModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = modal?.querySelector('.close');
  const body = document.body;
  if (!modal || !modalImg || !closeBtn) return;

  document.addEventListener('click', (e) => {
    // لو الكليك على رابط ضمن الجاليري، خليه يفتح الصفحة عادي
    if (e.target.closest('.gallery a')) return;

    // افتح المودال فقط لصور الموزاييك
    const img = e.target.closest('.mosaic img');
    if (!img) return;

    modalImg.src = img.src;
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  });

  const closeModal = () => {
    modal.classList.remove('open');
    body.classList.remove('modal-open'); // إعادة التمرير
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
});
