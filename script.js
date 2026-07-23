// =========================================
//  BELBI — Landing Page Scripts
// =========================================

// --- MOBILE BURGER ---
const burger    = document.getElementById('navBurger');
const mobileNav = document.getElementById('navMobile');

burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  mobileNav.classList.toggle('open', open);
});

mobileNav.querySelectorAll('.nav__mobile-link, .nav__mobile-cta').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// --- SCROLL ANIMATIONS ---
const fadeEls = document.querySelectorAll(
  '.solution__item, .diffs__item, .pain__item, .authority__badge'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const staticFadeEls = document.querySelectorAll(
  '.solution__image-col'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach(el => observer.observe(el));
staticFadeEls.forEach(el => observer.observe(el));

document.querySelectorAll('.diffs__grid').forEach(grid => {
  grid.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });
});

// --- FORM SUBMIT ---
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const msg  = encodeURIComponent(
      `Olá, vim pelo site da Belbi!\n\nNome: ${data.name}\nEmpresa: ${data.company}\nE-mail: ${data.email}\nTelefone: ${data.phone || '—'}\n\nMensagem: ${data.message || '—'}`
    );
    window.open(`https://wa.me/5511979683347?text=${msg}`, '_blank');
    form.reset();
  });
}

// --- LEADERSHIP ACCORDION ---
document.querySelectorAll('.leadership-accordion__trigger').forEach(trigger => {
  const content = document.getElementById(trigger.getAttribute('aria-controls'));
  trigger.addEventListener('click', () => {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      content.hidden = true;
    } else {
      content.hidden = false;
    }
  });
});

// --- SMOOTH SCROLL ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
