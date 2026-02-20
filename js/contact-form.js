/**
 * Contact Form — simulated submission for design mockup
 * TODO: Replace simulated delay with a real endpoint (Formspree, Netlify Forms, etc.)
 */
export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset status
    status.className = 'form-status';
    status.textContent = '';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate network delay (replace with real fetch when backend is ready)
    await new Promise(resolve => setTimeout(resolve, 1500));

    status.className = 'form-status success';
    status.textContent = "Your mockup request has been received — we'll be in touch within 48 hours.";
    form.reset();

    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  });
}
