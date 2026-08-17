// =============================================
// NOOH — Premium Frozen Food Export
// Main JavaScript & Interactive Behaviors
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  /* ── Navbar Scroll Behavior ── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    updateActiveNav();
  }, { passive: true });

  /* ── Hamburger Menu Toggle ── */
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  /* Close mobile nav on link click */
  document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav?.classList.remove('open');
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  /* Close mobile nav on outside click */
  document.addEventListener('click', (e) => {
    if (mobileNav?.classList.contains('open')) {
      if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger?.classList.remove('open');
      }
    }
  });

  /* ── Active Nav Link Scrollspy ── */
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    let currentId = '';

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === currentId);
    });
  }

  /* ── Smooth Scroll for Anchor Links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Scroll-Reveal Animations (Intersection Observer) ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── Marquee Duplicate for Seamless Infinite Loop ── */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const original = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML = original + original;
  }

  /* ── Product Category Filtering ── */
  const filterBtns = document.querySelectorAll('.product-filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      productCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ── Product Specification Details Modal Data ── */
  const productDetailsData = {
    strawberry: {
      name: "IQF Frozen Strawberry",
      category: "Frozen Fruits",
      image: "images/product_strawberry.png",
      description: "Harvested at peak red ripeness from certified farms and processed within hours. Our strawberries are Individually Quick Frozen (IQF) to preserve sweet aroma, juicy texture, and vibrant natural color.",
      specs: [
        { label: "Variety", value: "Festival, Fortuna, Sensation" },
        { label: "Cut Types", value: "Whole, Sliced, Diced (10x10mm)" },
        { label: "Brix Level", value: "7.0° – 9.0° Brix" },
        { label: "Freezing Method", value: "IQF (-40°C Cryogenic)" },
        { label: "Shelf Life", value: "24 Months at -18°C" },
        { label: "Packaging", value: "10kg Cartons, 2.5kg Bags, Retail Pouches" },
        { label: "Certifications", value: "ISO 22000, BRCGS, Halal, GlobalGAP" }
      ]
    },
    blueberry: {
      name: "IQF Frozen Blueberry",
      category: "Frozen Fruits",
      image: "images/product_blueberry.png",
      description: "Plump, antioxidant-rich blueberries harvested from premium highbush crops. Rapid freezing locks in nutrient density, natural bloom, and crisp berry bite.",
      specs: [
        { label: "Variety", value: "Highbush Cultivated & Wild" },
        { label: "Cut Types", value: "IQF Whole Berries" },
        { label: "Size Grade", value: "10mm – 16mm Diameter" },
        { label: "Freezing Method", value: "IQF (-40°C Cryogenic)" },
        { label: "Shelf Life", value: "24 Months at -18°C" },
        { label: "Packaging", value: "10kg Bulk Box, 1kg Standup Pouch" },
        { label: "Certifications", value: "ISO 22000, BRCGS, Organic USDA" }
      ]
    },
    mango: {
      name: "IQF Frozen Mango Dices & Chunks",
      category: "Frozen Fruits",
      image: "images/product_mango.png",
      description: "Naturally sweet tropical mangoes peeled, deseeded, and diced. Free from fibers and rich in Vitamin A, ideal for juices, smoothies, yogurts, and bakery products.",
      specs: [
        { label: "Variety", value: "Kent, Keitt, Alphonso" },
        { label: "Cut Types", value: "Chunks (15x15mm), Dices (10x10mm), Slices" },
        { label: "Brix Level", value: "13.0° – 15.0° Brix" },
        { label: "Freezing Method", value: "IQF (-40°C Cryogenic)" },
        { label: "Shelf Life", value: "24 Months at -18°C" },
        { label: "Packaging", value: "10kg Octabin / Carton, Industrial Drums" },
        { label: "Certifications", value: "ISO 22000, HACCP, BRCGS Grade A" }
      ]
    },
    pomegranate: {
      name: "IQF Pomegranate Arils",
      category: "Frozen Fruits",
      image: "images/product_pomegranate.png",
      description: "Vibrant ruby-red pomegranate seeds extracted mechanically without water contact. Crispy texture, sweet-tart profile, ready to use for salads, desserts, and beverages.",
      specs: [
        { label: "Variety", value: "Wonderful, 116 Seeded" },
        { label: "Cut Types", value: "IQF Whole Arils / Seeds" },
        { label: "Purity", value: "99.5% Seed Purity (Zero Membrane)" },
        { label: "Freezing Method", value: "IQF (-40°C Cryogenic)" },
        { label: "Shelf Life", value: "24 Months at -18°C" },
        { label: "Packaging", value: "10kg Foil-lined Boxes, 500g Bags" },
        { label: "Certifications", value: "ISO 22000, BRCGS, GlobalGAP" }
      ]
    },
    grapes: {
      name: "IQF Seedless Grapes",
      category: "Frozen Fruits",
      image: "images/product_grapes.png",
      description: "Crisp, naturally sweet seedless green and red grapes washed, stemmed, and individually quick frozen for premium snack applications and fruit processing.",
      specs: [
        { label: "Variety", value: "Thompson Seedless, Crimson" },
        { label: "Cut Types", value: "IQF Whole Grapes (Stemless)" },
        { label: "Brix Level", value: "16.0° – 18.0° Brix" },
        { label: "Freezing Method", value: "IQF (-40°C)" },
        { label: "Shelf Life", value: "24 Months at -18°C" },
        { label: "Packaging", value: "10kg Master Carton" },
        { label: "Certifications", value: "ISO 22000, HACCP, Halal" }
      ]
    },
    sweetcorn: {
      name: "IQF Golden Sweet Corn",
      category: "Frozen Vegetables",
      image: "images/product_sweetcorn.png",
      description: "Non-GMO golden sweet corn kernels harvested at peak sugar conversion, steam blanched, and quick frozen to lock in natural golden color and sweet snap.",
      specs: [
        { label: "Variety", value: "Super Sweet Golden Yellow" },
        { label: "Cut Types", value: "IQF Whole Kernels" },
        { label: "Moisture / Sugar", value: "Sweetness 12%+ Brix" },
        { label: "Freezing Method", value: "IQF Fluidized Bed" },
        { label: "Shelf Life", value: "24 Months at -18°C" },
        { label: "Packaging", value: "10kg Box, 2.5kg HORECA Bags, Retail" },
        { label: "Certifications", value: "ISO 22000, BRCGS, Non-GMO Verified" }
      ]
    },
    mixedfruits: {
      name: "Gourmet Frozen Fruit Mix",
      category: "Fruit Mix",
      image: "images/product_mixedfruits.png",
      description: "A chef-crafted blend of IQF strawberries, mango cubes, sliced peaches, and whole blueberries. Perfect balance of colors, textures, and tropical flavors.",
      specs: [
        { label: "Composition", value: "Strawberry (30%), Mango (30%), Peach (20%), Blueberry (20%)" },
        { label: "Cut Types", value: "Custom Dices & Whole Berries" },
        { label: "Freezing Method", value: "IQF (-40°C)" },
        { label: "Shelf Life", value: "24 Months at -18°C" },
        { label: "Packaging", value: "1kg Standup Zipper Bag, 10kg Carton" },
        { label: "Certifications", value: "ISO 22000, BRCGS, Halal" }
      ]
    },
    mixedveg: {
      name: "4-Way Gourmet Vegetable Mix",
      category: "Vegetable Mix",
      image: "images/product_mixedveg.png",
      description: "Steam-blanched garden peas, sweet corn kernels, diced carrots, and broccoli florets. Bright colors and farm-fresh taste ready for boiling, steaming, or stir-fry.",
      specs: [
        { label: "Composition", value: "Green Peas (30%), Sweet Corn (25%), Diced Carrots (25%), Broccoli (20%)" },
        { label: "Cut Types", value: "Diced 10x10mm & Florets 20-40mm" },
        { label: "Freezing Method", value: "IQF (-40°C)" },
        { label: "Shelf Life", value: "24 Months at -18°C" },
        { label: "Packaging", value: "10kg Carton, 2.5kg Foodservice Bag" },
        { label: "Certifications", value: "ISO 22000, BRCGS Grade A" }
      ]
    }
  };

  /* Modal Trigger Functions */
  const modal = document.getElementById('product-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close');

  window.openProductModal = function(productId) {
    const data = productDetailsData[productId];
    if (!data || !modal || !modalBody) return;

    let specsHTML = data.specs.map(s => `
      <div class="modal-spec-row">
        <span class="spec-label">${s.label}</span>
        <span class="spec-val">${s.value}</span>
      </div>
    `).join('');

    modalBody.innerHTML = `
      <div class="modal-grid">
        <div class="modal-img-col">
          <img src="${data.image}" alt="${data.name}" class="modal-product-img" loading="eager" decoding="async" />
          <div class="modal-badge-tag">${data.category}</div>
        </div>
        <div class="modal-info-col">
          <h3 class="modal-title">${data.name}</h3>
          <p class="modal-desc">${data.description}</p>
          <div class="modal-specs-list">
            ${specsHTML}
          </div>
          <div class="modal-actions" style="display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="https://wa.me/201090283194?text=${encodeURIComponent('مرحباً شركة NOOH، أرغب في استفسار وطلب كوتيشن لمنتج: ' + data.name)}" target="_blank" class="btn-primary" style="background: #25D366; color: white; border: none; box-shadow: 0 4px 14px rgba(37,211,102,.4);">
              💬 اطلب المنتج عبر الواتساب
            </a>
            <a href="#contact" onclick="closeProductModal()" class="btn-outline-white" style="color: var(--text-dark); border-color: var(--border);">
              📩 نموذج الاستفسار
            </a>
          </div>
        </div>
      </div>
    `;

    // Ensure modal image is processed by image loader
    const modalImg = modalBody.querySelector('.modal-product-img');
    if (modalImg && typeof window.handleNoohImage === 'function') {
      window.handleNoohImage(modalImg);
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProductModal = function() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProductModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProductModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('active')) {
      closeProductModal();
    }
  });

  /* ── Contact Form Submission -> WhatsApp Auto Redirect ── */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const phone = document.getElementById('phone')?.value || '';
      const company = document.getElementById('company')?.value || '';
      const productSelect = document.getElementById('product-interest');
      const productText = productSelect ? productSelect.options[productSelect.selectedIndex].text : '';
      const message = document.getElementById('message')?.value || '';

      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `⏳ جاري فتح الواتساب...`;
      submitBtn.disabled = true;

      // Construct formatted WhatsApp message
      const waMsg = `*طلب جديد من موقع NOOH Agriculture Export*\n\n` +
                    `👤 *الاسم:* ${name}\n` +
                    `🏢 *الشركة:* ${company}\n` +
                    `📧 *البريد الإلكتروني:* ${email}\n` +
                    `📱 *رقم الهاتف/الواتساب:* ${phone}\n` +
                    `📦 *المنتج المطلوب:* ${productText}\n` +
                    `📝 *تفاصيل الاستفسار:* ${message}`;

      const waUrl = `https://wa.me/201090283194?text=${encodeURIComponent(waMsg)}`;

      setTimeout(() => {
        // Open WhatsApp in new tab
        window.open(waUrl, '_blank');

        submitBtn.innerHTML = `✓ تم التحويل إلى الواتساب!`;
        submitBtn.style.background = '#25D366';

        if (toast) {
          toast.querySelector('.toast-title').textContent = 'جاري فتح الواتساب...';
          toast.querySelector('.toast-sub').textContent = 'تم تجهيز بيانات طلبك وتحويلك مباشرة إلى WhatsApp.';
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 5000);
        }

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 800);
    });
  }

  /* ── Robust Image Loading & Error Fallback System ── */
  function createFallbackSVG(title) {
    const cleanTitle = (title || 'NOOH Premium Export Product').replace(/[<>&"]/g, '');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="fbBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a3d20" />
          <stop offset="100%" stop-color="#155d32" />
        </linearGradient>
        <radialGradient id="fbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#27a85f" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#0a3d20" stop-opacity="0" />
        </radialGradient>
        <filter id="fbShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity="0.5" />
        </filter>
      </defs>
      <rect width="800" height="600" fill="url(#fbBg)" />
      <circle cx="400" cy="270" r="220" fill="url(#fbGlow)" />
      <g filter="url(#fbShadow)" transform="translate(400, 250)">
        <circle cx="0" cy="0" r="70" fill="rgba(255,255,255,0.08)" stroke="#e8960a" stroke-width="3" />
        <text x="0" y="24" font-size="64" text-anchor="middle">❄️</text>
      </g>
      <rect x="180" y="470" width="440" height="54" rx="27" fill="rgba(10,30,18,0.92)" stroke="#e8960a" stroke-width="2" />
      <text x="400" y="505" font-family="'Inter', system-ui, sans-serif" font-size="19" font-weight="bold" fill="#ffffff" text-anchor="middle">${cleanTitle}</text>
    </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function handleNoohImage(img) {
    if (!img) return;

    const markLoaded = () => {
      img.classList.add('loaded');
      const parent = img.closest('.product-img-wrap, .about-image-wrap, .why-image-col, .ff-image-col, .modal-img-col');
      if (parent) parent.classList.add('loaded');
    };

    if (img.complete && img.naturalWidth !== 0) {
      markLoaded();
    } else {
      img.addEventListener('load', markLoaded, { once: true });
    }

    img.addEventListener('error', function() {
      if (!this.dataset.hasRetried) {
        this.dataset.hasRetried = 'true';
        let src = this.getAttribute('src') || '';
        if (src.startsWith('images/')) {
          this.src = src.replace('images/', '');
          return;
        } else if (!src.includes('/') && !src.startsWith('data:')) {
          this.src = 'images/' + src;
          return;
        }
      }
      if (this.dataset.hasFailed) return;
      this.dataset.hasFailed = 'true';
      this.src = createFallbackSVG(this.alt || this.getAttribute('data-fallback-title'));
      markLoaded();
    });
  }

  window.handleNoohImage = handleNoohImage;

  // Process all existing images
  document.querySelectorAll('img').forEach(handleNoohImage);

  updateActiveNav();
});


