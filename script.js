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
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      setTheme(nextTheme);
      if (typeof playMusicalChime === 'function') {
        playMusicalChime(nextTheme === 'light' ? [523.25, 659.25, 783.99] : [783.99, 659.25, 523.25]);
      }
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

  /* ════════════════════════════════════════════════════════════
     HIGH-END INTERACTIVITY & MOTION ENGINE ($5,000 SUITE)
     ════════════════════════════════════════════════════════════ */

  /* ─── 1. Scroll Progress Bar ─── */
  (function initScrollProgress() {
    const progressEl = document.getElementById('scroll-progress');
    if (!progressEl) return;

    function updateProgress() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
      progressEl.style.transform = `scaleX(${progress})`;
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  })();

  /* ─── 2. Tactile Web Audio Synthesizer (Micro-interactions) ─── */
  let audioCtx = null;
  let soundEnabled = true;

  try {
    const savedSound = localStorage.getItem('ravenlabs-sfx');
    if (savedSound === 'off') soundEnabled = false;
  } catch {}

  function getAudioContext() {
    if (!audioCtx && typeof window.AudioContext !== 'undefined') {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playHapticTone(freq = 600, duration = 0.035, type = 'sine', gainVal = 0.04) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.45, ctx.currentTime + duration);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }

  function playMusicalChime(notes = [523.25, 659.25]) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const start = ctx.currentTime + i * 0.055;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.035, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.12);
      });
    } catch {}
  }

  // Sound Toggle Control
  const soundBtn = document.getElementById('sound-toggle');
  if (soundBtn) {
    function updateSoundBtnUI() {
      const onIcon = soundBtn.querySelector('.sound-icon-on');
      const offIcon = soundBtn.querySelector('.sound-icon-off');
      const text = soundBtn.querySelector('.sound-text');
      if (soundEnabled) {
        soundBtn.classList.add('active');
        if (onIcon) onIcon.style.display = 'block';
        if (offIcon) offIcon.style.display = 'none';
        if (text) text.textContent = 'SFX: ON';
      } else {
        soundBtn.classList.remove('active');
        if (onIcon) onIcon.style.display = 'none';
        if (offIcon) offIcon.style.display = 'block';
        if (text) text.textContent = 'SFX: OFF';
      }
    }
    updateSoundBtnUI();

    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      try { localStorage.setItem('ravenlabs-sfx', soundEnabled ? 'on' : 'off'); } catch {}
      updateSoundBtnUI();
      if (soundEnabled) playHapticTone(800, 0.05, 'triangle', 0.06);
    });
  }

  // Attach tactile sound to interactive buttons
  document.querySelectorAll('button, .btn-primary, .btn-accent, .btn-ghost, .nav-cta').forEach(btn => {
    btn.addEventListener('mouseenter', () => playHapticTone(900, 0.02, 'sine', 0.015));
    btn.addEventListener('click', () => playHapticTone(650, 0.04, 'triangle', 0.04));
  });

  /* ─── 3. Spotlight Cursor & 3D Tilt Physics ─── */
  (function initCardTiltAndSpotlight() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = document.querySelectorAll('.product-card, .feature-card, .comp-card, .milestone-item');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set spotlight CSS variables
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Subtle 3D tilt calculation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  })();

  /* ─── 5. Magnetic Button Hover Feel ─── */
  (function initMagneticButtons() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-accent, #nav-cta-btn');

    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  })();

  /* ─── 6. Global Keyboard Shortcuts (T for Theme, M for Sound) ─── */
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    if (e.key === 't' || e.key === 'T') {
      if (themeBtn) themeBtn.click();
    } else if (e.key === 'm' || e.key === 'M') {
      if (soundBtn) soundBtn.click();
    }
  });

  /* ─── 7. Click-to-Copy with Floating Micro-Toast ─── */
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  const copyTargets = [
    { id: 'contact-email', text: 'raunakxshrivastva@gmail.com', label: 'Email copied to clipboard!' },
    { id: 'contact-phone', text: '+919155695155', label: 'Phone copied to clipboard!' }
  ];

  copyTargets.forEach(({ id, text, label }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', (e) => {
      // If user holds Ctrl/Cmd or wants normal action, don't intercept; otherwise copy
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`✓ ${label}`);
          playHapticTone(750, 0.04, 'triangle', 0.04);
        }).catch(() => {});
      }
    });
  });

  /* ─── 8. Dispatch Form Handling ─── */
  const dispatchForm = document.getElementById('dispatch-form');
  const dispatchInput = document.getElementById('dispatch-email');
  const dispatchBtn = document.getElementById('dispatch-submit-btn');

  if (dispatchForm && dispatchInput && dispatchBtn) {
    const btnText = dispatchBtn.querySelector('.dispatch-btn-text');
    dispatchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = dispatchInput.value.trim();
      if (!email || !email.includes('@')) return;

      try {
        localStorage.setItem('ravenlabs_subscriber', email);
      } catch {}

      if (btnText) btnText.textContent = '✓ Subscribed!';
      dispatchBtn.style.background = '#10b981';
      dispatchBtn.style.color = '#ffffff';
      if (typeof playMusicalChime === 'function') {
        playMusicalChime([523.25, 659.25, 783.99, 1046.50]);
      }
      showToast('✓ Welcome to the collective dispatch!');

      setTimeout(() => {
        dispatchInput.value = '';
        if (btnText) btnText.textContent = 'Get Access';
        dispatchBtn.style.background = '';
        dispatchBtn.style.color = '';
      }, 3500);
    });
  }

  /* ─── 9. Custom Ambient Trailing Cursor ─── */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isCursorActive = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isCursorActive) {
        isCursorActive = true;
        document.body.classList.add('cursor-active');
      }
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-active');
      isCursorActive = false;
    });

    // Smooth physics trailing loop
    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    }
    requestAnimationFrame(animateRing);

    // Magnetic scale hover on interactive targets
    const interactiveQuery = 'a, button, input, textarea, select, [role="button"], .platform-tab, .faq-item summary';
    document.querySelectorAll(interactiveQuery).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ─── 10. Dynamic Copyright Year ─── */
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ─── Page show (bfcache fix) ─── */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) location.reload();
  });

})();
