(function () {
    const row = document.getElementById('team-peek');
    const dots = document.getElementById('team-dots');
    if (!row || !dots) return;
    const dotEls = dots.querySelectorAll('span');
    const cards = row.querySelectorAll(':scope > *');
    row.addEventListener('scroll', () => {
      const scrollable = row.scrollWidth - row.clientWidth;
      const progress = scrollable > 0 ? row.scrollLeft / scrollable : 0;
      const activeIdx = Math.min(cards.length - 1, Math.round(progress * (cards.length - 1)));
      dotEls.forEach((d, i) => d.classList.toggle('on', i === activeIdx));
    }, { passive: true });
  })();
