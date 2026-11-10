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
    const meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (meta) meta.setAttribute('content', t === 'dark' ? '#0b0b0c' : '#f2f1ee');
    updateFavicon(t);
  }

  function updateFavicon(t) {
    const fav = document.getElementById('site-favicon');
    if (!fav) return;
    const bg = t === 'dark' ? '%230b0b0c' : '%23f2f1ee';
    const fg = t === 'dark' ? 'white' : '%230b0b0c';
    const eye = t === 'dark' ? '%234f8ef7' : '%232563eb';
    fav.href = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='${bg}' stroke='${fg}' stroke-width='0.5'/%3E%3Cpath d='M10 8 Q16 6 22 12 Q18 14 16 20 Q13 14 10 8Z' fill='${fg}' opacity='0.85'/%3E%3Cpath d='M8 14 Q14 10 22 14 Q16 18 8 22 Z' fill='${fg}' opacity='0.3'/%3E%3Ccircle cx='21' cy='11' r='2' fill='${eye}'/%3E%3C/svg%3E`;
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
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    } else {
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    }

    // Dynamic OS system preference synchronization
    mediaQuery.addEventListener('change', (e) => {
      if (!getTheme()) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
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

  /* ─── 6. Global Keyboard Shortcuts (T: Theme, M: Sound, ?: Help, B: Back to top) ─── */
  const shortcutsModal = document.getElementById('shortcuts-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const footerHelpTrigger = document.getElementById('footer-help-trigger');

  function openShortcutsModal() {
    if (!shortcutsModal) return;
    shortcutsModal.removeAttribute('hidden');
    if (typeof playMusicalChime === 'function') {
      playMusicalChime([440, 554.37, 659.25]);
    }
  }

  function closeShortcutsModal() {
    if (!shortcutsModal || shortcutsModal.hasAttribute('hidden')) return;
    shortcutsModal.setAttribute('hidden', '');
    if (typeof playHapticTone === 'function') {
      playHapticTone(440, 0.04, 'sine', 0.03);
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeShortcutsModal);
  if (footerHelpTrigger) footerHelpTrigger.addEventListener('click', openShortcutsModal);
  if (shortcutsModal) {
    shortcutsModal.addEventListener('click', (e) => {
      if (e.target === shortcutsModal) closeShortcutsModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    if (e.key === 't' || e.key === 'T') {
      if (themeBtn) themeBtn.click();
    } else if (e.key === 'm' || e.key === 'M') {
      if (soundBtn) soundBtn.click();
    } else if (e.key === 'c' || e.key === 'C') {
      if (cliCopyBtn) cliCopyBtn.click();
    } else if (e.key === 'h' || e.key === 'H') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (typeof playHapticTone === 'function') {
        playHapticTone(580, 0.05, 'sine', 0.03);
      }
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFpsHUD();
    } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      if (shortcutsModal && !shortcutsModal.hasAttribute('hidden')) {
        closeShortcutsModal();
      } else {
        openShortcutsModal();
      }
    } else if (e.key === 'b' || e.key === 'B') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (typeof playHapticTone === 'function') {
        playHapticTone(580, 0.05, 'sine', 0.03);
      }
    } else if (e.key === 'Escape') {
      closeShortcutsModal();
      if (toast && toast.classList.contains('show')) {
        toast.classList.remove('show');
        clearTimeout(toastTimer);
      }
      if (document.activeElement && typeof document.activeElement.blur === 'function') {
        document.activeElement.blur();
      }
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

  /* ─── Hero Quick-Clone Snippet Copy Handler ─── */
  const cliCopyBtn = document.getElementById('cli-copy-btn');
  if (cliCopyBtn) {
    const cloneCmd = 'git clone https://github.com/RaunakxShrivastva/RavenLabs.git';
    const labelSpan = cliCopyBtn.querySelector('.cli-copy-label');
    cliCopyBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(cloneCmd).then(() => {
          showToast('✓ Clone command copied to clipboard!');
          if (typeof playMusicalChime === 'function') {
            playMusicalChime([523.25, 659.25, 783.99]);
          }
          if (labelSpan) labelSpan.textContent = 'Copied!';
          setTimeout(() => { if (labelSpan) labelSpan.textContent = 'Copy'; }, 2500);
        }).catch(() => {});
      }
    });
  }

  /* ─── 8. Dispatch Form Handling ─── */
  const dispatchForm = document.getElementById('dispatch-form');
  const dispatchInput = document.getElementById('dispatch-email');
  const dispatchBtn = document.getElementById('dispatch-submit-btn');

  if (dispatchForm && dispatchInput && dispatchBtn) {
    const btnText = dispatchBtn.querySelector('.dispatch-btn-text');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    dispatchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = dispatchInput.value.trim();

      if (!email || !emailRegex.test(email)) {
        dispatchForm.classList.remove('form-shake');
        void dispatchForm.offsetWidth; // Force reflow
        dispatchForm.classList.add('form-shake');
        if (typeof playHapticTone === 'function') {
          playHapticTone(240, 0.08, 'sawtooth', 0.05);
        }
        showToast('⚠ Please enter a valid email address');
        dispatchInput.focus();
        setTimeout(() => dispatchForm.classList.remove('form-shake'), 450);
        return;
      }

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

  /* ─── 11. Floating Back-to-Top Button ─── */
  const backToTopBtn = document.getElementById('back-to-top');
  const bttRingFill = document.getElementById('btt-ring-fill');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(Math.max(window.scrollY / scrollHeight, 0), 1) : 0;
      if (bttRingFill) {
        bttRingFill.style.strokeDashoffset = String(113.1 - (113.1 * progress));
      }
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (typeof playHapticTone === 'function') {
        playHapticTone(600, 0.05, 'sine', 0.04);
      }
    });
  }

  /* ─── 12. DevTools Console Engineering Banner ─── */
  try {
    const bannerStyle1 = 'background: #0b0b0c; color: #4f8ef7; font-size: 14px; font-weight: bold; padding: 6px 12px; border-radius: 4px; border: 1px solid #2563eb; font-family: monospace;';
    const bannerStyle2 = 'color: #888683; font-size: 11px; font-family: monospace; line-height: 1.5;';
    console.log('%c🦅 RavenLabs — Native Systems Collective', bannerStyle1);
    console.log(
      '%c"Dismantling artificial platform borders through high-performance engineering."\n' +
      '• Founder: Raunak Shrivastva (https://github.com/RaunakxShrivastva)\n' +
      '• Flagship: Raven Notch (https://ravennotch.me)\n' +
      '• Hotkeys: Press [T] for Theme Toggle | [M] for Audio Toggle\n' +
      '• Telemetry: 100% Offline, Zero Trackers',
      bannerStyle2
    );
  } catch {}

  /* ─── 13. Real-Time Nav System Clock ─── */
  const navClock = document.getElementById('nav-clock');
  if (navClock) {
    function updateNavClock() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      navClock.textContent = `${h}:${m}:${s}`;
    }
    updateNavClock();
    setInterval(updateNavClock, 1000);
  }

  /* ─── 14. Zero-Telemetry Local Session Counter ─── */
  const visitCounter = document.getElementById('visit-counter');
  if (visitCounter) {
    try {
      let count = parseInt(localStorage.getItem('ravenlabs_session_count') || '0', 10);
      count += 1;
      localStorage.setItem('ravenlabs_session_count', String(count));
      visitCounter.textContent = `Local Session #${count}`;
    } catch {
      visitCounter.textContent = '100% Offline';
    }
  }

  /* ─── 15. Offline Service Worker Registration ─── */
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }

  /* ─── 16. Navigation ScrollSpy ─── */
  (function initScrollSpy() {
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!navAnchors.length || !('IntersectionObserver' in window)) return;

    const sections = Array.from(navAnchors).map(a => {
      const id = a.getAttribute('href').slice(1);
      return document.getElementById(id);
    }).filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navAnchors.forEach(a => {
            if (a.getAttribute('href') === `#${id}`) {
              a.classList.add('active');
            } else {
              a.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(s => observer.observe(s));
  })();

  /* ─── 17. Real-Time Network Status Observer ─── */
  const navStatusBadge = document.getElementById('nav-status-badge');
  if (navStatusBadge) {
    function updateNetworkStatus() {
      if (navigator.onLine) {
        navStatusBadge.classList.remove('offline');
        navStatusBadge.innerHTML = '<span class="status-dot" aria-hidden="true"></span>Active';
      } else {
        navStatusBadge.classList.add('offline');
        navStatusBadge.innerHTML = '<span class="status-dot" aria-hidden="true"></span>Offline Cached';
      }
    }
    window.addEventListener('online', () => {
      updateNetworkStatus();
      showToast('✓ Collective connection restored — online');
      if (typeof playMusicalChime === 'function') {
        playMusicalChime([523.25, 659.25, 783.99]);
      }
    });
    window.addEventListener('offline', () => {
      updateNetworkStatus();
      showToast('⚡ Offline mode active — running from local cache');
      if (typeof playHapticTone === 'function') {
        playHapticTone(330, 0.08, 'sawtooth', 0.04);
      }
    });
    if (!navigator.onLine) updateNetworkStatus();
  }

  /* ─── 18. Native PWA Install Prompt Handler ─── */
  let deferredPrompt = null;
  const pwaBtn = document.getElementById('pwa-install-btn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaBtn) pwaBtn.removeAttribute('hidden');
  });

  if (pwaBtn) {
    pwaBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('✓ RavenLabs installed to your system!');
        pwaBtn.setAttribute('hidden', '');
      }
      deferredPrompt = null;
    });
  }

  window.addEventListener('appinstalled', () => {
    if (pwaBtn) pwaBtn.setAttribute('hidden', '');
    showToast('✓ RavenLabs successfully installed');
  });

  /* ─── 19. Dynamic Reading Time Estimation ─── */
  (function initReadingTime() {
    const mainEl = document.getElementById('main');
    const readTimeEl = document.getElementById('read-time-text');
    if (!mainEl || !readTimeEl) return;
    const text = mainEl.innerText || '';
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(wordCount / 200));
    readTimeEl.textContent = `${minutes} min collective read`;
  })();

  /* ─── 20. Exclusive FAQ Accordion & Tactile Sound ─── */
  (function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          if (typeof playHapticTone === 'function') {
            playHapticTone(640, 0.04, 'sine', 0.03);
          }
          // Close other open accordions
          faqItems.forEach(other => {
            if (other !== item && other.open) {
              other.open = false;
            }
          });
        } else {
          if (typeof playHapticTone === 'function') {
            playHapticTone(460, 0.03, 'sine', 0.02);
          }
        }
      });
    });
  })();

  /* ─── 21. Keyboard Shortcut [/] quick focus navigation ─── */
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
    if (e.key === '?') {
      showToast('Shortcuts: [H] Home · [C] Copy Clone · [T] Toggle Theme');
    }
  });

  /* ─── 22. Section Anchor Deep-Link Copy ─── */
  (function initSectionAnchors() {
    document.querySelectorAll('.section-headline[id]').forEach(h => {
      const section = h.closest('section');
      if (!section || !section.id) return;
      const anchor = document.createElement('a');
      anchor.className = 'section-anchor';
      anchor.href = `#${section.id}`;
      anchor.setAttribute('aria-label', `Direct link to ${section.id}`);
      anchor.title = 'Copy direct link to section';
      anchor.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';

      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `${window.location.origin}${window.location.pathname}#${section.id}`;
        history.pushState(null, '', `#${section.id}`);
        if (navigator.clipboard) {
          navigator.clipboard.writeText(url).then(() => {
            showToast(`✓ Copied link to #${section.id}`);
            if (typeof playHapticTone === 'function') {
              playHapticTone(720, 0.04, 'sine', 0.03);
            }
          }).catch(() => {});
        }
        section.scrollIntoView({ behavior: 'smooth' });
      });

      h.appendChild(anchor);
    });
  })();

  /* ─── 23. Live FPS & Frame Latency Sampling HUD ─── */
  const fpsMeter = document.getElementById('fps-meter');
  const fpsValEl = document.getElementById('fps-val');
  const fpsMsEl = document.getElementById('fps-ms');
  let fpsRunning = false;
  let lastFrameTime = performance.now();
  let frameCount = 0;
  let lastSampleTime = performance.now();

  function toggleFpsHUD() {
    if (!fpsMeter) return;
    if (fpsMeter.hasAttribute('hidden')) {
      fpsMeter.removeAttribute('hidden');
      fpsRunning = true;
      lastFrameTime = performance.now();
      lastSampleTime = performance.now();
      frameCount = 0;
      requestAnimationFrame(sampleFPS);
      showToast('⚡ Live telemetry HUD enabled');
      if (typeof playMusicalChime === 'function') {
        playMusicalChime([587.33, 739.99]);
      }
    } else {
      fpsMeter.setAttribute('hidden', '');
      fpsRunning = false;
      showToast('Telemetry HUD hidden');
    }
  }

  function sampleFPS(now) {
    if (!fpsRunning) return;
    frameCount++;
    const delta = now - lastFrameTime;
    lastFrameTime = now;

    if (now - lastSampleTime >= 500) {
      const fps = Math.round((frameCount * 1000) / (now - lastSampleTime));
      const ms = delta.toFixed(1);
      if (fpsValEl) fpsValEl.textContent = String(fps);
      if (fpsMsEl) fpsMsEl.textContent = ms;
      frameCount = 0;
      lastSampleTime = now;
    }
    requestAnimationFrame(sampleFPS);
  }

  /* ─── Page show (bfcache fix) ─── */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) location.reload();
  });

})();
