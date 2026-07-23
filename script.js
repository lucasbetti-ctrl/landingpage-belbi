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
const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwzYsPGQOB_9z5lnKr1_w0ibFLWSY-lYX_tTTvJCT6xNrUSi-aum1Zuza69mdGmV1Ft/exec';

const form = document.getElementById('contactForm');
if (form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitBtnDefaultHTML = submitBtn ? submitBtn.innerHTML : '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
    }

    fetch(SHEET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data)
    })
      .catch(() => {})
      .finally(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Mensagem enviada! Entraremos em contato em breve.';
          setTimeout(() => {
            submitBtn.innerHTML = submitBtnDefaultHTML;
          }, 4000);
        }
      });
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
