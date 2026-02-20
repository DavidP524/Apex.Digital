/**
 * App — main entry point, imports and initializes all modules
 */
import { initNav } from './nav.js';
import { initScrollReveal } from './scroll-reveal.js';
import { initScrollProgress } from './scroll-progress.js';
import { initContactForm } from './contact-form.js';
import { initDarkMode } from './dark-mode.js';

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNav();
  initScrollReveal();
  initScrollProgress();
  initContactForm();
});
