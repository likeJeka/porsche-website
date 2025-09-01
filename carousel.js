// ===== Карусель: только кнопками, шаг = ровно 1 карточка =====
document.querySelectorAll(".models-row-wrap").forEach((wrap) => {
  const row = wrap.querySelector(".models-row");
  const prev = wrap.querySelector(".row-arrow.prev");
  const next = wrap.querySelector(".row-arrow.next");
  if (!row || !prev || !next) return;

  let stepPX = 300; // фолбэк
  const calcStep = () => {
    const first = row.querySelector(".model-card");
    const gap = parseFloat(getComputedStyle(row).gap) || 0;
    stepPX = first
      ? first.getBoundingClientRect().width + gap
      : row.clientWidth;
    updateArrows();
  };

  const updateArrows = () => {
    const maxScroll = row.scrollWidth - row.clientWidth;
    wrap.classList.toggle("no-scroll", maxScroll <= 0);
    prev.disabled = row.scrollLeft <= 1;
    next.disabled = row.scrollLeft >= maxScroll - 1;
  };

  prev.addEventListener("click", () =>
    row.scrollBy({ left: -stepPX, behavior: "smooth" })
  );
  next.addEventListener("click", () =>
    row.scrollBy({ left: stepPX, behavior: "smooth" })
  );

  row.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", calcStep);

  // Следим за изменением размеров карточки/контейнера
  const ro = new ResizeObserver(calcStep);
  ro.observe(row);

  calcStep(); // инициализация
});
