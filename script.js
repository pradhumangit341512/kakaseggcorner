// Navbar scroll & back-to-top visibility
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  if (window.scrollY > 400) {
    backToTop.style.opacity = '1';
    backToTop.style.pointerEvents = 'auto';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.pointerEvents = 'none';
  }
});

// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

// Menu tabs
function showTab(id, btn) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

// Scroll reveal (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Dish add-button feedback
document.querySelectorAll('.dish-add-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const orig = this.textContent;
    this.textContent = '\u2713';
    this.style.background = '#2D6A4F';
    this.style.transform = 'scale(1.3)';
    setTimeout(() => {
      this.textContent = orig;
      this.style.background = '';
      this.style.transform = '';
    }, 1200);
  });
});

// ===== STAT COUNTER ANIMATION =====
function animateCounter(el, target) {
  const isFloat = target % 1 !== 0;
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = target * ease;

    if (isFloat) {
      el.textContent = current.toFixed(1);
    } else {
      el.textContent = Math.floor(current);
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      // Restore original text (may contain symbols like +, ₹, h)
      el.textContent = el.dataset.original;
    }
  }
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const text = el.textContent.trim();
      el.dataset.original = text;
      const num = parseFloat(text.replace(/[^0-9.]/g, ''));
      if (!isNaN(num)) {
        animateCounter(el, num);
      }
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => statObserver.observe(el));

// ===== DISH CARD 3D TILT =====
document.querySelectorAll('.dish-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== USP ITEM STAGGER ANIMATION =====
const uspObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const items = e.target.querySelectorAll('.usp-item');
      items.forEach((item, i) => {
        setTimeout(() => item.classList.add('animate-in'), i * 150);
      });
      uspObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.usp-list').forEach(el => uspObserver.observe(el));

// ===== PARALLAX BLOBS ON MOUSE MOVE =====
const blob1 = document.querySelector('.hero-blob1');
const blob2 = document.querySelector('.hero-blob2');

if (blob1 && blob2) {
  document.getElementById('hero').addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    blob1.style.transform = `translate(${x * 30}px, ${y * 20}px)`;
    blob2.style.transform = `translate(${x * -20}px, ${y * -15}px)`;
  });
}

// ===== SMOOTH SCROLL ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--spice)';
    }
  });
});

// ===== REVIEWS SUMMARY COUNTER =====
const rsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.rs-num').forEach(el => {
        const text = el.textContent.trim();
        el.dataset.original = text;
        const num = parseFloat(text.replace(/[^0-9.]/g, ''));
        if (!isNaN(num)) {
          animateCounter(el, num);
        }
      });
      rsObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.reviews-summary').forEach(el => rsObserver.observe(el));

// ===== FLOATING CARDS MOUSE PARALLAX =====
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
  const floatCards = heroVisual.querySelectorAll('.float-card');
  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    floatCards.forEach((card, i) => {
      const factor = (i + 1) * 8;
      card.style.transform += ` translate(${x * factor}px, ${y * factor}px)`;
    });
  });
}

// ===== TYPING EFFECT FOR SECTION SUBTITLES (FIRST ONE) =====
const heroDesc = document.querySelector('.hero-desc');
if (heroDesc) {
  const fullText = heroDesc.textContent;
  heroDesc.textContent = '';
  heroDesc.style.visibility = 'visible';
  let charIndex = 0;

  function typeHeroDesc() {
    if (charIndex < fullText.length) {
      heroDesc.textContent += fullText.charAt(charIndex);
      charIndex++;
      setTimeout(typeHeroDesc, 18);
    }
  }
  // Start typing after hero animation settles
  setTimeout(typeHeroDesc, 900);
}

// ===== MAGNETIC BUTTON EFFECT ON CTA =====
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ===== SMOOTH SCROLL FOR BACK TO TOP =====
backToTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
