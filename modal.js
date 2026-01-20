// modal.js
(() => {
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("closeModal");
  const form = document.querySelector(".contact-form");
  const successMsg = document.getElementById("successMessage");
  const phoneInput = document.getElementById("phone");
  const dialog = modal?.querySelector(".modal-window");

  // КНОПКИ ОТКРЫТИЯ (БЕЗ ИЗМЕНЕНИЯ HTML)
  const headerOpenBtn = document.getElementById("openModal");
  const mobileOpenBtn = document.querySelector(".mobile-call-btn");

  if (!modal || !closeBtn) return;

  let lastFocus = null;

  const isOpen = () => !modal.classList.contains("hidden");
  const lockScroll = (on) => {
    document.documentElement.style.overflow = on ? "hidden" : "";
  };

  // Focus trap
  const trapFocus = (e) => {
    if (e.key !== "Tab" || !isOpen()) return;

    const focusables = modal.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const open = () => {
    lastFocus = document.activeElement;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    lockScroll(true);

    const firstInput = modal.querySelector(
      "input, button, [tabindex]:not([tabindex='-1'])"
    );
    (firstInput || dialog)?.focus();

    document.addEventListener("keydown", trapFocus);
  };

  const close = () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    lockScroll(false);

    document.removeEventListener("keydown", trapFocus);
    lastFocus && lastFocus.focus();
  };

  // === ОТКРЫТИЕ ИЗ ХЕДЕРА ===
  if (headerOpenBtn) {
    headerOpenBtn.addEventListener("click", open);
  }

  // === ОТКРЫТИЕ ИЗ МОБИЛЬНОГО МЕНЮ ===
  if (mobileOpenBtn) {
    mobileOpenBtn.addEventListener("click", () => {
      open();
      document.querySelector(".mobile-menu")?.classList.remove("active");
    });
  }

  // Закрытие
  closeBtn.addEventListener("click", close);

  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("overlay")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) close();
  });

  // Фильтр телефона
  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneInput.value = phoneInput.value.replace(/[^0-9+\-()\s]/g, "");
    });
  }

  // Отправка формы
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const data = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        consent: formData.get("consent"),
      };

      fetch(
        "https://script.google.com/macros/s/AKfycbyrPKzMT3xifHkFMipG6_BXwP9ja-2_F8rWRTLXSW4O42L_A-gcWshFRlSgJpN5IK4/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      successMsg.classList.remove("hidden");
      form.reset();

      setTimeout(() => {
        close();
        successMsg.classList.add("hidden");
      }, 3000);
    });
  }
    // ===== Mobile menu =====
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenu = document.querySelector(".close-menu");

  if (burger && mobileMenu && closeMenu) {
    burger.addEventListener("click", () => {
      mobileMenu.classList.add("active");
    });

    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  }

})();
