/**
 * ═══════════════════════════════════════════════════════════
 * BIG BAD CODING — Main JavaScript
 * All animations use transform/opacity only (no layout props)
 * prefers-reduced-motion respected throughout
 * ═══════════════════════════════════════════════════════════
 */

'use strict';

/* ───────────────────────────────────────────────────────
 * Reduced motion detection
 * ─────────────────────────────────────────────────────── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ───────────────────────────────────────────────────────
 * Theme Toggle (Dark / Light)
 * ─────────────────────────────────────────────────────── */
const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');

if (themeBtn) {
  const applyThemeToggleLabel = () => {
    const currentTheme = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    themeBtn.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
  };

  applyThemeToggleLabel();

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('bbc-theme', next);
    applyThemeToggleLabel();
  });
}

/* ───────────────────────────────────────────────────────
 * Navigation: scroll state + active section
 * ─────────────────────────────────────────────────────── */
const nav = document.getElementById('site-nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');

// Scroll state
window.addEventListener('scroll', onScroll, { passive: true });

function onScroll() {
  // Nav scrolled state
  if (nav) {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }

  // Active section indicator
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href')?.replace('#', '');
    link.setAttribute('aria-current', href === current ? 'true' : 'false');
  });

  // Sticky CTA visibility
  updateStickyCTA();
}

/* ───────────────────────────────────────────────────────
 * Sticky CTA Bar
 * ─────────────────────────────────────────────────────── */
const stickyCTA = document.getElementById('sticky-cta');
const heroSection = document.getElementById('hero');
const contactSection = document.getElementById('contact');

// Run once on load (after stickyCTA refs are initialized)
onScroll();

function updateStickyCTA() {
  if (!stickyCTA || !heroSection || !contactSection) return;

  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  const contactTop = contactSection.offsetTop;
  const scrollY = window.scrollY + window.innerHeight;

  const pastHero    = window.scrollY > heroBottom - 100;
  const nearContact = window.scrollY + window.innerHeight > contactTop + 100;

  stickyCTA.classList.toggle('visible', pastHero && !nearContact);
}

/* ───────────────────────────────────────────────────────
 * Mobile Menu
 * ─────────────────────────────────────────────────────── */
const menuToggle   = document.getElementById('menu-toggle');
const mobileMenu   = document.getElementById('mobile-menu');
const mobileLinks  = mobileMenu?.querySelectorAll('.mobile-link, .mobile-menu-cta');
let menuOpen = false;

function openMenu() {
  menuOpen = true;
  mobileMenu.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuToggle.setAttribute('aria-label', 'Close navigation menu');
  document.body.style.overflow = 'hidden';
  // Focus first link
  const firstLink = mobileMenu.querySelector('a');
  firstLink?.focus();
}

function closeMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  document.body.style.overflow = '';
  menuToggle.focus();
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    menuOpen ? closeMenu() : openMenu();
  });

  // Close on link click
  mobileLinks?.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  // Focus trap
  mobileMenu.addEventListener('keydown', (e) => {
    if (!menuOpen || e.key !== 'Tab') return;
    const focusable = Array.from(mobileMenu.querySelectorAll('a, button'));
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

/* ───────────────────────────────────────────────────────
 * Scroll Reveal (IntersectionObserver)
 * ─────────────────────────────────────────────────────── */
if (!prefersReducedMotion) {
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => revealObserver.observe(el));
} else {
  // Reduced motion: show all immediately
  document.querySelectorAll('.reveal').forEach((el) => {
    el.classList.add('revealed');
  });
}

/* ───────────────────────────────────────────────────────
 * FAQ Accordion
 * ─────────────────────────────────────────────────────── */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const btn    = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  if (!btn || !answer) return;

  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';

    // Close all others
    faqItems.forEach((other) => {
      const otherBtn    = other.querySelector('.faq-question');
      const otherAnswer = other.querySelector('.faq-answer');
      if (otherBtn && otherAnswer && otherBtn !== btn) {
        otherBtn.setAttribute('aria-expanded', 'false');
        otherAnswer.style.height = '0';
      }
    });

    // Toggle current
    if (isExpanded) {
      btn.setAttribute('aria-expanded', 'false');
      answer.style.height = '0';
    } else {
      btn.setAttribute('aria-expanded', 'true');
      // Use scrollHeight to get actual content height
      answer.style.height = answer.scrollHeight + 'px';
    }
  });
});

// Handle window resize — update open FAQ heights
window.addEventListener('resize', () => {
  faqItems.forEach((item) => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (btn?.getAttribute('aria-expanded') === 'true' && answer) {
      answer.style.height = answer.scrollHeight + 'px';
    }
  });
}, { passive: true });

/* ───────────────────────────────────────────────────────
 * Contact Form Validation
 * ─────────────────────────────────────────────────────── */
const contactForm  = document.getElementById('contact-form');
const formSuccess  = document.getElementById('form-success');

const validators = {
  name:     (v) => v.trim().length >= 2  ? '' : 'Please enter your name.',
  business: (v) => v.trim().length >= 2  ? '' : 'Please enter your business name.',
  email:    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
  message:  (v) => v.trim().length >= 10 ? '' : 'Please tell us a bit about your business (at least 10 characters).',
};

function showError(fieldId, message) {
  const input = document.getElementById(`contact-${fieldId}`);
  const error = document.getElementById(`error-${fieldId}`);
  if (!input || !error) return;

  if (message) {
    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');
    error.textContent = message;
    error.classList.add('visible');
  } else {
    input.classList.remove('error');
    input.removeAttribute('aria-invalid');
    error.textContent = '';
    error.classList.remove('visible');
  }
}

function validateField(name) {
  const input = document.getElementById(`contact-${name}`);
  if (!input) return true;
  const error = validators[name]?.(input.value) ?? '';
  showError(name, error);
  return !error;
}

// Inline validation on blur
['name', 'business', 'email', 'message'].forEach((fieldName) => {
  const input = document.getElementById(`contact-${fieldName}`);
  input?.addEventListener('blur', () => validateField(fieldName));
  input?.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') validateField(fieldName);
  });
});

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = ['name', 'business', 'email', 'message'];
    const valid = fields.map(validateField).every(Boolean);

    if (!valid) {
      const firstError = contactForm.querySelector('[aria-invalid="true"]');
      firstError?.focus();
      return;
    }

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      submitBtn.setAttribute('aria-busy', 'true');
    }

    const formData = new FormData(contactForm);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.classList.add('visible');
          formSuccess.focus();
        }
      })
      .catch(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          submitBtn.setAttribute('aria-busy', 'false');
        }
        const errorEl = document.createElement('div');
        errorEl.className = 'form-submit-error';
        errorEl.setAttribute('role', 'alert');
        errorEl.textContent = 'Something went wrong. Please try again or email us directly.';
        const existing = contactForm.querySelector('.form-submit-error');
        if (existing) existing.remove();
        contactForm.querySelector('.form-submit').prepend(errorEl);
      });
  });
}

/* ───────────────────────────────────────────────────────
 * Smooth scroll for anchor links (polyfill for Safari)
 * ─────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;

    e.preventDefault();
    const navHeight = nav?.offsetHeight ?? 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

    if (prefersReducedMotion) {
      window.scrollTo({ top });
    } else {
      window.scrollTo({ top, behavior: 'smooth' });
    }

    // Close mobile menu if open
    if (menuOpen) closeMenu();
  });
});

/* ───────────────────────────────────────────────────────
 * Animated counter — "3 steps." counts up on scroll-reveal
 * ─────────────────────────────────────────────────────── */
const statNum = document.querySelector('.how-stat-num');

if (statNum) {
  const target = parseInt(statNum.dataset.target, 10);

  const runCounter = () => {
    if (prefersReducedMotion) return;
    let current = 1;
    statNum.textContent = current;
    const interval = setInterval(() => {
      current += 1;
      statNum.textContent = current;
      if (current >= target) clearInterval(interval);
    }, 160);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterObserver.observe(statNum.closest('.how-callout'));
}

/* ───────────────────────────────────────────────────────
 * Hero headline — staggered word reveal on page load
 * ─────────────────────────────────────────────────────── */
const heroWords = document.querySelectorAll('.hero-word');

if (prefersReducedMotion) {
  heroWords.forEach((w) => w.classList.add('is-visible'));
} else {
  heroWords.forEach((w, i) => {
    setTimeout(() => w.classList.add('is-visible'), 100 * i);
  });
}

/* ───────────────────────────────────────────────────────
 * Service Worker Registration
 * ─────────────────────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silent fail — SW is progressive enhancement
    });
  });
}

/* ───────────────────────────────────────────────────────
 * Add to Home Screen Prompt
 * ─────────────────────────────────────────────────────── */
let deferredA2HSPrompt = null;
const a2hsEl      = document.getElementById('a2hs-prompt');
const a2hsInstall = document.getElementById('a2hs-install');
const a2hsDismiss = document.getElementById('a2hs-dismiss');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredA2HSPrompt = e;

  if (sessionStorage.getItem('a2hs-dismissed') || !a2hsEl) return;

  a2hsEl.hidden = false;
  requestAnimationFrame(() => {
    a2hsEl.classList.add('visible');
    document.body.classList.add('has-install-banner');
  });
});

function hideA2HS() {
  if (!a2hsEl) return;
  a2hsEl.classList.remove('visible');
  document.body.classList.remove('has-install-banner');
  setTimeout(() => { a2hsEl.hidden = true; }, 300);
}

a2hsInstall?.addEventListener('click', () => {
  if (!deferredA2HSPrompt) return;
  deferredA2HSPrompt.prompt();
  deferredA2HSPrompt.userChoice.then(() => {
    deferredA2HSPrompt = null;
    hideA2HS();
  });
});

a2hsDismiss?.addEventListener('click', () => {
  sessionStorage.setItem('a2hs-dismissed', '1');
  hideA2HS();
});

/* ───────────────────────────────────────────────────────
 * Form Input Sanitization
 * ─────────────────────────────────────────────────────── */
const FIELD_MAX_LENGTHS = { name: 100, business: 150, email: 254, message: 2000 };

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, '');
}

['name', 'business', 'email', 'message'].forEach((fieldName) => {
  const input = document.getElementById(`contact-${fieldName}`);
  if (!input) return;

  // Enforce max length at the HTML level
  if (FIELD_MAX_LENGTHS[fieldName]) {
    input.setAttribute('maxlength', String(FIELD_MAX_LENGTHS[fieldName]));
  }

  // Strip HTML tags on blur before validation runs
  input.addEventListener('blur', () => {
    input.value = stripHtml(input.value);
  }, { capture: true });
});

// Name field: allow only letters (including accented), spaces, hyphens, apostrophes
const nameInputEl = document.getElementById('contact-name');
if (nameInputEl) {
  nameInputEl.addEventListener('input', () => {
    nameInputEl.value = nameInputEl.value.replace(/[^a-zA-ZÀ-ÿ\u00C0-\u017F '\-]/g, '');
  });
}

/* ───────────────────────────────────────────────────────
 * Newsletter form — show success inline, no page reload
 * ─────────────────────────────────────────────────────── */
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('[name="email"]');
    const submitBtn = newsletterForm.querySelector('.newsletter-btn');
    const row = newsletterForm.querySelector('.newsletter-row');
    const successEl = document.getElementById('newsletter-success');
    const errorEl = document.getElementById('newsletter-error');
    const email = emailInput?.value.trim() ?? '';
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailInput || !row || !submitBtn || !successEl || !errorEl) return;

    errorEl.hidden = true;
    errorEl.textContent = '';
    emailInput.removeAttribute('aria-invalid');

    if (!isValidEmail) {
      emailInput.setAttribute('aria-invalid', 'true');
      errorEl.textContent = 'Please enter a valid email address.';
      errorEl.hidden = false;
      emailInput.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'newsletter', email }).toString()
      });

      if (!response.ok) throw new Error('Newsletter submission failed');

      row.hidden = true;
      successEl.hidden = false;
    } catch {
      emailInput.setAttribute('aria-invalid', 'true');
      errorEl.textContent = 'Something went wrong. Please try again in a moment.';
      errorEl.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Subscribe';
    }
  });
}
