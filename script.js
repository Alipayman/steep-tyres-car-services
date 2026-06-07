const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function closeMobileMenu() {
  if (!toggle || !navLinks) return;

  navLinks.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('scroll', () => {
    if (navLinks.classList.contains('open')) {
      closeMobileMenu();
    }
  }, { passive: true });
}
