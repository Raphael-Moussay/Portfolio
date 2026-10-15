// Hamburger menu
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');

burger.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', () => {
    drawer.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close drawer when clicking outside or pressing Escape
document.addEventListener('click', (event) => {
  if (drawer.classList.contains('open') && !drawer.contains(event.target) && !burger.contains(event.target)) {
    drawer.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && drawer.classList.contains('open')) {
    drawer.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Intersection Observer
const io = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) el.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .edu-card').forEach(el => io.observe(el));

// Timeline stagger
const timelineIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.timeline-item');
      items.forEach((item, i) => {
        setTimeout(() => item.classList.add('visible'), i * 100);
      });
      timelineIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });
const tl = document.querySelector('.timeline');
if (tl) timelineIO.observe(tl);

// Project cards stagger
const cardIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.project-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 80);
      });
      cardIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });
const grid = document.querySelector('.projects-grid');
if (grid) cardIO.observe(grid);

// Mouse glow on project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});

// Nav scroll effect + active link highlight
const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.borderBottomColor = window.scrollY > 50
    ? 'rgba(108,99,255,0.3)'
    : 'rgba(108,99,255,0.15)';

  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});
