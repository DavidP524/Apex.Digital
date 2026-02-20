/**
 * Scroll Progress — fills the vertical bar between sticky-left and scroll-right
 * as the user scrolls through each sticky-section.
 */
export function initScrollProgress() {
  const sections = document.querySelectorAll('.sticky-section');
  if (sections.length === 0) return;

  function update() {
    sections.forEach(section => {
      const fill = section.querySelector('.scroll-progress-fill');
      if (!fill) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Progress: 0 when section top hits viewport, 1 when section bottom leaves
      const scrolled = viewportHeight - sectionTop;
      const total = sectionHeight + viewportHeight;
      const progress = Math.min(Math.max(scrolled / total, 0), 1);

      fill.style.height = `${progress * 100}%`;
    });

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
