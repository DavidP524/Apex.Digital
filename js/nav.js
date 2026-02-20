/**
 * Navigation — mobile menu with focus trapping, active section tracking,
 * nav solidify on scroll, and smooth scroll-to-top on logo click
 */
export function initNav() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose = document.getElementById('menuClose');
  const siteNav = document.querySelector('.site-nav');
  const logoLink = document.getElementById('logoLink');

  // --- Mobile menu ---
  if (menuToggle && mobileMenu && menuClose) {
    const focusableEls = () =>
      mobileMenu.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');

    function openMenu() {
      mobileMenu.setAttribute('aria-hidden', 'false');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      setTimeout(() => menuClose.focus(), 300);
    }

    function closeMenu() {
      mobileMenu.setAttribute('aria-hidden', 'true');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuToggle.focus();
    }

    function trapFocus(e) {
      if (mobileMenu.getAttribute('aria-hidden') !== 'false') return;
      const els = focusableEls();
      if (els.length === 0) return;

      const first = els[0];
      const last = els[els.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }

      if (e.key === 'Escape') {
        closeMenu();
      }
    }

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    document.addEventListener('keydown', trapFocus);

    mobileMenu.querySelectorAll('a[href]').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- Logo scroll-to-top ---
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Nav solidify on scroll ---
  if (siteNav) {
    let ticking = false;
    function updateNav() {
      if (window.scrollY > 100) {
        siteNav.classList.add('scrolled');
      } else {
        siteNav.classList.remove('scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });
  }

  // --- Active nav link tracking ---
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('section[id]');

  if (navLinks.length > 0 && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            if (link.dataset.section === id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }
}
