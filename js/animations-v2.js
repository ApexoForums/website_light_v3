/* ═══════════════════════════════════════════════════════════════════════════
   APEXO FORUMS — Premium Animation Engine v2
   Inspired by Razorpay.com quality: smooth, purposeful, performant
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1. SCROLL REVEAL ENGINE ─────────────────────────────────────────── */
  const rzpObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const delay = el.dataset.rzpDelay || '0ms';
      el.style.transitionDelay = delay;
      el.classList.add('rzp-on');
      rzpObs.unobserve(el);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  const rzpStaggerObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('rzp-on');
      e.target.querySelectorAll(':scope > *').forEach((child, i) => {
        child.style.transition = `opacity .55s cubic-bezier(.16,1,.3,1) ${i * 90}ms, transform .55s cubic-bezier(.16,1,.3,1) ${i * 90}ms`;
      });
      rzpStaggerObs.unobserve(e.target);
    });
  }, { threshold: 0.1 });

  const rzpLineObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('rzp-on'); rzpLineObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });

  const initObservers = () => {
    document.querySelectorAll('[data-rzp]').forEach(el => {
      if (!el._rzpWatching) { el._rzpWatching = true; rzpObs.observe(el); }
    });
    document.querySelectorAll('[data-rzp-stagger]').forEach(el => {
      if (!el._rzpWatching) { el._rzpWatching = true; rzpStaggerObs.observe(el); }
    });
    document.querySelectorAll('.rzp-line').forEach(el => {
      if (!el._rzpWatching) { el._rzpWatching = true; rzpLineObs.observe(el); }
    });
  };

  initObservers();

  /* ── 2. HERO GRADIENT MESH ANIMATION (Razorpay-style) ───────────────── */
  const hero = document.querySelector('#page-home section:first-child');
  if (hero) {
    // Animated floating gradient orbs behind the hero
    const mesh = document.createElement('div');
    mesh.className = 'hero-mesh';
    mesh.innerHTML = `
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-orb hero-orb-2"></div>
      <div class="hero-orb hero-orb-3"></div>
    `;
    hero.insertBefore(mesh, hero.firstChild);
  }

  /* ── 3. SMOOTH SCROLL-LINKED PARALLAX ───────────────────────────────── */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Hero parallax — only when home is active
        const heroBg = document.querySelector('#page-home section:first-child img[aria-hidden]');
        if (heroBg) {
          heroBg.style.transform = `scale(1.04) translateY(${scrollY * 0.18}px)`;
        }
        // Gold bars grow on scroll
        document.querySelectorAll('.wipe.on, .lgrow.on').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
            el.style.transform = `scaleX(${progress})`;
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ── 4. STAT NUMBER COUNTERS (smooth eased) ──────────────────────────── */
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (el._counted) return;
      el._counted = true;
      const target = parseInt(el.dataset.count || el.dataset.target || 0, 10);
      const suffix = el.dataset.suffix || '';
      if (!target) return;
      const dur = 1800;
      const t0 = performance.now();
      const fmt = n => n >= 1000 ? (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'K' : Math.round(n) + '';
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 4); // quartic out
        el.textContent = fmt(target * ease) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target) + suffix;
      };
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count],[data-target]').forEach(el => countObs.observe(el));

  /* ── 5. MAGNETIC BUTTON HOVER ──────────────────────────────────────── */
  document.querySelectorAll('.rzp-mag, .btn-dark, .btn-gold, .btn-ghost, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 12;
      const y = ((e.clientY - r.top) / r.height - .5) * 7;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ── 6. CARD 3-D TILT ───────────────────────────────────────────────── */
  document.querySelectorAll('.forum-card,.team-card,.ind-teaser-card,.gc').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientY - r.top) / r.height - .5) * 6;
      const y = ((e.clientX - r.left) / r.width - .5) * -6;
      card.style.transform = `rotateX(${x}deg) rotateY(${y}deg) translateY(-4px) scale(1.015)`;
      card.style.transition = 'transform .1s ease-out';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .4s cubic-bezier(.16,1,.3,1)';
    });
  });

  /* ── 7. INDUSTRIES GRID STAGGER ─────────────────────────────────────── */
  const teaserGrid = document.querySelector('.ind-teaser-grid');
  if (teaserGrid) {
    const tgObs = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      teaserGrid.querySelectorAll('.ind-teaser-card').forEach((c, i) => {
        c.style.opacity = '0';
        c.style.transform = 'translateY(28px) scale(.97)';
        setTimeout(() => {
          c.style.transition = 'opacity .5s cubic-bezier(.16,1,.3,1), transform .5s cubic-bezier(.16,1,.3,1)';
          c.style.opacity = '1';
          c.style.transform = '';
        }, i * 55);
      });
      tgObs.disconnect();
    }, { threshold: 0.1 });
    tgObs.observe(teaserGrid);
  }

  /* ── 8. SHIMMER EFFECT ON GOLD ELEMENTS ─────────────────────────────── */
  document.querySelectorAll('.btn-dark, .nav-cta').forEach(btn => {
    btn.classList.add('shimmer-btn');
  });

  /* ── 9. GRADIENT TEXT REVEAL on H1 ─────────────────────────────────── */
  const heroH1 = document.getElementById('hero-h1');
  if (heroH1) {
    heroH1.classList.add('hero-title-animated');
  }

  /* ── 10. SMOOTH PAGE FADE TRANSITION ────────────────────────────────── */
  const _animOrigNavigate = window.navigate;
  window.navigate = function (route) {
    // Fade out current page briefly
    const currentPage = document.querySelector('.page.active');
    if (currentPage) {
      currentPage.style.opacity = '0.6';
      currentPage.style.transform = 'translateY(4px)';
      currentPage.style.transition = 'opacity .15s ease, transform .15s ease';
    }
    setTimeout(() => {
      if (_animOrigNavigate) _animOrigNavigate.call(this, route);
      const newPage = document.querySelector('.page.active');
      if (newPage) {
        newPage.style.opacity = '0';
        newPage.style.transform = 'translateY(8px)';
        newPage.style.transition = 'none';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            newPage.style.transition = 'opacity .3s cubic-bezier(.16,1,.3,1), transform .4s cubic-bezier(.16,1,.3,1)';
            newPage.style.opacity = '1';
            newPage.style.transform = '';
          });
        });
      }
      setTimeout(() => {
        initObservers();
        document.querySelectorAll('.page.active [data-rzp]:not(.rzp-on)').forEach(el => {
          if (!el._rzpWatching) { el._rzpWatching = true; rzpObs.observe(el); }
        });
        document.querySelectorAll('[data-count],[data-target]').forEach(el => {
          if (!el._counted) countObs.observe(el);
        });
      }, 350);
    }, 100);
  };

  /* ── 11. CURSOR SPOTLIGHT (subtle glow follows cursor) ──────────────── */
  const spotlight = document.createElement('div');
  spotlight.className = 'cursor-spotlight';
  document.body.appendChild(spotlight);
  let spotX = 0, spotY = 0, curX = 0, curY = 0;
  document.addEventListener('mousemove', e => { spotX = e.clientX; spotY = e.clientY; }, { passive: true });
  const animateSpot = () => {
    curX += (spotX - curX) * 0.08;
    curY += (spotY - curY) * 0.08;
    spotlight.style.transform = `translate(${curX - 200}px, ${curY - 200}px)`;
    requestAnimationFrame(animateSpot);
  };
  animateSpot();

  /* ── 12. SECTION ENTRANCE — split-word for eyebrow labels ───────────── */
  document.querySelectorAll('.eyebrow').forEach(el => {
    el.classList.add('eyebrow-anim');
  });

})();
