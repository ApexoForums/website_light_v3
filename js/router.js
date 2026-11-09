document.addEventListener('DOMContentLoaded', function () {
  // Typewriter — subtitle only, types once
  const twEl = document.getElementById('tw-text');
    if (twEl) {
      const full = "The right people. The right conversations. The right opportunities.";
      let i = 0;
      const typeLoop = () => {
        twEl.textContent = full.slice(0, i);
        i++;
        if (i <= full.length) setTimeout(typeLoop, i < 5 ? 80 : 44);
      };
      setTimeout(typeLoop, 900);
    }

    // Countdown to Dec 10 2026 09:00 IST
    const target = new Date('2026-12-11T09:00:00+05:30').getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { document.getElementById('countdown') && (document.getElementById('countdown').querySelector('p') || document.createElement('p')); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = n => String(n).padStart(2,'0');
      const dEl = document.getElementById('cd-days');
      const hEl = document.getElementById('cd-hours');
      const mEl = document.getElementById('cd-mins');
      const sEl = document.getElementById('cd-secs');
      if (dEl) dEl.textContent = pad(d);
      if (hEl) hEl.textContent = pad(h);
      if (mEl) mEl.textContent = pad(m);
      if (sEl) sEl.textContent = pad(s);
    };
    tick();
    setInterval(tick, 1000);
    // Scroll-aware nav collapse
    const nav = document.getElementById('nav');
    let lastY = 0, collapseY = 0, navCollapsed = false;
    const EXPAND_THRESHOLD = 80;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (!navCollapsed && y > lastY && y > 150) {
        navCollapsed = true; collapseY = y;
        nav.classList.add('collapsed');
      } else if (navCollapsed && y < lastY && (collapseY - y > EXPAND_THRESHOLD)) {
        navCollapsed = false;
        nav.classList.remove('collapsed');
      }
      lastY = y;
    }, { passive: true });
    nav.addEventListener('click', () => {
      if (navCollapsed) { navCollapsed = false; nav.classList.remove('collapsed'); }
    });

    // ── Per-page SEO data (from seo.json) ──────────────────────────
    const SEO_BASE = 'https://www.apexoac.com';
    const SEO_IMG = SEO_BASE + '/uploads/voice-ai-summit-conference.png';
    const SEO = {
      home: { path: '/', title: "Apexo Forums | India's Premier B2B CXO Platform", description: "India's Premier B2B CXO Platform. Premium B2B summits, CXO roundtables, enterprise awards and curated networking for India's senior decision-makers.", keywords: "B2B CXO platform India, business networking forum India, CXO summit India, executive roundtables India, leadership summit India, business summits Bengaluru, industry awards India, Apexo Forums, B2B events India 2026, CXO networking events India, enterprise summit India, business conclave India, leadership summit Mumbai, CEO conference India, senior executive forum India, corporate networking India, business summit organisers India, B2B forum company India, conference management India, exclusive business events India, corporate conferences India, industry networking events India, bespoke corporate events India, B2B event company India, CXO conference India, enterprise leadership forum, business media India, B2B summits India, thought leadership events India, executive summit Bengaluru, CXO forum Mumbai, CHRO summit India, CFO summit India, CISO forum India, CIO conference India, CMO summit India, GCC summit India, FinTech summit India, BFSI summit India, AI summit India, sales conference India, procurement summit India, global business summits, business networking events India, corporate event management company India, business conference platform India, B2B exhibition India, managed conference services India, virtual and hybrid corporate events India, industry awards ceremony India" },
      about: { path: '/company', title: "About Apexo Forums | Curated B2B CXO Forums for Decision-Makers", description: "Apexo Forums curates premium B2B summits, CXO roundtables and enterprise networking platforms built for India's senior decision-makers. Quality over scale.", keywords: "about Apexo Forums, B2B CXO platform India, business forum company India, B2B event company India, executive networking platform India, curated business events India, business event organiser India, conference company Mumbai, event management company India, premium B2B events India, corporate events India, business forum organiser India, bespoke corporate event planners India" },
      vision: { path: '/vision-mission', title: "Vision & Mission | Apexo Forums | India's B2B CXO Platform", description: "Apexo Forums' vision is to be India's most trusted B2B CXO platform for business leadership dialogue. Read our mission and the principles that guide every forum.", keywords: "Apexo Forums vision, Apexo Forums mission, business leadership dialogue India, B2B CXO forum values, executive forum values India, leadership dialogue India, corporate vision India, B2B event values India" },
      team: { path: '/team', title: "Founder & Leadership Team | Apexo Forums", description: "Meet Apexo Forums' founder Madhu Chaubey and the leadership team: Aastha Chaubey, CA Suraj Bisht, Yogesh Chaubey, Pallavi Singh and Palak Jain.", keywords: "Apexo Forums founder, Madhu Chaubey, Apexo Forums team, Aastha Chaubey, Suraj Bisht, Yogesh Chaubey, Pallavi Singh, Palak Jain, Apexo Forums leadership, event company founders India, B2B event company team India" },
      forums: { path: '/forums', title: "Upcoming B2B Summits & CXO Conferences India 2026 | Apexo Forums", description: "Upcoming Apexo Forums events: Voice AI Summit & Excellence Awards 2026 on 11 December at Bengaluru, plus executive summits, roundtables and awards across India.", keywords: "upcoming B2B summits India 2026, CXO conferences India 2026, Voice AI Summit Bengaluru December 2026, executive roundtables India 2026, industry awards India 2026, business forums Bengaluru 2026, AI conference India 2026, corporate conferences India 2026, CEO roundtable India, industry conferences Mumbai, BFSI summit 2026, FinTech conference India 2026, AI summit India 2026, leadership summits India 2026, enterprise conference Bengaluru 2026, Bengaluru conference, business summit December 2026 India, b2b conference organisers India, corporate conferences India, business networking events India, industry conferences India, global summits India, Voice AI Summit 2026, Voice AI conference India, enterprise Voice AI Bengaluru, conversational AI summit India, AI conference Bengaluru December 2026, Voice AI Excellence Awards India, CXO AI summit Bengaluru, agentic AI conference India, contact centre AI summit India, BFSI Voice AI conference, speech AI summit India, AI summit 11 December 2026, Voice AI Bengaluru 2026, LLM enterprise conference India, NLP summit India 2026, AI for CXOs India, voice technology summit India, Bengaluru conference December 2026, enterprise AI event Bengaluru 2026, Voice AI India 2026, generative AI summit India, AI awards India 2026, enterprise AI conference Bengaluru, Voice AI for customer experience, Voice AI operations India, Emotion AI summit India, Voice AI BFSI, Voice AI retail India, Voice AI healthcare India, CIO CDO forum Bengaluru, AI deployment India enterprise, Apexo Forums Voice AI Summit, India Voice AI leaders 2026, enterprise Voice AI conference, CXO AI forum India" },
      industries: { path: '/industries', title: "Industries We Serve | BFSI, FinTech, AI & More | Apexo Forums", description: "Apexo Forums convenes CXO leaders across BFSI, FinTech, technology, AI, healthcare, automotive, manufacturing, real estate, cybersecurity and more.", keywords: "BFSI summit India, FinTech conference India, technology leadership forum, AI conference India, healthcare leadership summit India, cybersecurity CISO forum India, manufacturing summit India, banking summit India, insurance leaders forum India, technology CXO summit India, pharma leadership forum India, automotive industry summit India, cross-industry business forum India, DevOps summit India, CX summit India, GCC summit India, shared services summit India, data analytics conference India, procurement summit India, warehouse logistics conference India" },
      ai: { path: '/ai-matchmaking', title: "Summit IQ: AI Business Matchmaking (Coming Soon) | Apexo Forums", description: "Summit IQ is Apexo Forums' upcoming AI platform that matches CXOs and businesses with relevant partners, customers and investors across India.", keywords: "AI business matchmaking India, AI networking platform India, B2B matchmaking India, Summit IQ, find business partners India, investor matchmaking India, AI-powered networking India, intelligent business networking India, corporate matchmaking India, AI-driven B2B connections India, CXO matchmaking platform" },
      insights: { path: '/insights', title: "Insights | Business Intelligence & CXO Perspectives | Apexo Forums", description: "Analysis, leadership interviews, forum highlights and sector briefings from Apexo Forums' B2B CXO community across India.", keywords: "business insights India, CXO interviews India, industry analysis India, forum highlights, sector briefings India, business intelligence India, executive perspectives India, industry trends India 2026, enterprise thought leadership India" },
      careers: { path: '/careers', title: "Careers at Apexo Forums | Events & Partnerships Jobs India", description: "Join Apexo Forums' B2B CXO platform team. Openings: Event Production Manager, Delegate Acquisition Executive and Business Development Manager.", keywords: "Apexo Forums careers, event management jobs India, delegate acquisition jobs India, B2B sponsorship sales jobs India, business development events jobs India, conference management jobs India, event industry careers India, event production manager India, business development manager events India" },
      contact: { path: '/contact', title: "Contact Apexo Forums | Attend, Sponsor, Speak or Partner", description: "Get in touch with Apexo Forums to attend a B2B forum, sponsor an event, speak on a panel, nominate for an award or explore a partnership.", keywords: "contact Apexo Forums, sponsor B2B summit India, speak at conference India, event partnership India, award nomination India, attend business summit India, sponsor CXO forum India, conference speaking opportunity India, B2B event partnership India, sponsorship enquiry India" },
      partner: { path: '/partner', title: "Partner With Apexo Forums | Sponsorship & Brand Visibility India", description: "Associate your brand with India's premier B2B CXO forums. Title Partner, Platinum, Gold, Silver, Bronze, Lanyard, Co-Host and Knowledge Partner packages available.", keywords: "sponsor B2B summit India, event sponsorship India, title partner summit India, CXO forum sponsorship, brand visibility India events, lanyard sponsorship India, knowledge partner India, co-host sponsorship India, enterprise event sponsorship India, corporate event management companies India, B2B exhibition sponsorship India, business networking platform India, custom conference sponsorship India" },
      privacy: { path: '/privacy-policy', title: "Privacy Policy | Apexo Forums", description: "How Apexo Forums collects, uses, shares and protects your personal data, your rights under India's DPDP Act 2023, and how to reach our Grievance Officer.", keywords: "Apexo Forums privacy policy, DPDP Act 2023, data principal rights India, grievance officer, personal data protection India", robots: 'noindex, follow' },
      terms: { path: '/terms', title: "Terms & Conditions | Apexo Forums", description: "Terms and conditions for using the Apexo Forums website, registering for summits, sponsorship, award nominations, cancellations and refunds.", keywords: "Apexo Forums terms and conditions, event registration terms India, sponsorship terms, cancellation refund policy, award nomination terms", robots: 'noindex, follow' }
    };

    const setMetaTag = (sel, attr, value) => {
      const el = document.head.querySelector(sel);
      if (el) el.setAttribute(attr, value);
    };

    const updateSeo = (route) => {
      const page = SEO[route] || SEO.home;
      const url = SEO_BASE + (page.path === '/' ? '/' : page.path);
      document.title = page.title;
      setMetaTag('meta[name="description"]', 'content', page.description);
      setMetaTag('meta[name="keywords"]', 'content', page.keywords);
      setMetaTag('meta[name="robots"]', 'content', page.robots || 'index, follow, max-image-preview:large');
      setMetaTag('#seo-canonical', 'href', url);
      setMetaTag('#seo-og-title', 'content', page.title);
      setMetaTag('#seo-og-desc', 'content', page.description);
      setMetaTag('#seo-og-url', 'content', url);
      setMetaTag('#seo-tw-title', 'content', page.title);
      setMetaTag('#seo-tw-desc', 'content', page.description);
    };

    // Router
    const navigate = (route) => {
      updateSeo(route);
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const pg = document.getElementById('page-' + route);
      if (pg) {
        pg.classList.add('active');
        window.scrollTo(0, 0);
        // Trigger reveals for new page
        setTimeout(() => triggerReveals(), 50);
      }
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.dataset.route === route);
      });
    };

    // Nav dropdown: click-toggle (fixes mobile/touch + "stays open" issue)
    // Nav dropdown: click to toggle, hover also works via CSS
    document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const menu = trigger.nextElementSibling;
        const isOpen = menu.classList.contains('dd-open');
        document.querySelectorAll('.nav-dropdown-menu.dd-open').forEach(m => m.classList.remove('dd-open'));
        document.querySelectorAll('.nav-dropdown-trigger.dd-open').forEach(t => t.classList.remove('dd-open'));
        if (!isOpen) { menu.classList.add('dd-open'); trigger.classList.add('dd-open'); }
      });
    });

    // Close dropdown only when clicking fully outside nav
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#nav')) {
        document.querySelectorAll('.nav-dropdown-menu.dd-open').forEach(m => m.classList.remove('dd-open'));
        document.querySelectorAll('.nav-dropdown-trigger.dd-open').forEach(t => t.classList.remove('dd-open'));
      }
      const el = e.target.closest('[data-route]');
      if (el) {
        e.preventDefault();
        document.querySelectorAll('.nav-dropdown-menu.dd-open').forEach(m => m.classList.remove('dd-open'));
        // Industries nav: scroll to section if already on home page
        if (el.dataset.scrollHome && document.getElementById('page-home')?.classList.contains('active')) {
          const target = document.getElementById(el.dataset.scrollHome);
          if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
        }
        navigate(el.dataset.route);
      }
    });

    // Scroll reveals
    const triggerReveals = () => {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          e.target.classList.add('on');
          obs.unobserve(e.target);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.rv,.rv-s,.rv-l,.wipe,.lgrow,.stat-n').forEach(el => {
        if (!el.classList.contains('on')) obs.observe(el);
      });
    };
    triggerReveals();

    // Stat counters
    const statObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.target || 0);
        const suffix = el.dataset.suffix || '';
        if (!target) return;
        const dur = 1300;
        const start = performance.now();
        const fmt = n => n >= 1000 ? Math.round(n / 1000) + 'K' : Math.round(n) + '';
        const tick = now => {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(target * ease) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        statObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-n[data-target]').forEach(el => statObs.observe(el));

    // Show home page on load
    navigate('home');
});
