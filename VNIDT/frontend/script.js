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
        ctx.fillStyle = `rgba(15, 82, 186, ${alpha * 0.45})`;
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
            ctx.strokeStyle = `rgba(13, 148, 136, ${lineAlpha})`;
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

      const interestField = document.getElementById('contact-interest');

      // Simple validation
      let valid = true;
      [nameField, emailField, messageField, interestField].forEach(field => {
        if (!field || !field.value.trim()) {
          if (field) field.style.borderColor = 'var(--color-error)';
          valid = false;
        } else {
          if (field) field.style.borderColor = '';
        }
      });

      if (emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.style.borderColor = 'var(--color-error)';
        valid = false;
      }

      if (!valid) return;

      const phoneField = document.getElementById('contact-phone');
      const orgField = document.getElementById('contact-org');

      const formData = {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        message: messageField.value.trim(),
        phone: phoneField ? phoneField.value.trim() : '',
        organization: orgField ? orgField.value.trim() : '',
        sector: interestField ? interestField.value : '',
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

  // ── 10. Load Dynamic Projects & News from API ──
  function loadDynamicContent() {
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
      fetch('/api/projects')
        .then(res => res.json())
        .then(res => {
          if (res.success && res.data && res.data.length > 0) {
            renderProjects(res.data);
          }
        })
        .catch(err => console.warn('Could not load projects from API:', err));
    }

    const newsGrid = document.getElementById('news-grid');
    if (newsGrid) {
      fetch('/api/news')
        .then(res => res.json())
        .then(res => {
          if (res.success && res.data && res.data.length > 0) {
            renderNews(res.data);
          }
        })
        .catch(err => console.warn('Could not load news from API:', err));
    }
  }

  function renderProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    const defaultImages = [
      'assets/xay-dung-co-so-du-lieu-tnmt.jpg',
      'assets/he-thong-quan-ly-thong-minh.jpg',
      'assets/quan-ly-nguon-thai-web-app.jpg',
      'assets/canh-bao-thien-tai-ngu-truong.jpg'
    ];
    projectsGrid.innerHTML = projects.map((p, index) => {
      const img = p.imageUrl ? (window.getAssetUrl ? window.getAssetUrl(p.imageUrl) : p.imageUrl) : defaultImages[index % defaultImages.length];
      return `
        <a href="project-detail.html?id=${p.id}" class="project-card reveal visible" style="--i:${index}">
          <img src="${img}" alt="${p.name}" loading="lazy">
          <div class="project-card__overlay">
            <span class="project-card__tag">${p.tag}</span>
            <h3 class="project-card__title">${p.name}</h3>
            <p class="project-card__desc">${p.description}</p>
          </div>
        </a>
      `;
    }).join('');
  }

  function renderNews(news) {
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;
    const icons = [
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`,
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    ];
    newsGrid.innerHTML = news.map((n, index) => {
      const dateStr = new Date(n.publishedAt).toLocaleDateString('vi-VN');
      const icon = icons[index % icons.length];
      return `
        <a href="news-detail.html?slug=${n.slug}" class="news-card reveal visible" style="--i:${index}">
          <div class="news-card__image" style="color:var(--color-primary); background:rgba(var(--color-primary-rgb),0.05)">
            ${icon}
          </div>
          <div class="news-card__body">
            <div class="news-card__date">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>
               <span>${dateStr}</span>
            </div>
            <h3 class="news-card__title">${n.name}</h3>
            <p class="news-card__excerpt">${n.description}</p>
          </div>
        </a>
      `;
    }).join('');
  }

  // Load dynamic content on run
  loadDynamicContent();

})();
