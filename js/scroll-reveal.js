/**
 * Scroll Reveal — IntersectionObserver-based entrance animations
 */
export function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const scrollContainer = document.getElementById('scrollContainer');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once, then stop watching
        }
      });
    },
    { root: scrollContainer || null, threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
}
