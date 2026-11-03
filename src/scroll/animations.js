// =============================================================
// DEADPOOL CINEMATIC SCROLL ENGINE (lets-scroll & GSAP ScrollTrigger)
// =============================================================
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// ---- Lenis smooth scroll ----
window.__lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  touchMultiplier: 1.0,
  wheelMultiplier: 0.85,
  infinite: false
});
const lenis = window.__lenis;

window.addEventListener('scroll', ScrollTrigger.update, { passive: true });
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// ---- Generate comic particles ----
function createParticles() {
  const container = document.getElementById('comic-particles');
  if (!container) return;
  const colors = ['#da2011', '#ff2a18', '#f7d117', '#f4f1ea', '#a31108'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 1;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration:${Math.random() * 15 + 10}s;
      animation-delay:${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

export function initAnimations() {
  const stageLayers = {
    home: document.querySelector('.layer-origin'),
    about: document.querySelector('.layer-blush'),
    skills: document.querySelector('.layer-katana'),
    projects: document.querySelector('.layer-heart'),
    education: document.querySelector('.layer-katana'),
    stats: document.querySelector('.layer-chimichanga'),
    contact: document.querySelector('.layer-chimichanga')
  };

  const speedlines = document.getElementById('dp-speedlines');
  const slashStreak = document.getElementById('dp-slash-streak');
  const ambientGlow = document.querySelector('.dp-ambient-glow');
  const trackerDots = document.querySelectorAll('.tracker-dot');

  // Helper to activate a specific layer
  function switchStageLayer(sectionId) {
    const activeLayer = stageLayers[sectionId];
    document.querySelectorAll('.dp-stage-layer').forEach((layer) => {
      if (layer === activeLayer) {
        layer.classList.add('active');
      } else {
        layer.classList.remove('active');
      }
    });

    // Update Tracker Dot
    trackerDots.forEach((dot) => {
      dot.classList.toggle('active', dot.dataset.target === sectionId);
    });

    // Ambient glow tint
    if (ambientGlow) {
      if (sectionId === 'skills') {
        ambientGlow.style.background =
          'radial-gradient(ellipse at 80% 70%, rgba(247,209,23,0.3) 0%, rgba(218,32,17,0.15) 45%, transparent 70%)';
      } else if (sectionId === 'projects') {
        ambientGlow.style.background =
          'radial-gradient(ellipse at 80% 70%, rgba(255,77,109,0.35) 0%, rgba(218,32,17,0.12) 45%, transparent 70%)';
      } else {
        ambientGlow.style.background =
          'radial-gradient(ellipse at 80% 70%, rgba(218,32,17,0.35) 0%, rgba(218,32,17,0.1) 45%, transparent 70%)';
      }
    }

    // Katana slash animation on skills section
    if (sectionId === 'skills' && slashStreak) {
      gsap.fromTo(
        slashStreak,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.35, ease: 'power4.out', onComplete: () => {
          gsap.to(slashStreak, { opacity: 0, duration: 0.4, delay: 0.2 });
        }}
      );
    }
  }

  // ---- Velocity-driven speedlines ----
  let velocityTimeout;
  lenis.on('scroll', (e) => {
    const vel = Math.abs(e.velocity);
    if (vel > 3 && speedlines) {
      speedlines.classList.add('active');
      clearTimeout(velocityTimeout);
      velocityTimeout = setTimeout(() => {
        speedlines.classList.remove('active');
      }, 150);
    }
  });

  // ---- Global reveal helper ([data-reveal]) ----
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    const dir = el.dataset.reveal || 'up';
    const from = {
      autoAlpha: 0,
      y: dir === 'up' ? 45 : dir === 'down' ? -45 : 0,
      x: dir === 'left' ? -50 : dir === 'right' ? 50 : 0,
      rotateX: dir === 'up' ? 8 : 0,
      skewY: dir === 'up' ? 2 : 0,
      transformOrigin: '50% 100%'
    };
    gsap.from(el, {
      ...from,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // ---- Hero entrance ----
  const heroLines = gsap.utils.toArray('.hero-line');
  if (heroLines.length) {
    gsap.from(heroLines, {
      y: 60,
      autoAlpha: 0,
      rotateX: -30,
      transformOrigin: '0% 100%',
      duration: 1,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.2
    });
  }

  // ---- Hero scroll-out parallax ----
  gsap.to('.hero-inner', {
    yPercent: -20,
    opacity: 0.2,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // ---- Stage Section Watchers for Multi-Layer Photo Switching ----
  const sections = gsap.utils.toArray('section[id]');
  const navLinks = gsap.utils.toArray('.nav-link');

  sections.forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter: () => switchStageLayer(sec.id),
      onEnterBack: () => switchStageLayer(sec.id),
      onToggle(self) {
        if (!self.isActive) return;
        const id = '#' + sec.id;
        navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === id));
      }
    });
  });

  // ---- 3D Parallax Movement for Character Layers ----
  document.querySelectorAll('.dp-stage-layer').forEach((layer) => {
    const img = layer.querySelector('.dp-stage-img');
    if (!img) return;

    gsap.to(img, {
      yPercent: -12,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2
      }
    });
  });

  // ---- Onomatopoeia action-word bursts ----
  gsap.utils.toArray('.action-word').forEach((aw) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aw,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
    tl.fromTo(
      aw,
      { scale: 0.1, rotate: -25, autoAlpha: 0, y: 35 },
      { scale: 1.05, rotate: 0, autoAlpha: 1, y: 0, duration: 0.35, ease: 'back.out(4)' }
    )
      .to(aw, { scale: 1.1, duration: 0.15, ease: 'power2.in' })
      .to(aw, { scale: 0.85, autoAlpha: 0, duration: 0.3, ease: 'power2.out', delay: 0.5 });
  });

  // ---- Project card mouse-tilt (3D) ----
  gsap.utils.toArray('.card-3d').forEach((card) => {
    const inner = card.querySelector('.card-inner');
    if (!inner) return;
    card.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(inner, {
        rotateY: px * 16,
        rotateX: -py * 16,
        transformPerspective: 900,
        duration: 0.35,
        ease: 'power2.out'
      });
    });
    card.addEventListener('pointerleave', () => {
      gsap.to(inner, {
        rotateY: 0,
        rotateX: 0,
        transformPerspective: 900,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });

  // ---- Count-up stats ----
  gsap.utils.toArray('.stat-value').forEach((el) => {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || '';
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.6,
      ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate() {
        el.textContent = Math.round(obj.v).toLocaleString('en-US') + suffix;
      }
    });
  });

  // ---- Interactive mouse parallax on stage character ----
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    const xRatio = e.clientX / window.innerWidth - 0.5;
    const yRatio = e.clientY / window.innerHeight - 0.5;

    gsap.to('.dp-stage-layer.active', {
      x: xRatio * 25,
      y: yRatio * 15,
      rotateY: xRatio * 8,
      rotateX: -yRatio * 8,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });
}
