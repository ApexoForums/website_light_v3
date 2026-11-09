(function(){
  const btn = document.getElementById('nav-hamburger');
  const menu = document.getElementById('nav-links-menu');
  if (!btn || !menu) return;

  // Show hamburger on mobile
  function checkMobile(){
    const isMobile = window.innerWidth <= 768;
    btn.style.display = isMobile ? 'flex' : 'none';
    if (!isMobile) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }
  }
  checkMobile();
  window.addEventListener('resize', checkMobile);

  btn.addEventListener('click', function(e){
    e.stopPropagation();
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Close when clicking a nav link
  menu.addEventListener('click', function(e){
    if (e.target.closest('a[data-route]') || e.target.closest('a[href]')) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }
  });

  // Close on outside click
  document.addEventListener('click', function(e){
    if (!btn.contains(e.target) && !menu.contains(e.target)){
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }
  });
})();
