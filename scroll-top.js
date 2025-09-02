(() => {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  // Порог появления (можно уменьшить для теста)
  const SHOW_AFTER = 200;

  // Показ/скрытие
  const onScroll = () => {
    btn.classList.toggle('show', window.scrollY > SHOW_AFTER);
  };

  // Скролл к верху
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Навешиваем слушатель
  window.addEventListener('scroll', onScroll, { passive: true });
  // Инициализация на старте
  onScroll();
})();
