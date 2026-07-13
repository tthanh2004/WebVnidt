/* ============================================================
   VNiDT — script.js (WordPress Version)
   Navigation, Scroll Animations, Counters, Contact Form
   ============================================================ */

(function () {
  'use strict';

  // ── DOM References ──
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.navbar__link');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  const contactForm = document.getElementById('contactForm');

  // ── 1. Navbar: Scroll Effect ──
  let lastScroll = 0;
  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ── 2. Mobile Menu Toggle ──
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ── 3. Scroll Spy: Active Nav Link ──
  const sections = document.querySelectorAll('section[id]');
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    {
      rootMargin: '-20% 0px -75% 0px',
      threshold: 0,
    }
  );
  sections.forEach(section => spyObserver.observe(section));

  // ── 4. Scroll Reveal Animations ──
  const revealElements = document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );
  revealElements.forEach(el => revealObserver.observe(el));

  // ── 5. Animated Counters ──
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const startTime = performance.now();

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.round(easedProgress * target);

      el.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  counters.forEach(counter => counterObserver.observe(counter));

  // ── 6. Contact Form Handling (WordPress REST API) ──
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const submitBtn = document.getElementById('submitBtn');
      const nameField = document.getElementById('contact-name');
      const emailField = document.getElementById('contact-email');
      const messageField = document.getElementById('contact-message');

      // Simple validation
      let valid = true;
      [nameField, emailField, messageField].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = 'var(--color-error)';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.style.borderColor = 'var(--color-error)';
        valid = false;
      }

      if (!valid) return;

      const phoneField = document.getElementById('contact-phone');
      const orgField = document.getElementById('contact-org');
      const interestField = document.getElementById('contact-interest');

      const formData = {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        message: messageField.value.trim(),
        phone: phoneField ? phoneField.value.trim() : '',
        organization: orgField ? orgField.value.trim() : '',
        interest: interestField ? interestField.value : '',
      };

      // Real submission via WordPress REST API
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Đang gửi...
      `;
      submitBtn.disabled = true;

      // WordPress REST API endpoint
      const apiUrl = (window.wpApiSettings && window.wpApiSettings.root) 
        ? window.wpApiSettings.root + 'vnidt/v1/contact'
        : '/wp-json/vnidt/v1/contact';

      fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            Đã gửi thành công!
          `;
          submitBtn.style.background = 'var(--color-success)';
          submitBtn.style.color = '#fff';

          contactForm.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
          }, 3000);
        } else {
          throw new Error(data.message || 'Lỗi không xác định');
        }
      })
      .catch(error => {
        submitBtn.innerHTML = `Lỗi: ${error.message}`;
        submitBtn.style.background = 'var(--color-error)';
        submitBtn.style.color = '#fff';
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
        }, 3000);
      });
    });

    // Clear error on input
    contactForm.querySelectorAll('.form__input, .form__textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

  // ── 7. Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── 8. Spinner Keyframe (inline style) ──
  const spinStyle = document.createElement('style');
  spinStyle.textContent = '@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}';
  document.head.appendChild(spinStyle);

})();
