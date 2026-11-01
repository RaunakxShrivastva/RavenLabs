/* ============================================================
   RAVENLABS — script.js
   Animations, theme toggle, scroll reveals, mobile nav
   ============================================================ */

(function () {
  'use strict';

  /* ─── Theme ─── */
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const STORAGE_KEY = 'ravenlabs-theme';

  function getTheme() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  }

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem(STORAGE_KEY, t); } catch {}
    updateThemeIcon(t);
  }

  function updateThemeIcon(t) {
    if (!themeBtn) return;
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    themeBtn.innerHTML = t === 'dark'
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`;
  }

  // Init theme: saved → prefers-color-scheme → dark default
  (function initTheme() {
    const saved = getTheme();
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  })();

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ─── Intro animation ─── */
  (function initIntro() {
    try {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        root.setAttribute('data-intro', '');
        // Remove after animations complete
        window.addEventListener('load', () => {
          setTimeout(() => root.removeAttribute('data-intro'), 2200);
        });
      }
    } catch {}
  })();

  /* ─── Mobile Nav ─── */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', open.toString());
      mobileMenuBtn.innerHTML = open
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>`;
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>`;
      });
    });
  }

  /* ─── Scroll Reveal ─── */
  function initScrollReveal() {
    const items = document.querySelectorAll('.reveal-item');
    if (!items.length) return;

    // Immediately visible items (in viewport on load)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    items.forEach(el => observer.observe(el));
  }

  // Run after a slight delay to let intro animation start first
  setTimeout(initScrollReveal, 300);

  /* ─── Parallax on hero grid lines ─── */
  (function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const hero = document.getElementById('hero');
    if (!hero) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const bigText = hero.querySelector('.hero-big-text');
          if (bigText) {
            bigText.style.transform = `translateX(-50%) translateY(${scrollY * 0.25}px)`;
          }
          const heroContent = hero.querySelector('.hero-content');
          if (heroContent) {
            heroContent.style.transform = `translateY(${scrollY * 0.08}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  })();

  /* ─── Animated counter for milestone values ─── */
  function animateCounter(el, target, duration) {
    const isNumber = /^\d+/.test(target);
    if (!isNumber) return;
    const num = parseInt(target.replace(/\D/g, ''));
    const suffix = target.replace(/[\d,]/g, '');
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * num);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    el.textContent = '0' + suffix;
    requestAnimationFrame(step);
  }

  function initCounters() {
    const milestones = document.querySelectorAll('.milestone-value');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = el.getAttribute('data-target') || el.textContent;
          el.setAttribute('data-target', target);
          animateCounter(el, target, 1200);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    milestones.forEach(el => observer.observe(el));
  }

  initCounters();

  /* ─── Smooth active nav link highlight ─── */
  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === '#' + id;
            link.style.color = isActive ? 'var(--ink)' : '';
            link.style.background = isActive ? 'var(--line)' : '';
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
  }

  initActiveNav();

  /* ─── Notch demo live clock ─── */
  function initNotchClock() {
    const timeEl = document.getElementById('notch-time');
    if (!timeEl) return;
    function updateTime() {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      timeEl.textContent = h + ':' + m;
    }
    updateTime();
    setInterval(updateTime, 1000);
  }

  initNotchClock();

  /* ─── Page show (bfcache fix) ─── */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) location.reload();
  });

})();
