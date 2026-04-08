/* ============================================
   KAKA'S EGG CORNER - JavaScript
   ============================================ */

(function() {
  'use strict';

  // ===== PRELOADER =====
  window.addEventListener('load', function() {
    var preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function() {
        preloader.classList.add('hidden');
      }, 800);
    }
  });

  // ===== NAVBAR SCROLL =====
  var navbar = document.getElementById('navbar');
  var backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function() {
    var scrollY = window.scrollY;

    // Navbar sticky
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 60);
    }

    // Back to top button
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 400);
    }
  }, { passive: true });

  // Back to top click
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== MOBILE MENU =====
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileClose = document.getElementById('mobileClose');

  function openMenu() {
    if (mobileMenu) {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);

  // Close on link click
  var mobileLinks = document.querySelectorAll('.mobile-link, .mobile-order-btn');
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // ===== MENU TABS (Filter) =====
  var tabBtns = document.querySelectorAll('.tab-btn');
  var dishCards = document.querySelectorAll('.dish-card');

  tabBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var tab = this.getAttribute('data-tab');

      // Update active tab
      tabBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');

      // Filter cards with animation
      dishCards.forEach(function(card) {
        if (tab === 'all') {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(function() {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          var category = card.getAttribute('data-category');
          if (category === tab) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            requestAnimationFrame(function() {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });

  // ===== SCROLL REVEAL =====
  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function(el) {
    revealObserver.observe(el);
  });

  // ===== COUNTER ANIMATION =====
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-target'));
    var isDecimal = el.hasAttribute('data-decimal');
    var duration = 1800;
    var start = performance.now();

    function update(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = eased * target;

      if (isDecimal) {
        el.textContent = current.toFixed(1);
      } else if (target >= 1000) {
        el.textContent = Math.floor(current).toLocaleString('en-IN') + '+';
      } else {
        el.textContent = Math.floor(current) + '+';
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  var counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var nums = entry.target.querySelectorAll('.stat-num');
        nums.forEach(function(num) { animateCounter(num); });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  var statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) counterObserver.observe(statsGrid);

  // ===== ACTIVE NAV LINK ON SCROLL =====
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    var scrollY = window.scrollY + 100;

    sections.forEach(function(section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = navbar ? navbar.offsetHeight : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ===== PARALLAX HERO DECORATIONS =====
  var heroSection = document.querySelector('.hero');
  var deco1 = document.querySelector('.hero-deco-1');
  var deco2 = document.querySelector('.hero-deco-2');

  if (heroSection && deco1 && deco2 && window.innerWidth > 768) {
    heroSection.addEventListener('mousemove', function(e) {
      var rect = heroSection.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;

      requestAnimationFrame(function() {
        deco1.style.transform = 'translate(' + (x * 20) + 'px, ' + (y * 15) + 'px)';
        deco2.style.transform = 'translate(' + (x * -15) + 'px, ' + (y * -10) + 'px)';
      });
    });
  }

})();
