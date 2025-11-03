document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("mediaModal");
  if (!modal) return; // Stop if page has no modal

  const modalImg = document.getElementById("modalImg");
  const modalVideo = document.getElementById("modalVideo");
  const closeBtn = modal.querySelector(".close");
  const body = document.body;

  // Hide both by default
  modalImg.style.display = "none";
  modalVideo.style.display = "none";

  document.addEventListener("click", (e) => {
    const img = e.target.closest(".mosaic img, .ex-grid-2 img");
    const video = e.target.closest(".ex-grid-2 video");
    if (!img && !video) return; // Ignore clicks outside

    // Reset both first
    modalImg.style.display = "none";
    modalVideo.style.display = "none";

    if (img) {
      // Load full-size image
      modalImg.src = img.dataset.full || img.src;
      modalImg.style.display = "block";
    } else if (video) {
      // Play video inside modal
      modalVideo.src = video.src;
      modalVideo.style.display = "block";
      modalVideo.muted = true;
      modalVideo.play().then(() => {
        modalVideo.muted = false; // unmute after autoplay starts
      }).catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
    }

    modal.classList.add("open");
    body.classList.add("modal-open");
  });

  // Close modal function
  const closeModal = () => {
    modal.classList.remove("open");
    body.classList.remove("modal-open");
    modalVideo.pause();
    modalVideo.src = ""; // reset video
  };

  // Close handlers: button, backdrop click, ESC key
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});


// ===== Dynamic year in footer =====
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear(); // Auto-update year
  }
});


// ===== Mosaic Gallery Randomizer =====
document.addEventListener("DOMContentLoaded", () => {
  // Full list of available images (main .jpg paths)
  const imageList = [
    "assets/img/studio-light-30-cam-05.jpg",
  "assets/img/spirit-vik.jpg",
  "assets/img/spirit-u-b.jpg",
  "assets/img/product-bar.jpg",
  "assets/img/product-63.jpg",
  "assets/img/product-62.jpg",
  "assets/img/product-61.jpg",
  "assets/img/product-60.jpg",
  "assets/img/product-59.jpg",
  "assets/img/product-58.jpg",
  "assets/img/product-57.jpg",
  "assets/img/product-56.jpg",
  "assets/img/product-55.jpg",
  "assets/img/product-54.jpg",
  "assets/img/product-53.jpg",
  "assets/img/product-52.jpg",
  "assets/img/product-51.jpg",
  "assets/img/product-50.jpg",
  "assets/img/product-49.jpg",
  "assets/img/product-48.jpg",
  "assets/img/product-47.jpg",
  "assets/img/product-46.jpg",
  "assets/img/product-45.jpg",
  "assets/img/product-44.jpg",
  "assets/img/product-43.jpg",
  "assets/img/product-42.jpg",
  "assets/img/product-41.jpg",
  "assets/img/product-40.jpg",
  "assets/img/product-39.jpg",
  "assets/img/product-38.jpg",
  "assets/img/product-37.jpg",
  "assets/img/product-36.jpg",
  "assets/img/product-35.jpg",
  "assets/img/product-34.jpg",
  "assets/img/product-33.jpg",
  "assets/img/product-32.jpg",
  "assets/img/product-31.jpg",
  "assets/img/product-30.jpg",
  "assets/img/product-29.jpg",
  "assets/img/product-28.jpg",
  "assets/img/product-27.jpg",
  "assets/img/product-26.jpg",
  "assets/img/product-25.jpg",
  "assets/img/product-24.jpg",
  "assets/img/product-23.jpg",
  "assets/img/product-22.jpg",
  "assets/img/product-21.jpg",
  "assets/img/product-20.jpg",
  "assets/img/product-19.jpg",
  "assets/img/product-18.jpg",
  "assets/img/product-17.jpg",
  "assets/img/product-16.jpg",
  "assets/img/product-15.jpg",
  "assets/img/product-14.jpg",
  "assets/img/product-13.jpg",
  "assets/img/product-12.jpg",
  "assets/img/product-11.jpg",
  "assets/img/product-10.jpg",
  "assets/img/product-09.jpg",
  "assets/img/product-08.jpg",
  "assets/img/product-07.jpg",
  "assets/img/product-06.jpg",
  "assets/img/product-05.jpg",
  "assets/img/product-04.jpg",
  "assets/img/product-03.jpg",
  "assets/img/product-02.jpg",
  "assets/img/product-01.jpg",
  "assets/img/product.jpg",
  "assets/img/other-bar.jpg",
  "assets/img/other-36.jpg",
  "assets/img/other-35.jpg",
  "assets/img/other-34.jpg",
  "assets/img/other-33.jpg",
  "assets/img/other-32.jpg",
  "assets/img/other-31.jpg",
  "assets/img/other-30.jpg",
  "assets/img/other-29.jpg",
  "assets/img/other-28.jpg",
  "assets/img/other-27.jpg",
  "assets/img/other-26.jpg",
  "assets/img/other-25.jpg",
  "assets/img/other-24.jpg",
  "assets/img/other-23.jpg",
  "assets/img/other-22.jpg",
  "assets/img/other-21.jpg",
  "assets/img/other-20.jpg",
  "assets/img/other-19.jpg",
  "assets/img/other-18.jpg",
  "assets/img/other-17.jpg",
  "assets/img/other-16.jpg",
  "assets/img/other-15.jpg",
  "assets/img/other-14.jpg",
  "assets/img/other-13.jpg",
  "assets/img/other-12.jpg",
  "assets/img/other-11.jpg",
  "assets/img/other-10.jpg",
  "assets/img/other-09.jpg",
  "assets/img/other-08.jpg",
  "assets/img/other-07.jpg",
  "assets/img/other-06.jpg",
  "assets/img/other-05.jpg",
  "assets/img/other-04.jpg",
  "assets/img/other-03.jpg",
  "assets/img/other-02.jpg",
  "assets/img/other-01.jpg",
  "assets/img/other.jpg",
  "assets/img/music-symbol.jpg",
  "assets/img/interior-35.jpg",
  "assets/img/interior-34.jpg",
  "assets/img/interior-33.jpg",
  "assets/img/interior-32.jpg",
  "assets/img/interior-31.jpg",
  "assets/img/interior-30.jpg",
  "assets/img/interior-29.jpg",
  "assets/img/interior-28.jpg",
  "assets/img/interior-27.jpg",
  "assets/img/interior-26.jpg",
  "assets/img/interior-25.jpg",
  "assets/img/interior-24.jpg",
  "assets/img/interior-23.jpg",
  "assets/img/interior-22.jpg",
  "assets/img/interior-21.jpg",
  "assets/img/interior-20.jpg",
  "assets/img/interior-19.jpg",
  "assets/img/interior-18.jpg",
  "assets/img/interior-17.jpg",
  "assets/img/interior-16.jpg",
  "assets/img/interior-15.jpg",
  "assets/img/interior-14.jpg",
  "assets/img/interior-13.jpg",
  "assets/img/interior-12.jpg",
  "assets/img/interior-11.jpg",
  "assets/img/interior-10.jpg",
  "assets/img/interior-09.jpg",
  "assets/img/interior-08.jpg",
  "assets/img/interior-07.jpg",
  "assets/img/interior-06.jpg",
  "assets/img/interior-05.jpg",
  "assets/img/interior-04.jpg",
  "assets/img/interior-03.jpg",
  "assets/img/interior-02.jpg",
  "assets/img/interior-01.jpg",
  "assets/img/interior.jpg",
  "assets/img/instructions-for-replacement.jpg",
  "assets/img/film-bar.jpg",
  "assets/img/film.jpg",
  "assets/img/ferrari458-low.jpg",
  "assets/img/exterior-bar.jpg",
  "assets/img/exterior-13.jpg",
  "assets/img/exterior-12.jpg",
  "assets/img/exterior-11.jpg",
  "assets/img/exterior-10.jpg",
  "assets/img/exterior-09.jpg",
  "assets/img/exterior-08.jpg",
  "assets/img/exterior-07.jpg",
  "assets/img/exterior-06.jpg",
  "assets/img/exterior-05.jpg",
  "assets/img/exterior-04.jpg",
  "assets/img/exterior-03.jpg",
  "assets/img/exterior-02.jpg",
  "assets/img/exterior-01.jpg",
  "assets/img/classicbathroom.jpg",
  "assets/img/badrum-24-animation.jpg",
  "assets/img/animation-women-shadow.jpg",
  "assets/img/360.jpg",
  ];

  const mosaicImages = document.querySelectorAll(".mosaic-grid img");

  if (mosaicImages.length > 0) {
    setInterval(() => {
      // Pick random image element in mosaic
      const randomImage =
        mosaicImages[Math.floor(Math.random() * mosaicImages.length)];
      // Pick random source from imageList
      const randomSrc = imageList[Math.floor(Math.random() * imageList.length)];

      // Fade-out effect before changing
      randomImage.classList.add("fade-out");
      setTimeout(() => {
        // Use thumbnail version in mosaic, full in dataset
        randomImage.src = randomSrc
          .replace("assets/img/", "assets/img/thumb/")
          .replace(".jpg", "-thumb.webp");
        randomImage.dataset.full = randomSrc;
        randomImage.classList.remove("fade-out");
      }, 500);
    }, 2000); // Every 2 seconds
  }
});




// ===== Google Analytics (load directly on all pages) =====
(function(){
  const gaScript = document.createElement("script");
  gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-DZW0DYH2TY";
  gaScript.async = true;
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-DZW0DYH2TY');
})();




// ===== Image navigation (← →) inside modal — FIXED =====
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("mediaModal");
  const modalImg = document.getElementById("modalImg");
  const modalVideo = document.getElementById("modalVideo");
  if (!modal || !modalImg) return;

  // كل الصور القابلة للتنقّل
  const imgs = Array.from(document.querySelectorAll(".ex-grid-2 img, .mosaic img"));
  let currentIndex = -1;

  // احفظ الفهرس عند فتح صورة
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".ex-grid-2 img, .mosaic img");
    const vid = e.target.closest(".ex-grid-2 video");
    if (img) {
      currentIndex = imgs.indexOf(img);
      showArrows(true);
    } else if (vid) {
      showArrows(false); // فيديو → أخفِ الأسهم
    }
  });

  // أزرار الأسهم
  let left = modal.querySelector(".arrow-btn--left");
  let right = modal.querySelector(".arrow-btn--right");
  if (!left) {
    left = document.createElement("button");
    left.className = "arrow-btn arrow-btn--left";
    left.setAttribute("aria-label", "Previous");
    left.textContent = "◄";
    modal.appendChild(left);
  }
  if (!right) {
    right = document.createElement("button");
    right.className = "arrow-btn arrow-btn--right";
    right.setAttribute("aria-label", "Next");
    right.textContent = "►";
    modal.appendChild(right);
  }

  // أنماط ثابتة للأسهم
  const style = document.createElement("style");
  style.textContent = `
    .arrow-btn{
      position: fixed; top:50%; transform: translateY(-50%);
      font-size: 2rem; color:#fff; background:rgba(0,0,0,.45);
      border:0; cursor:pointer; padding:.45em .6em; border-radius:10px;
      z-index:10050; user-select:none; display:none;
    }
    .arrow-btn--left  { left: clamp(12px, 2vw, 24px); }
    .arrow-btn--right { right: clamp(12px, 2vw, 24px); }
    .arrow-btn:hover { background: rgba(0,0,0,.7); }
  `;
  document.head.appendChild(style);

  function showImage(index) {
    if (!imgs.length) return;
    if (index < 0) index = imgs.length - 1;
    if (index >= imgs.length) index = 0;
    currentIndex = index;
    const img = imgs[currentIndex];
    // عرض الصورة داخل المودال
    if (modalVideo) modalVideo.style.display = "none";
    modalImg.src = img.dataset.full || img.src;
    modalImg.style.display = "block";
    showArrows(true);
  }

  function showArrows(show) {
    const onImage = show && modal.classList.contains("open") && modalImg.style.display !== "none";
    left.style.display = onImage ? "block" : "none";
    right.style.display = onImage ? "block" : "none";
  }

  left.addEventListener("click", () => showImage(currentIndex - 1));
  right.addEventListener("click", () => showImage(currentIndex + 1));

  // دعم لوحة المفاتيح
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (modalImg.style.display === "none") return; // لا تتنقّل إن كان فيديو
    if (e.key === "ArrowLeft")  { e.preventDefault(); showImage(currentIndex - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); showImage(currentIndex + 1); }
  });

  // راقب فتح/إغلاق المودال وتبديل المحتوى لإظهار/إخفاء الأسهم تلقائياً
  const mo = new MutationObserver(() => showArrows(true));
  mo.observe(modal, { attributes: true, attributeFilter: ["class"] });
  const mo2 = new MutationObserver(() => showArrows(true));
  mo2.observe(modalImg,  { attributes: true, attributeFilter: ["style"] });
  if (modalVideo) mo2.observe(modalVideo, { attributes: true, attributeFilter: ["style"] });
});
