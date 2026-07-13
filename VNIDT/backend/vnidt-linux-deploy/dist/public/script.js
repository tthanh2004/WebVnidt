/* ============================================================
   VNiDT — script.js
   Navigation, Scroll Animations, Canvas Background, Counters
   ============================================================ */

(function () {
  'use strict';

  // ── DOM References ──
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.navbar__link');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  const heroCanvas = document.getElementById('heroCanvas');
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

  // ── 6. Hero Canvas: Particle Network ──
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const config = {
      particleCount: 80,
      connectionDistance: 150,
      particleRadius: 1.5,
      speed: 0.3,
      mouseRadius: 200,
    };

    function resize() {
      const rect = heroCanvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      heroCanvas.width = rect.width * dpr;
      heroCanvas.height = rect.height * dpr;
      heroCanvas.style.width = rect.width + 'px';
      heroCanvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
    }

    function createParticles() {
      const rect = heroCanvas.parentElement.getBoundingClientRect();
      particles = [];
      // Adjust particle count for mobile
      const count = window.innerWidth < 768 ? Math.floor(config.particleCount * 0.5) : config.particleCount;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * config.speed,
          vy: (Math.random() - 0.5) * config.speed,
          radius: config.particleRadius * (0.5 + Math.random()),
        });
      }
    }

    function drawParticles() {
      const rect = heroCanvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Keep in bounds
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let alpha = 0.35;
        if (dist < config.mouseRadius) {
          alpha = 0.35 + 0.55 * (1 - dist / config.mouseRadius);
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 240, ${alpha})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cdist < config.connectionDistance) {
            const lineAlpha = 0.08 * (1 - cdist / config.connectionDistance);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(124, 58, 237, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(drawParticles);
    }

    // Mouse tracking
    heroCanvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = heroCanvas.parentElement.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroCanvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    // Init
    function initCanvas() {
      resize();
      createParticles();
      if (!prefersReducedMotion) {
        drawParticles();
      } else {
        // Draw static frame for reduced-motion users
        drawParticles();
        cancelAnimationFrame(animationId);
      }
    }

    initCanvas();

    // Resize handler (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(animationId);
        initCanvas();
      }, 250);
    });
  }

  // ── 7. Contact Form Handling ──
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

      // Real submission via fetch
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Đang gửi...
      `;
      submitBtn.disabled = true;

      // Use relative path for production deployment
      fetch('/api/contact', {
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

  // ── 8. Smooth Scroll for Anchor Links ──
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

  // ── 9. Spinner Keyframe (inline style) ──
  const spinStyle = document.createElement('style');
  spinStyle.textContent = '@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}';
  document.head.appendChild(spinStyle);

})();
