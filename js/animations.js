(function () {
  /* ── 1. INJECT ALL ANIMATION CSS ── */
  const S = document.createElement('style');
  S.textContent = `
    /* ── Scroll-reveal base ── */
    [data-rzp] { opacity:0; will-change:opacity,transform; }
    [data-rzp="up"]    { transform:translateY(36px); }
    [data-rzp="down"]  { transform:translateY(-24px); }
    [data-rzp="left"]  { transform:translateX(40px); }
    [data-rzp="right"] { transform:translateX(-40px); }
    [data-rzp="scale"] { transform:scale(.88); }
    [data-rzp="fade"]  { }
    [data-rzp].rzp-on  { opacity:1!important; transform:none!important; transition:opacity .65s cubic-bezier(.16,1,.3,1), transform .65s cubic-bezier(.16,1,.3,1); }

    /* ── Stagger children ── */
    [data-rzp-stagger] > * { opacity:0; transform:translateY(28px); will-change:opacity,transform; }
    [data-rzp-stagger].rzp-on > * { opacity:1; transform:none; }

    /* ── Shimmer sweep on card hover ── */
    .rzp-shimmer { position:relative; overflow:hidden; }
    .rzp-shimmer::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.07) 50%,transparent 60%); transform:translateX(-100%); transition:transform 0s; pointer-events:none; }
    .rzp-shimmer:hover::after { transform:translateX(100%); transition:transform .55s cubic-bezier(.16,1,.3,1); }

    /* ── Gold pulse ring on CTA buttons ── */
    @keyframes rzpPulse { 0%{box-shadow:0 0 0 0 rgba(184,146,42,.45)} 70%{box-shadow:0 0 0 14px rgba(184,146,42,0)} 100%{box-shadow:0 0 0 0 rgba(184,146,42,0)} }
    .rzp-pulse { animation: rzpPulse 2.4s ease-out infinite; }

    /* ── Float bob for hero decorative elements ── */
    @keyframes rzpFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    .rzp-float { animation: rzpFloat 4s ease-in-out infinite; }
    .rzp-float-2 { animation: rzpFloat 5.2s ease-in-out infinite .9s; }
    .rzp-float-3 { animation: rzpFloat 3.8s ease-in-out infinite 1.7s; }

    /* ── Hero animated gradient mesh ── */
    @keyframes rzpMesh1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-40px) scale(1.12)} 66%{transform:translate(-40px,30px) scale(.9)} }
    @keyframes rzpMesh2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,60px) scale(1.1)} 66%{transform:translate(70px,-50px) scale(.88)} }
    @keyframes rzpMesh3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,40px) scale(1.15)} }
    .rzp-mesh-1 { animation: rzpMesh1 14s ease-in-out infinite; }
    .rzp-mesh-2 { animation: rzpMesh2 18s ease-in-out infinite 2s; }
    .rzp-mesh-3 { animation: rzpMesh3 11s ease-in-out infinite 4s; }

    /* ── Industry tab slide ── */
    @keyframes indSlideIn { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:none} }
    .ind-copy.slide-anim { animation: indSlideIn .4s cubic-bezier(.16,1,.3,1) forwards; }
    @keyframes indImgZoom { from{transform:scale(1.08)} to{transform:scale(1)} }
    .ind-panel-img img[style*="opacity: 1"] { animation: indImgZoom .6s cubic-bezier(.16,1,.3,1) forwards; }

    /* ── Industry teaser card hover lift ── */
    .ind-teaser-card { transition:transform .28s cubic-bezier(.16,1,.3,1),box-shadow .28s ease; }
    .ind-teaser-card:hover { transform:translateY(-6px) scale(1.03); box-shadow:0 16px 48px rgba(0,0,0,.55); z-index:2; }
    .ind-teaser-card:hover img { filter:brightness(.45) saturate(.85)!important; transition:filter .28s ease; }

    /* ── Magnetic button micro-move ── */
    .rzp-mag { transition:transform .2s cubic-bezier(.16,1,.3,1); display:inline-block; }

    /* ── Underline grow on nav links ── */
    .nav-link-rzp { position:relative; }
    .nav-link-rzp::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:var(--gold); transition:width .3s cubic-bezier(.16,1,.3,1); }
    .nav-link-rzp:hover::after { width:100%; }

    /* ── Section gold line draw ── */
    @keyframes rzpLineDraw { from{width:0} to{width:48px} }
    .rzp-line { display:block; height:3px; background:var(--gold); width:0; }
    .rzp-line.rzp-on { animation: rzpLineDraw .7s cubic-bezier(.16,1,.3,1) forwards; }

    /* ── Page-enter stagger for headings/paras ── */
    @keyframes rzpPageWord { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
    .rzp-page-word { opacity:0; animation:none; }
    .rzp-page-word.rzp-on { animation: rzpPageWord .5s cubic-bezier(.16,1,.3,1) forwards; }
  `;
  document.head.appendChild(S);

  /* ── 2. HERO ANIMATED MESH BLOBS ── */
  const heroSection = document.querySelector('.page[data-route="home"] section');
  if (heroSection) {
    const mesh = document.createElement('div');
    mesh.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;';
    [
      {cls:'rzp-mesh-1',s:'position:absolute;width:520px;height:520px;top:-120px;right:-80px;border-radius:50%;background:radial-gradient(circle,rgba(184,146,42,.18) 0%,transparent 70%);filter:blur(60px);'},
      {cls:'rzp-mesh-2',s:'position:absolute;width:400px;height:400px;bottom:-80px;left:-60px;border-radius:50%;background:radial-gradient(circle,rgba(99,60,180,.14) 0%,transparent 70%);filter:blur(70px);'},
      {cls:'rzp-mesh-3',s:'position:absolute;width:300px;height:300px;top:40%;left:40%;border-radius:50%;background:radial-gradient(circle,rgba(0,120,255,.10) 0%,transparent 70%);filter:blur(55px);'}
    ].forEach(function(b){const d=document.createElement('div');d.className=b.cls;d.style.cssText=b.s;mesh.appendChild(d);});
    heroSection.style.position = 'relative';
    heroSection.insertBefore(mesh, heroSection.firstChild);
    // ensure hero content sits above blobs
    heroSection.querySelectorAll(':scope > *:not(:first-child)').forEach(el => { if (!el.style.position) el.style.position = 'relative'; el.style.zIndex = '1'; });
  }

  /* ── 3. MARK SCROLL-REVEAL TARGETS ── */
  // Sections headings
  document.querySelectorAll('h2,h3').forEach((el,i) => {
    if (!el.dataset.rzp) { el.dataset.rzp = 'up'; el.dataset.rzpDelay = (i % 3) * 60 + 'ms'; }
  });
  // Cards / tiles
  document.querySelectorAll('.stat-block,.forum-card,.insight-card,.ind-teaser-card,.team-card,.career-card,.peek-row > *').forEach((el,i) => {
    if (!el.dataset.rzp) { el.dataset.rzp = 'up'; el.dataset.rzpDelay = (i % 6) * 80 + 'ms'; el.classList.add('rzp-shimmer'); }
  });
  // Paragraphs in sections
  document.querySelectorAll('.section-body > p, .ind-copy > p').forEach(el => {
    if (!el.dataset.rzp) el.dataset.rzp = 'fade';
  });

  /* ── 4. GOLD PULSE ON PRIMARY CTAs ── */
  document.querySelectorAll('.btn-gold,.cta-gold,.btn-primary').forEach(el => el.classList.add('rzp-pulse','rzp-mag'));

  /* ── 5. INTERSECTION OBSERVER — scroll reveal ── */
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
      e.target.querySelectorAll(':scope > *').forEach((child,i) => {
        child.style.transition = `opacity .55s cubic-bezier(.16,1,.3,1) ${i * 90}ms, transform .55s cubic-bezier(.16,1,.3,1) ${i * 90}ms`;
      });
      rzpStaggerObs.unobserve(e.target);
    });
  }, { threshold: 0.1 });

  const rzpLineObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('rzp-on'); rzpLineObs.unobserve(e.target); } });
  }, { threshold: 0.5 });

  const initObservers = () => {
    document.querySelectorAll('[data-rzp]').forEach(el => { if (!el._rzpWatching) { el._rzpWatching = true; rzpObs.observe(el); } });
    document.querySelectorAll('[data-rzp-stagger]').forEach(el => { if (!el._rzpWatching) { el._rzpWatching = true; rzpStaggerObs.observe(el); } });
    document.querySelectorAll('.rzp-line').forEach(el => { if (!el._rzpWatching) { el._rzpWatching = true; rzpLineObs.observe(el); } });
  };

  // Run on page load
  initObservers();

  /* ── 6. STAT NUMBER COUNTERS ── */
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (el._counted) return;
      el._counted = true;
      const target = parseInt(el.dataset.count || el.dataset.target || 0, 10);
      const suffix = el.dataset.suffix || '';
      if (!target) return;
      const dur = 1400, t0 = performance.now();
      const fmt = n => n >= 1000 ? (n/1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/,'') + 'K' : Math.round(n) + '';
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * ease) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObs.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count],[data-target]').forEach(el => countObs.observe(el));

  /* ── 7. MAGNETIC BUTTON HOVER ── */
  document.querySelectorAll('.rzp-mag').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 10;
      const y = ((e.clientY - r.top)  / r.height - .5) * 6;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ── 8. CARD 3-D TILT ── */
  document.querySelectorAll('.forum-card,.team-card,.ind-teaser-card').forEach(card => {
    card.style.perspective = '800px';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientY - r.top)  / r.height - .5) * 8;
      const y = ((e.clientX - r.left) / r.width  - .5) * -8;
      card.style.transform = `rotateX(${x}deg) rotateY(${y}deg) translateY(-6px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ── 9. INDUSTRIES STAGGER GRID ── */
  const teaserGrid = document.querySelector('.ind-teaser-grid');
  if (teaserGrid) {
    const tgObs = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      teaserGrid.querySelectorAll('.ind-teaser-card').forEach((c,i) => {
        c.style.opacity = '0'; c.style.transform = 'translateY(32px)';
        setTimeout(() => {
          c.style.transition = 'opacity .5s cubic-bezier(.16,1,.3,1), transform .5s cubic-bezier(.16,1,.3,1), box-shadow .28s ease';
          c.style.opacity = '1'; c.style.transform = '';
        }, i * 55);
      });
      tgObs.disconnect();
    }, { threshold: 0.1 });
    tgObs.observe(teaserGrid);
  }

  // Run on page load & re-run after SPA navigation
  initObservers();

  /* ── 10. PAGE NAVIGATION — single merged navigate hook ── */
  const _animOrigNavigate = window.navigate;
  window.navigate = function(route) {
    if (_animOrigNavigate) _animOrigNavigate.call(this, route);
    setTimeout(() => {
      initObservers();
      // re-attach data-rzp elements on newly active page
      document.querySelectorAll('.page.active [data-rzp]:not(.rzp-on)').forEach(el => {
        if (!el._rzpWatching) { el._rzpWatching = true; rzpObs.observe(el); }
      });
      document.querySelectorAll('[data-count],[data-target]').forEach(el => {
        if (!el._counted) countObs.observe(el);
      });
    }, 400);
  };

})();
