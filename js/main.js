'use strict';

/* --- Navbar Scroll Behavior --- */
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

function handleNavbarScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

/* --- Mobile Menu --- */
function toggleMobileMenu() {
  const isOpen = hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
  hamburger.setAttribute('aria-expanded', String(isOpen));
}
hamburger.addEventListener('click', toggleMobileMenu);

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
    toggleMobileMenu();
  }
});

/* --- Active Nav Link --- */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta), .mobile-nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const active = href === currentPage || (currentPage === '' && href === 'index.html');
    link.classList.toggle('active', active);
  });
}
setActiveNavLink();

/* --- Smooth Scroll for Anchor Links --- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* --- Accordion --- */
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
      const item = this.closest('.accordion-item');
      const body = item.querySelector('.accordion-body');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item.open').forEach(open => {
        open.classList.remove('open');
        open.querySelector('.accordion-body').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
      this.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}
initAccordion();

/* --- Contact Form Validation --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const successMsg = document.getElementById('successMessage');

  function showError(id, show) {
    const inp = document.getElementById(id);
    const err = document.getElementById(id + 'Error');
    if (inp) inp.classList.toggle('error', show);
    if (err) err.classList.toggle('show', show);
  }

  function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  form.addEventListener('submit', function (e) {
    ['name', 'email', 'message'].forEach(id => showError(id, false));
    let hasError = false;
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    if (!name) { showError('name', true); hasError = true; }
    if (!email || !validateEmail(email)) { showError('email', true); hasError = true; }
    if (message.length < 10) { showError('message', true); hasError = true; }

    if (hasError) {
      e.preventDefault();
      return;
    }

    // Validation passes. Let the browser submit to FormSubmit natively.
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
  });
}
initContactForm();

document.body.classList.add('page-enter');

/* =========================================
   CUSTOM CURSOR
   ========================================= */
(function initCursor() {
  // Skip on touch-only devices
  if (window.matchMedia('(hover: none)').matches) return;

  // Inject cursor elements
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.id = 'cursor-dot';
  ring.id = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  // Update raw mouse position instantly
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Move dot immediately (feels snappy)
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  }, { passive: true });

  // Lerp ring towards mouse on every frame
  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateRing() {
    ringX = lerp(ringX, mouseX, 0.12);
    ringY = lerp(ringY, mouseY, 0.12);

    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    requestAnimationFrame(animateRing);
  }
  requestAnimationFrame(animateRing);

  // Hover state — enlarge ring over clickable elements
  const hoverTargets = 'a, button, [role="button"], input, textarea, select, label, .service-card, .product-card-dark, .product-showcase-card, .team-card, .value-card, .testimonial-card, .accordion-header, .tech-badge';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('cursor-hover');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('cursor-hover');
    }
  }, { passive: true });

  // Click state — quick squeeze animation
  document.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-click');
  });
  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-click');
  });

  // Dark background detection — flip dot/ring to white on navy sections
  const darkSections = document.querySelectorAll(
    '.hero, .products-teaser, .cta-banner, .mobile-nav, footer, .page-hero, .contact-info-header'
  );

  if (darkSections.length) {
    function updateCursorColor() {
      const el = document.elementFromPoint(mouseX, mouseY);
      if (!el) return;
      let isDark = false;
      darkSections.forEach(sec => {
        if (sec.contains(el) || sec === el) isDark = true;
      });
      document.body.classList.toggle('cursor-dark', isDark);
    }

    // Throttle color check to every 100ms to avoid layout thrashing
    let colorTick = 0;
    function tickColor(ts) {
      if (ts - colorTick > 100) {
        updateCursorColor();
        colorTick = ts;
      }
      requestAnimationFrame(tickColor);
    }
    requestAnimationFrame(tickColor);
  }

  // Hide cursor when it leaves the window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();

