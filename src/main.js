// Force scroll restoration to manual and pin to top on load & reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

import gsap from 'gsap';
import { initAnimations } from './scroll/animations.js';
import { initLoader } from './scroll/loader.js';
import {
  profile,
  about,
  skillGroups,
  featuredProjects,
  otherProjects,
  education,
  certification,
  stats,
  captions,
  comicReel,
  actionWords
} from './data.js';

// ---- Hero ----
const hero = document.querySelector('.hero');
hero.querySelector('.name').textContent = profile.name;
hero.querySelector('.titles').textContent = profile.headline;
hero.querySelector('.tagline').textContent = profile.tagline;
hero.querySelector('.bio').textContent = profile.shortBio;
hero.querySelector('.location').textContent = '📍 ' + profile.location;

const ctas = hero.querySelector('.hero-ctas');
const ctaList = [
  { label: 'View Projects', href: '#projects', cls: 'btn btn-red' },
  { label: 'GitHub', href: profile.github, cls: 'btn btn-dark', external: true },
  { label: 'LinkedIn', href: profile.linkedin, cls: 'btn btn-outline', external: true },
  { label: 'Email Me', href: 'mailto:' + profile.email, cls: 'btn btn-outline' }
];
ctas.innerHTML = '';
ctaList.forEach((c) => {
  const a = document.createElement('a');
  a.className = c.cls + ' btn-wrap';
  a.textContent = c.label;
  a.href = c.href;
  if (c.external) a.target = '_blank';
  if (c.external) a.rel = 'noopener';
  ctas.appendChild(a);
});

// ---- About ----
const aboutSec = document.querySelector('#about');
aboutSec.querySelector('.bubble-text').textContent = captions[0];
aboutSec.querySelector('.body-text').textContent = about.body;

const focusRow = aboutSec.querySelector('.focus');
focusRow.innerHTML = '';
about.focus.forEach((f) => {
  const chip = document.createElement('span');
  chip.className = 'chip';
  chip.textContent = f;
  focusRow.appendChild(chip);
});

const strengthsRow = aboutSec.querySelector('.strengths');
strengthsRow.innerHTML = '';
about.strengths.forEach((s) => {
  const chip = document.createElement('span');
  chip.className = 'chip chip-red';
  chip.textContent = s;
  strengthsRow.appendChild(chip);
});

// ---- Skills ----
const skillsSec = document.querySelector('#skills');
const track = skillsSec.querySelector('.marquee-track');
const marqueeItems = skillGroups.flatMap((g) => g.items);
track.innerHTML = marqueeItems
  .concat(marqueeItems)
  .map((s) => `<span class="marquee-item">${s}</span>`)
  .join('');

const skillGrid = skillsSec.querySelector('.skill-grid');
skillGrid.innerHTML = '';
skillGroups.forEach((group) => {
  const block = document.createElement('div');
  block.className = 'skill-block';
  block.setAttribute('data-reveal', '');
  const h = document.createElement('h3');
  h.className = 'skill-group-title';
  h.textContent = group.title;
  const inner = document.createElement('div');
  inner.className = 'skill-group';
  group.items.forEach((it) => {
    const span = document.createElement('span');
    span.className = 'skill-tag';
    span.textContent = it;
    inner.appendChild(span);
  });
  block.appendChild(h);
  block.appendChild(inner);
  skillGrid.appendChild(block);
});

// ---- Projects ----
const projectsSec = document.querySelector('#projects');
projectsSec.querySelector('.bubble-text').textContent = captions[2];

const grid = projectsSec.querySelector('.projects-grid');
grid.innerHTML = '';
featuredProjects.forEach((p) => {
  const card = document.createElement('article');
  card.className = 'card-3d';
  card.setAttribute('data-reveal', '');

  const inner = document.createElement('div');
  inner.className = 'card-inner';

  const header = document.createElement('div');
  header.className = 'card-num';
  header.textContent = p.n;

  const cat = document.createElement('span');
  cat.className = 'chip chip-yellow';
  cat.textContent = p.category;

  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = p.title;

  const tech = document.createElement('div');
  tech.className = 'card-tech';
  p.tech.slice(0, 6).forEach((t) => {
    const s = document.createElement('span');
    s.className = 'tech-tag';
    s.textContent = t;
    tech.appendChild(s);
  });

  const desc = document.createElement('p');
  desc.className = 'card-body';
  desc.textContent = p.description;

  const feats = document.createElement('ul');
  feats.className = 'card-feats';
  p.features.slice(0, 4).forEach((f) => {
    const li = document.createElement('li');
    li.textContent = f;
    feats.appendChild(li);
  });

  const actions = document.createElement('div');
  actions.className = 'card-actions';

  const link = document.createElement('a');
  link.className = 'btn btn-dark btn-wrap card-link';
  link.textContent = 'View on GitHub ↗';
  link.href = p.url;
  link.target = '_blank';
  link.rel = 'noopener';
  actions.appendChild(link);

  if (p.liveUrl) {
    const liveLink = document.createElement('a');
    liveLink.className = 'btn btn-red btn-wrap card-link card-link-live';
    liveLink.textContent = 'Live Demo ↗';
    liveLink.href = p.liveUrl;
    liveLink.target = '_blank';
    liveLink.rel = 'noopener';
    actions.appendChild(liveLink);
  }

  inner.append(header, cat, title, tech, desc, feats, actions);
  card.appendChild(inner);
  grid.appendChild(card);
});

const otherRow = projectsSec.querySelector('.other');
otherRow.innerHTML = '';
otherProjects.forEach((p) => {
  const chip = document.createElement('span');
  chip.className = 'chip chip-other';
  chip.textContent = p;
  otherRow.appendChild(chip);
});

// ---- Education + Certification ----
const eduSec = document.querySelector('#education');
const timeline = eduSec.querySelector('.timeline');
timeline.innerHTML = '';
education.forEach((e) => {
  const card = document.createElement('div');
  card.className = 'edu-card';
  card.setAttribute('data-reveal', '');
  card.innerHTML = `
    <span class="edu-type">${e.type}</span>
    <h3 class="edu-title">${e.title}</h3>
    <p class="edu-org">${e.org}</p>
    <p class="edu-period">${e.period} · ${e.detail}</p>
  `;
  timeline.appendChild(card);
});

const certCard = eduSec.querySelector('.cert-card');
certCard.innerHTML = `
  <span class="edu-type">Certification</span>
  <h3 class="edu-title">${certification.title}</h3>
  <p class="edu-org">${certification.org}</p>
  <p class="edu-period">${certification.period}</p>
`;

// ---- Stats ----
const statsPanel = document.querySelector('.stats-panel');
statsPanel.innerHTML = '';
stats.forEach((s) => {
  const stat = document.createElement('div');
  stat.className = 'stat';
  const val = document.createElement('span');
  val.className = 'stat-value';
  val.dataset.count = s.value;
  val.dataset.suffix = s.suffix;
  val.textContent = '0' + s.suffix;
  const label = document.createElement('span');
  label.className = 'stat-label';
  label.textContent = s.label;
  stat.append(val, label);
  statsPanel.appendChild(stat);
});

// ---- Contact ----
const contactSec = document.querySelector('#contact');
contactSec.querySelector('.bubble-text').textContent = captions[3];

const map = {
  email: ['mailto:' + profile.email, profile.email],
  phone: ['tel:' + profile.phone.replace(/\s+/g, ''), profile.phone],
  github: [profile.github, '@' + profile.githubHandle],
  linkedin: [profile.linkedin, 'Paresh Prajapati']
};
contactSec.querySelectorAll('.contact-card').forEach((card) => {
  const field = card.dataset.field;
  const [href, val] = map[field];
  card.href = href;
  card.querySelector('.contact-value').textContent = val;
});
contactSec.querySelector('.location-line').textContent = '📍 ' + profile.location + ' — open to AI/ML, Data Science & Data Analytics roles.';
contactSec.querySelector('.footer-text').textContent =
  `© ${new Date().getFullYear()} ${profile.name} · Built with lets-scroll engine & maximum effort.`;

// ---- Action words ----
const placed = ['.aw-hero', '.aw-skills', '.aw-projects', '.aw-edu'];
placed.forEach((sel, i) => {
  const el = document.querySelector(sel);
  if (el) el.textContent = actionWords[(i + 1) % actionWords.length];
});

// ---- Mobile Navigation Toggle & Smooth Scrolling ----
const navToggle = document.getElementById('dp-nav-toggle');
const topbarNav = document.getElementById('topbar-nav');

function toggleMobileNav(force) {
  if (!topbarNav || !navToggle) return;
  const shouldOpen = force !== undefined ? force : !topbarNav.classList.contains('open');
  topbarNav.classList.toggle('open', shouldOpen);
  navToggle.classList.toggle('open', shouldOpen);
  navToggle.setAttribute('aria-expanded', String(shouldOpen));
}

if (navToggle) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileNav();
  });
}

// Nav link smooth scroll & auto close mobile menu
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetEl = document.querySelector(href);
      if (targetEl) {
        e.preventDefault();
        toggleMobileNav(false);
        if (window.__lenis) {
          window.__lenis.scrollTo(targetEl, { offset: -10, duration: 1.1 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  });
});

// Close mobile menu on outside tap
document.addEventListener('click', (e) => {
  if (topbarNav && topbarNav.classList.contains('open')) {
    if (!topbarNav.contains(e.target) && !navToggle.contains(e.target)) {
      toggleMobileNav(false);
    }
  }
});

// ---- Tracker Dot Smooth Navigation ----
document.querySelectorAll('.tracker-dot').forEach((dot) => {
  dot.addEventListener('click', () => {
    const target = dot.dataset.target;
    const targetEl = document.getElementById(target);
    if (targetEl) {
      if (window.__lenis) {
        window.__lenis.scrollTo(targetEl, { offset: -10, duration: 1.1 });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ---- Boot animations with Deadpool cinematic loader ----
let animationsInitialized = false;
initLoader(() => {
  window.scrollTo(0, 0);
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { immediate: true });
  }
  if (!animationsInitialized) {
    animationsInitialized = true;
    requestAnimationFrame(() => initAnimations());
  } else if (window.scrollY < 200) {
    // Replay hero entrance if replayed near top
    gsap.fromTo(
      '.hero-line',
      { y: 50, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }
});
