(() => {
  const galleryRow = document.getElementById("galleryRow");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.querySelector(".lightbox-close");

  if (!galleryRow) return;

  const images = [
    "gallery-1.jpg",
    "gallery-2.jpg",
    "gallery-3.jpg",
    "gallery-4.jpg",
    "gallery-5.jpg",
    "gallery-6.jpg",
    "gallery-7.jpg",
    "gallery-8.jpg",
    "gallery-9.jpg",
    "gallery-10.jpg",
    "gallery-11.jpg",
    "gallery-12.jpg",
    "gallery-13.jpg",
  ];

  images.forEach((file, index) => {
    const img = document.createElement("img");
    img.src = `./pictures/${file}`;
    img.alt = `Porsche gallery ${index + 1}`;
    img.loading = "lazy";

    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.remove("hidden");
      document.documentElement.style.overflow = "hidden";
    });

    galleryRow.appendChild(img);
  });

  const close = () => {
    lightbox.classList.add("hidden");
    lightboxImg.src = "";
    document.documentElement.style.overflow = "";
  };

  closeBtn?.addEventListener("click", close);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();
