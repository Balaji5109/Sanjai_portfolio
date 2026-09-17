/* ==========================================================================
   SANJAI KUMAR — PORTFOLIO SCRIPT
   All content arrays below are easy to edit — just change the values.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- NAVBAR SCROLL / BLUR ---------------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll(){
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    let current = sections[0]?.id;
    const offset = 140;
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - offset) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
    });
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- MOBILE MENU ---------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMenu(){
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('.mobile-link').forEach(a => a.addEventListener('click', closeMenu));

  /* ---------------- ROLE TICKER (hero subtitle) ---------------- */
  const roleItems = document.querySelectorAll('#roleTicker .role-item');
  let roleIndex = 0;
  if (roleItems.length){
    setInterval(() => {
      roleItems[roleIndex].classList.remove('is-active');
      roleIndex = (roleIndex + 1) % roleItems.length;
      roleItems[roleIndex].classList.add('is-active');
    }, 2400);
  }

  /* ---------------- SCROLL REVEAL ---------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------- CURSOR GLOW ---------------- */
  const cursorGlow = document.getElementById('cursorGlow');
  if (window.matchMedia('(hover: hover)').matches){
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    });
  }

  /* ---------------- BUTTON RIPPLE POSITION ---------------- */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty('--rx', `${e.clientX - rect.left}px`);
      btn.style.setProperty('--ry', `${e.clientY - rect.top}px`);
    });
  });

  /* ---------------- MAGNETIC PRIMARY BUTTONS ---------------- */
  document.querySelectorAll('.btn--primary, .social-icon').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  /* ---------------- DATA: TOOLS ---------------- */
  const tools = [
    { logoImg: 'assets/images/capcut.logo.jpg', name: 'CapCut Pro', use: 'Fast-paced reel editing & captions'  },
    { logoImg: 'assets/images/Davinci logo 3D.jpg', name: 'DaVinci Resolve', use: 'Color grading & cinematic cuts' },
    { logoImg: 'assets/images/Canva.jpg', name: 'Canva', use: 'Social creatives & thumbnails' },
    { logoImg: 'assets/images/Meta.jpg', name: 'Meta Ads Manager', use: 'Paid campaign management' },
    { logoImg: 'assets/images/instagram.jpg', name: 'Instagram', use: 'Reels & audience growth' },
    { logoImg: 'assets/images/YouTube.jpg', name: 'YouTube Studio', use: 'Long-form publishing & analytics' },
    { logoImg: 'assets/images/Figma.jpg', name: 'Figma', use: 'UI/UX design & prototyping' },
    { logoImg: 'assets/images/google.jpg', name: 'Google Analytics', use: 'Audience & performance tracking' },
    { logoImg: 'assets/images/chatgpt.jpg', name: 'ChatGPT', use: 'AI-assisted ideation & workflows' },
  ];
   const toolsGrid = document.getElementById('toolsGrid');
  tools.forEach((t, i) => {
    const el = document.createElement('div');
    el.className = 'tool-card card';
    el.setAttribute('data-reveal', 'up');
    el.style.setProperty('--d', `${(i % 5) * 0.06}s`);
    const logoHTML = t.logoImg
      ? `<img src="${t.logoImg}" alt="${t.name} logo" loading="lazy">`
      : t.logo;
    el.innerHTML = `
      <div class="tool-card__logo">${logoHTML}</div>
      <div class="tool-card__name">${t.name}</div>
      <div class="tool-card__use">${t.use}</div>
    `;
    toolsGrid.appendChild(el);
    revealObserver.observe(el);
  });
  addTilt(document.querySelectorAll('.tool-card'));

  /* ---------------- DATA: IMPACT ---------------- */
  const impact = [
    { icon: '👁️', value: 25, suffix: 'M+', label: 'Total Views' },
    { icon: '📈', value: 5, suffix: 'M+', label: 'Monthly Reach' },
    { icon: '❤️', value: 150, suffix: 'K+', label: 'Followers Reached' },
    { icon: '🎬', value: 300, suffix: '+', label: 'Videos Edited' },
    { icon: '📢', value: 10, suffix: 'M+', label: 'Paid Ad Reach' },
    { icon: '📅', value: 60, suffix: '+', label: 'Monthly Creatives' },
    { icon: '📈', value: 250, suffix: '%', label: 'Engagement Growth' },
    { icon: '⭐', value: 100, suffix: '%', label: 'Client Satisfaction' },
  ];
  const impactGrid = document.getElementById('impactGrid');
  impact.forEach((s, i) => {
    const el = document.createElement('div');
    el.className = 'impact-card card';
    el.setAttribute('data-reveal', 'up');
    el.style.setProperty('--d', `${(i % 4) * 0.08}s`);
    el.innerHTML = `
      <div class="impact-card__icon">${s.icon}</div>
      <div class="impact-card__value" data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
      <div class="impact-card__label">${s.label}</div>
    `;
    impactGrid.appendChild(el);
    revealObserver.observe(el);
  });

  /* ---------------- COUNTER ANIMATION ---------------- */
  const counters = document.querySelectorAll('.impact-card__value');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el){
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = `${current}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- DATA: SKILLS ---------------- */
  const skillGroups = [
    {
      title: '🎬 Video Editing',
      items: [
        ['Smooth Engaging Cuts', 95],
        ['Fast-Paced Reel Editing', 92],
        ['Storytelling', 90],
        ['Cinematic Editing', 88],
        ['Motion Synchronization', 85],
        ['Multi-Clip Sequencing', 90],
      ]
    },
    {
      title: '🌈 Visual Enhancement',
      items: [
        ['Color Correction', 88],
        ['Color Grading', 86],
        ['Exposure Adjustment', 84],
        ['Visual Consistency', 90],
      ]
    },
    {
      title: '🎧 Audio Editing',
      items: [
        ['Music Synchronization', 92],
        ['Beat Matching', 88],
        ['Sound Effects', 85],
        ['Audio Balancing', 87],
      ]
    },
    {
      title: '📱 Social Media Optimization',
      items: [
        ['Attention-Grabbing Hooks', 94],
        ['Retention Editing', 90],
        ['Trending Reels', 92],
        ['Platform Optimization', 89],
      ]
    },
  ];
  const skillsGrid = document.getElementById('skillsGrid');
  skillGroups.forEach((group, gi) => {
    const el = document.createElement('div');
    el.className = 'skill-card card';
    el.setAttribute('data-reveal', 'up');
    el.style.setProperty('--d', `${gi * 0.08}s`);
    el.innerHTML = `
      <h3 class="skill-card__title">${group.title}</h3>
      ${group.items.map(([name, val]) => `
        <div class="skill-bar">
          <div class="skill-bar__top"><span>${name}</span><span>${val}%</span></div>
          <div class="skill-bar__track"><div class="skill-bar__fill" data-width="${val}"></div></div>
        </div>
      `).join('')}
    `;
    skillsGrid.appendChild(el);
    revealObserver.observe(el);
  });

  const skillFills = document.querySelectorAll('.skill-bar__fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.style.width = `${entry.target.dataset.width}%`;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillFills.forEach(f => skillObserver.observe(f));

  /* ---------------- DATA: PHOTOGRAPHY GALLERY ---------------- */
  /* Replace the "img" path with your real photos in assets/images/ */
  const photos = [
    { img: 'assets/images/photshoot.jpeg', cat: 'Photoshoot',  },
    { img: 'assets/images/photoshoot1.jpeg', cat: 'Portrait',  },
    { img: 'assets/images/cg.jpeg', cat: 'colorgrading',  },
    { img: 'assets/images/edit1.jpeg', cat: 'Timeline', },
    { img: 'assets/images/edit2.jpeg', cat: 'Timeline',  },
    { img: 'assets/images/edit3.jpeg', cat: 'Timeline', },
  ];
  const gallery = document.getElementById('gallery');
  photos.forEach((p, i) => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    el.setAttribute('data-reveal', 'up');
    el.style.setProperty('--d', `${(i % 3) * 0.08}s`);
    el.innerHTML = `
      <img src="${p.img}" alt="${p.cat} photograph — ${p.loc}" loading="lazy"
           onerror="this.src='data:image/svg+xml;charset=UTF-8,${placeholderSVG(p.cat)}'">
      <div class="gallery-item__overlay">
        <span class="gallery-item__cat">${p.cat}</span>
        <span class="gallery-item__loc">${p.loc}</span>
      </div>
    `;
    el.addEventListener('click', () => openLightbox(el.querySelector('img').src, `${p.cat} — ${p.loc}`));
    gallery.appendChild(el);
    revealObserver.observe(el);
  });

  function placeholderSVG(label){
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='500' height='650'><rect width='100%' height='100%' fill='%23171923'/><text x='50%' y='50%' fill='%23B7BCC8' font-family='Manrope' font-size='22' text-anchor='middle'>${label}</text></svg>`;
    return encodeURIComponent(svg);
  }

  /* ---------------- LIGHTBOX ---------------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, caption){
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------------- DATA: INSTAGRAM REELS ---------------- */
  /* Paste real Instagram Reel URLs into the "url" field below. */
  const reels = [
    { thumb: 'assets/reels/reel1.jpeg', title: 'LOG video', desc: 'S LOG , color graded', url: 'https://www.instagram.com/reel/DZaE38ozS54/?igsh=MWpobHNleWV6YmJybg==' },
    { thumb: 'assets/reels/reel2.jpeg', title: 'PErsonal Branding ', desc: 'Branding, digital marketing', url: 'https://www.instagram.com/reel/DX4J4Ugz2sM/?igsh=MXExZ215NnQ2Z254NQ==' },
    { thumb: 'assets/reels/reel3.jpeg', title: 'Suryas_restaurant', desc: 'food reel', url: 'https://www.instagram.com/reel/DYW8MBAy6Fv/?igsh=MTVrN2ZkaHB1a2VzMg==' },
    { thumb: 'assets/reels/reel4.jpg', title: 'Trending Hook Edit', desc: 'High retention social cut', url: 'https://www.instagram.com/reel/DV5_moBCZ4f/?igsh=Ym1xNmo0NHk0Nmxo/' },
  ];
  const reelsGrid = document.getElementById('reelsGrid');
  reels.forEach((r, i) => {
    const el = document.createElement('a');
    el.className = 'reel-card';
    el.href = r.url;
    el.target = '_blank';
    el.rel = 'noopener';
    el.setAttribute('data-reveal', 'up');
    el.style.setProperty('--d', `${(i % 4) * 0.08}s`);
    el.innerHTML = `
      <div class="reel-card__thumb" style="background-image:url('${r.thumb}'), linear-gradient(160deg,#1b1e2b,#0e1017)"></div>
      <svg class="reel-card__ig" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor"/></svg>
      <div class="reel-card__play">
        <svg viewBox="0 0 24 24" fill="#fff"><path d="M7 4l14 8-14 8V4z"/></svg>
      </div>
      <div class="reel-card__overlay">
        <div class="reel-card__title">${r.title}</div>
        <div class="reel-card__desc">${r.desc}</div>
        <span class="reel-card__watch">Watch Reel →</span>
      </div>
    `;
    reelsGrid.appendChild(el);
    revealObserver.observe(el);
  });

  /* ---------------- CONTACT FORM (Name + Email) ---------------- */
  /* No backend here — this validates the fields, then hands the message
     off to Sanjai's email client via a mailto: link. Swap in a real
     form endpoint (Formspree, your own API, etc.) if you have one. */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const CONTACT_EMAIL = 'hello@sanjaikumar.com';

  if (contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('#cfName').value.trim();
      const email = contactForm.querySelector('#cfEmail').value.trim();
      const message = contactForm.querySelector('#cfMessage').value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name){
        showFormNote('Please enter your name.', 'error');
        contactForm.querySelector('#cfName').focus();
        return;
      }
      if (!email || !emailPattern.test(email)){
        showFormNote('Please enter a valid email address.', 'error');
        contactForm.querySelector('#cfEmail').focus();
        return;
      }

      const subject = encodeURIComponent(`New enquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message || '(No message provided)'}`
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

      showFormNote('Opening your email app to send this to Sanjai…', 'success');
      contactForm.reset();
    });
  }

  function showFormNote(text, type){
    formNote.textContent = text;
    formNote.classList.remove('is-success', 'is-error');
    formNote.classList.add(type === 'success' ? 'is-success' : 'is-error');
  }

  /* ---------------- TILT EFFECT (helper) ---------------- */
  function addTilt(elements){
    elements.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

  /* ---------------- BACK TO TOP ---------------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------------- FOOTER YEAR ---------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
