// =============================================================
// DEADPOOL CINEMATIC WEB RELOAD / PRELOADER ENGINE
// =============================================================
import gsap from 'gsap';

// Sound Synthesizer via Web Audio API (No external sound files required)
class DeadpoolAudioSynth {
  constructor() {
    this.ctx = null;
    this.enabled = sessionStorage.getItem('dp_sfx_enabled') !== 'false';
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    sessionStorage.setItem('dp_sfx_enabled', this.enabled ? 'true' : 'false');
    if (this.enabled) this.initContext();
    return this.enabled;
  }

  // Metallic Katana "SHING!" blade slash
  playSlash() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // High-frequency metallic sheen (Oscillator sweep)
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(3200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.28);

      oscGain.gain.setValueAtTime(0.01, now);
      oscGain.gain.linearRampToValueAtTime(0.2, now + 0.04);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

      // White noise whoosh
      const bufferSize = this.ctx.sampleRate * 0.3;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(4500, now);
      filter.frequency.exponentialRampToValueAtTime(900, now + 0.28);
      filter.Q.setValueAtTime(4.0, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, now);
      noiseGain.gain.linearRampToValueAtTime(0.25, now + 0.03);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      whiteNoise.start(now);
      whiteNoise.stop(now + 0.32);
    } catch (e) {
      // Graceful fallback if audio is blocked
    }
  }

  // Deep Sub-Bass Comic Impact Thud
  playImpact() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 0.38);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.42);
    } catch (e) {}
  }

  // Micro Tick on progress bump
  playTick() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }
}

export const dpSound = new DeadpoolAudioSynth();

// Deadpool 4th-Wall Breaking Reload Quotes
const DP_QUOTES = [
  'Hold your chimichangas... reloading awesomeness.',
  'Polishing twin katanas and deleting browser history...',
  'Breaking the 4th wall... please stand by.',
  'Calibrating maximum effort... 100% pure Canadian attitude.',
  'Wait, did Ryan Reynolds approve this AI portfolio?',
  'Sharpening pixels and compiling neural networks...',
  'Warning: Side effects may include extreme coding skills.',
  'Loading weapons, sarcasm, and red spandex...'
];

export function initLoader(onCompleteCallback) {
  const loader = document.getElementById('dp-loader');
  if (!loader) {
    if (typeof onCompleteCallback === 'function') onCompleteCallback();
    return;
  }

  const fill = document.getElementById('dp-loader-fill');
  const percentEl = document.getElementById('dp-loader-percent');
  const statusEl = document.getElementById('dp-loader-status');
  const quoteEl = document.getElementById('dp-loader-quote');
  const badgeEl = document.getElementById('dp-loader-badge');
  const slashEl = document.getElementById('dp-loader-slash');
  const curtainTop = document.querySelector('.dp-loader-curtain-top');
  const curtainBottom = document.querySelector('.dp-loader-curtain-bottom');
  const skipBtn = document.getElementById('dp-loader-skip');
  const soundBtn = document.getElementById('dp-loader-sound');
  const emblem = document.querySelector('.dp-loader-emblem');
  const content = document.querySelector('.dp-loader-content');

  let isDismissed = false;
  let quoteIndex = 0;
  let quoteInterval = null;
  let activeTimeline = null;

  // Sound Button UI update
  function updateSoundButton() {
    if (!soundBtn) return;
    soundBtn.innerHTML = dpSound.enabled
      ? '<span class="sound-icon">🔊</span> SFX: ON'
      : '<span class="sound-icon">🔇</span> SFX: OFF';
  }
  updateSoundButton();

  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dpSound.toggle();
      updateSoundButton();
      if (dpSound.enabled) dpSound.playTick();
    });
  }

  // Quote Rotator
  function rotateQuote() {
    if (!quoteEl || isDismissed) return;
    quoteIndex = (quoteIndex + 1) % DP_QUOTES.length;
    quoteEl.classList.add('fading');
    setTimeout(() => {
      quoteEl.textContent = DP_QUOTES[quoteIndex];
      quoteEl.classList.remove('fading');
    }, 250);
  }

  // Interactive Emblem Tilt on Mouse Move
  if (emblem) {
    const onMouseMove = (e) => {
      const rect = emblem.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      gsap.to(emblem, {
        rotateY: x * 22,
        rotateX: -y * 22,
        duration: 0.25,
        ease: 'power1.out'
      });
    };
    const onMouseLeave = () => {
      gsap.to(emblem, { rotateY: 0, rotateX: 0, duration: 0.4, ease: 'power2.out' });
    };
    loader.addEventListener('mousemove', onMouseMove);
    loader.addEventListener('mouseleave', onMouseLeave);

    // Clicking emblem gives a playful heartbeat bounce
    emblem.addEventListener('click', () => {
      dpSound.playSlash();
      gsap.fromTo(
        emblem,
        { scale: 0.88, rotate: -6 },
        { scale: 1.15, rotate: 6, duration: 0.35, ease: 'back.out(3)', onComplete: () => {
          gsap.to(emblem, { scale: 1, rotate: 0, duration: 0.25 });
        }}
      );
    });
  }

  // Complete & Dismiss Sequence
  function dismissLoader(immediate = false) {
    if (isDismissed) return;
    isDismissed = true;
    if (quoteInterval) clearInterval(quoteInterval);
    if (activeTimeline) activeTimeline.kill();

    if (immediate) {
      loader.classList.add('dp-loader-done');
      if (typeof onCompleteCallback === 'function') onCompleteCallback();
      return;
    }

    // Set 100% display
    if (percentEl) percentEl.textContent = '100%';
    if (fill) fill.style.width = '100%';
    if (statusEl) statusEl.textContent = 'STATUS: MAXIMUM EFFORT REACHED!';
    if (badgeEl) badgeEl.textContent = 'KABOOM! READY!';

    // Epic Katana double-slash and curtain split
    dpSound.playSlash();
    dpSound.playImpact();

    const exitTl = gsap.timeline({
      onComplete: () => {
        loader.classList.add('dp-loader-done');
        if (typeof onCompleteCallback === 'function') onCompleteCallback();
      }
    });

    // 1. Blade Slash flash across screen
    if (slashEl) {
      exitTl.fromTo(
        slashEl,
        { scaleX: 0, opacity: 0, rotate: -25 },
        { scaleX: 1, opacity: 1, duration: 0.22, ease: 'power4.inOut' }
      );
    }

    // 2. Violent screen shake & content zoom
    if (content) {
      exitTl.to(content, {
        scale: 1.1,
        y: -15,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.in'
      }, '-=0.1');
    }

    // 3. Katana Split: Top half slides UP, Bottom half slides DOWN
    if (curtainTop && curtainBottom) {
      exitTl.to(curtainTop, {
        yPercent: -102,
        duration: 0.75,
        ease: 'power4.inOut'
      }, '-=0.2');

      exitTl.to(curtainBottom, {
        yPercent: 102,
        duration: 0.75,
        ease: 'power4.inOut'
      }, '<');
    }

    // 4. Overall loader fade
    exitTl.to(loader, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out'
    }, '-=0.3');
  }

  // Skip button handler
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissLoader(true);
    });
  }

  // Keyboard shortcut: [ESC] to skip
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      dismissLoader(true);
    }
  };
  window.addEventListener('keydown', handleKeydown);

  // Start Animation Sequence
  const progressObj = { value: 0 };
  quoteInterval = setInterval(rotateQuote, 1400);

  activeTimeline = gsap.timeline({
    onComplete: () => {
      setTimeout(() => dismissLoader(false), 250);
    }
  });

  // Emblem Entry Pop
  if (content) {
    activeTimeline.fromTo(
      content,
      { scale: 0.85, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(2)' }
    );
  }

  // Smooth Counter 0% -> 100%
  activeTimeline.to(progressObj, {
    value: 100,
    duration: 2.2,
    ease: 'power1.inOut',
    onUpdate: () => {
      const rounded = Math.floor(progressObj.value);
      if (percentEl) percentEl.textContent = `${rounded}%`;
      if (fill) fill.style.width = `${rounded}%`;

      // Tick sound every ~20%
      if (rounded % 20 === 0 && rounded > 0 && rounded < 100) {
        dpSound.playTick();
      }

      if (rounded > 75 && statusEl) {
        statusEl.textContent = 'STATUS: UNLEASHING PORTFOLIO...';
      } else if (rounded > 40 && statusEl) {
        statusEl.textContent = 'STATUS: COMPILING MAXIMUM EFFORT...';
      }
    }
  });

  // Expose Replay function globally
  window.replayDeadpoolReload = function () {
    isDismissed = false;
    loader.classList.remove('dp-loader-done');
    loader.style.opacity = '1';
    loader.style.visibility = 'visible';

    if (curtainTop) gsap.set(curtainTop, { yPercent: 0 });
    if (curtainBottom) gsap.set(curtainBottom, { yPercent: 0 });
    if (content) gsap.set(content, { scale: 1, y: 0, opacity: 1 });
    if (slashEl) gsap.set(slashEl, { scaleX: 0, opacity: 0 });
    if (badgeEl) badgeEl.textContent = 'MAXIMUM EFFORT';

    progressObj.value = 0;
    if (fill) fill.style.width = '0%';
    if (percentEl) percentEl.textContent = '0%';
    if (statusEl) statusEl.textContent = 'RELOAD STATUS: CALIBRATING...';

    dpSound.playSlash();
    if (quoteInterval) clearInterval(quoteInterval);
    quoteInterval = setInterval(rotateQuote, 1400);

    activeTimeline = gsap.timeline({
      onComplete: () => {
        setTimeout(() => dismissLoader(false), 250);
      }
    });

    activeTimeline.to(progressObj, {
      value: 100,
      duration: 1.8,
      ease: 'power1.inOut',
      onUpdate: () => {
        const rounded = Math.floor(progressObj.value);
        if (percentEl) percentEl.textContent = `${rounded}%`;
        if (fill) fill.style.width = `${rounded}%`;
        if (rounded % 25 === 0 && rounded > 0 && rounded < 100) {
          dpSound.playTick();
        }
      }
    });
  };

  // Keyboard shortcut: Press 'R' to replay reload animation anytime!
  window.addEventListener('keydown', (e) => {
    if ((e.key === 'r' || e.key === 'R') && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
      window.replayDeadpoolReload();
    }
  });

  // Hook into brand logo click in topbar
  const brandLink = document.querySelector('.brand');
  if (brandLink) {
    brandLink.addEventListener('click', (e) => {
      // Replay animation if clicked
      if (window.scrollY < 100) {
        e.preventDefault();
        window.replayDeadpoolReload();
      }
    });
  }
}
