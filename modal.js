const modal       = document.getElementById('modal');
const openBtn     = document.getElementById('openModal');
const closeBtn    = document.getElementById('closeModal');
const form        = document.querySelector('.contact-form');
const successMsg  = document.getElementById('successMessage');
const phoneInput  = document.getElementById('phone');

if (modal && openBtn && closeBtn) {
  let lastFocus = null;

  const open = () => {
    lastFocus = document.activeElement;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
  };

  const close = () => {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    lastFocus && lastFocus.focus();
  };

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  // закрыть по клику на фон
  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay')) close();
  });

  // ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) close();
  });

  // живой фильтр для телефона
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/[^0-9+\-()\s]/g, '');
    });
  }

  // отправка формы (демо)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity?.()) {
        form.reportValidity?.();
        return;
      }
      successMsg?.classList.remove('hidden');
      form.reset();
      setTimeout(() => {
        close();
        successMsg?.classList.add('hidden');
      }, 3000);
    });
  }
}
