'use strict';

/* =========================================
   TORFIN — Animations JS
   animations.js
   ========================================= */

/* --- Scroll Reveal (IntersectionObserver) --- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* --- Stagger Children Reveal --- */
function initStaggerReveal() {
  const staggerEls = document.querySelectorAll('.stagger-children');
  if (!staggerEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  staggerEls.forEach(el => observer.observe(el));
}

/* --- Underline Draw on Scroll --- */
function initUnderlineDraw() {
  const els = document.querySelectorAll('.underline-draw');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
}

/* --- Count-up Animation --- */
function countUp(el, target, duration = 1800) {
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const start = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = prefix + current + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = prefix + target + suffix;
    }
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        countUp(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* --- Floating Dots in Hero (decorative) --- */
function initFloatingDots() {
  const container = document.querySelector('.hero-grid-bg');
  if (!container) return;

  const count = 5; // Reduced from 8 — fewer simultaneous layers
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'floating-dot';
    const size = Math.random() * 5 + 3;
    dot.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `top:${Math.random() * 85}%`,
      `left:${Math.random() * 85}%`,
      `animation-duration:${4 + Math.random() * 4}s`,
      `animation-delay:${Math.random() * 3}s`,
      `opacity:${0.2 + Math.random() * 0.35}`,
    ].join(';');
    container.appendChild(dot);
  }
}

/* --- Init All --- */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initStaggerReveal();
  initUnderlineDraw();
  initCounters();
  initFloatingDots();
});
