const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function closeMobileMenu() {
  if (!toggle || !navLinks) return;

  if (navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
}

if (toggle && navLinks) {
  toggle.addEventListener('click', (event) => {
    event.stopPropagation();

    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close mobile dropdown as soon as the user starts moving the page.
  // touchmove and wheel are included because some mobile browsers delay the scroll event.
  ['scroll', 'touchmove', 'wheel', 'resize'].forEach((eventName) => {
    window.addEventListener(eventName, closeMobileMenu, { passive: true });
  });

  // Also close when tapping anywhere outside the menu.
  document.addEventListener('click', (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = toggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMobileMenu();
    }
  });
}
