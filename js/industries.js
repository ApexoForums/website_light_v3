(function () {
    const tabs = document.querySelectorAll('.ind-tab');
    if (!tabs.length) return;
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.dataset.ind;
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        document.querySelectorAll('.ind-panel-img img').forEach(img => {
          img.style.opacity = img.dataset.ind === key ? '1' : '0';
        });
        document.querySelectorAll('.ind-copy').forEach(copy => {
          const match = copy.dataset.ind === key;
          copy.style.opacity = match ? '1' : '0';
          copy.style.pointerEvents = match ? 'auto' : 'none';
        });
      });
    });
  })();
