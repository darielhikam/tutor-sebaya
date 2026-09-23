document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  // attach ripple to clickable buttons/links
  function makeRipple(e){
    const el = e.currentTarget;
    // create container if not present
    if (!el.classList.contains('ripple-container')) el.classList.add('ripple-container');
    const rect = el.getBoundingClientRect();
    const r = document.createElement('span');
    r.className = 'ripple';
    const size = Math.max(rect.width, rect.height) * 0.9;
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size/2) + 'px';
    r.style.top = (e.clientY - rect.top - size/2) + 'px';
    r.style.background = 'rgba(255,255,255,0.18)';
    el.appendChild(r);
    setTimeout(()=> r.remove(), 650);
  }

  // attach to primary interactive elements
  const rippleTargets = document.querySelectorAll('a.submit-btn, button, a.nav-cta, .secondary-btn');
  rippleTargets.forEach(t=> t.addEventListener('click', makeRipple));

  // smooth page transitions for internal links
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
    e.preventDefault();
    document.body.classList.add('page-exit');
    setTimeout(()=> { window.location = href; }, 220);
  });
});
