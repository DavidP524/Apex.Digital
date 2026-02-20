/**
 * Dark Mode — toggle, localStorage persistence, system preference detection
 */
export function initDarkMode() {
  const toggle = document.getElementById('darkModeToggle');
  const mobileToggle = document.getElementById('darkModeToggleMobile');
  if (!toggle) return;

  const root = document.documentElement;
  const STORAGE_KEY = 'apex-dark-mode';

  function setTheme(dark) {
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    updateIcons(dark);
  }

  function updateIcons(dark) {
    [toggle, mobileToggle].forEach(btn => {
      if (!btn) return;
      const sunIcon = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      if (sunIcon && moonIcon) {
        // Sun shows when dark (click to go light), moon shows when light (click to go dark)
        sunIcon.style.display = dark ? 'block' : 'none';
        moonIcon.style.display = dark ? 'none' : 'block';
      }
    });
  }

  function handleToggle() {
    const isDark = root.classList.toggle('dark');
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    updateIcons(isDark);
  }

  // Determine initial theme
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    setTheme(saved === 'dark');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark);
  }

  // Listen for toggle clicks
  toggle.addEventListener('click', handleToggle);
  if (mobileToggle) mobileToggle.addEventListener('click', handleToggle);

  // Listen for system preference changes (if no saved preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches);
    }
  });
}
