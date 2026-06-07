const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function isMenuOpen() {
  return Boolean(navLinks && navLinks.classList.contains('open'));
}

function closeMobileMenu() {
  if (!toggle || !navLinks) return;

  navLinks.classList.remove('open');
  document.body.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
}

function openMobileMenu() {
  if (!toggle || !navLinks) return;

  navLinks.classList.add('open');
  document.body.classList.add('menu-open');
  toggle.setAttribute('aria-expanded', 'true');
}

if (toggle && navLinks) {
  let startY = 0;
  let startX = 0;
  let lastScrollY = window.scrollY;

  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isMenuOpen()) {
      closeMobileMenu();
    } else {
      openMobileMenu();
      lastScrollY = window.scrollY;
    }
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('touchstart', (event) => {
    if (!isMenuOpen()) return;

    startY = event.touches[0].clientY;
    startX = event.touches[0].clientX;
  }, { passive: true, capture: true });

  document.addEventListener('touchmove', (event) => {
    if (!isMenuOpen()) return;

    const currentY = event.touches[0].clientY;
    const currentX = event.touches[0].clientX;
    const movedY = Math.abs(currentY - startY);
    const movedX = Math.abs(currentX - startX);

    // Close as soon as a real swipe/scroll movement starts.
    if (movedY > 8 || movedX > 16) {
      closeMobileMenu();
    }
  }, { passive: true, capture: true });

  document.addEventListener('wheel', () => {
    if (isMenuOpen()) closeMobileMenu();
  }, { passive: true, capture: true });

  window.addEventListener('scroll', () => {
    if (!isMenuOpen()) return;

    if (Math.abs(window.scrollY - lastScrollY) > 2) {
      closeMobileMenu();
    }
  }, { passive: true });

  window.addEventListener('resize', closeMobileMenu);

  document.addEventListener('click', (event) => {
    if (!isMenuOpen()) return;

    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = toggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMobileMenu();
    }
  }, true);
}
