/* ========================================
   A2A ENERGIA – MAIN JS
   ======================================== */

// Carousel
function initCarousel() {
  const track = document.querySelector('.carousel-slides');
  if (!track) return;
  const slides = track.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let current = 0;
  let timer;

  function goTo(n) {
    current = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function start() { timer = setInterval(() => goTo(current + 1), 5000); }
  function stop() { clearInterval(timer); }

  document.querySelector('.carousel-arrow.next')?.addEventListener('click', () => { stop(); goTo(current + 1); start(); });
  document.querySelector('.carousel-arrow.prev')?.addEventListener('click', () => { stop(); goTo(current - 1); start(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { stop(); goTo(i); start(); }));

  start();
}

// FAQ Accordion
function initFaq() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
}

// Ticker tabs
function initTicker() {
  const tabs = document.querySelectorAll('.ticker-tab');
  const panels = document.querySelectorAll('.ticker-panel');
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.add('hidden'));
      tab.classList.add('active');
      panels[i]?.classList.remove('hidden');
    });
  });
}

// Promo toggle
function initPromo() {
  const toggle = document.getElementById('promo-toggle');
  const form = document.getElementById('promo-form');
  if (toggle && form) {
    toggle.addEventListener('click', () => {
      form.classList.toggle('hidden');
    });
  }
}

// Scroll reveal
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

// Mobile nav
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('main-nav');
  toggle?.addEventListener('click', () => nav?.classList.toggle('open'));
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// Init all
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initFaq();
  initTicker();
  initPromo();
  initScrollReveal();
  initMobileNav();
});
