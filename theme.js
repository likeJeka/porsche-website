(() => {
  const KEY = "theme"; // 'light' | 'dark'
  const root = document.documentElement;
  const buttons = document.querySelectorAll(".theme-toggle");

  if (!buttons.length) return;

  // Определяем стартовую тему: localStorage > системная > light
  const stored = localStorage.getItem(KEY);
  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  ).matches;
  const initial = stored || (prefersDark ? "dark" : "light");

  const apply = (mode) => {
    root.setAttribute("data-theme", mode === "dark" ? "dark" : "light");

    buttons.forEach((btn) => {
      const isDark = mode === "dark";
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
      btn.title = "Toggle theme";
      btn.textContent = isDark ? "☀️" : "🌙";
    });
  };

  apply(initial);

  // Реакция на смену системной темы (если пользователь не зафиксировал выбор)
  if (!stored && window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener?.("change", (e) =>
      apply(e.matches ? "dark" : "light")
    );
  }

  // Клик по любой кнопке темы
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current =
        root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(KEY, next);
      apply(next);
    });
  });
})();
