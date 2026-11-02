// Fixed WebGL background: floating comic-ink particles + data bytes,
// a spinning wireframe centerpiece, and a camera that reacts to scroll + mouse.
import * as THREE from 'three';

export function createScene(canvas) {
  let WebGL2 = typeof WebGL2RenderingContext !== 'undefined' && canvas.getContext('webgl2');
  // if WebGL is unavailable, hide the canvas and bail — the DOM site still works.
  if (!WebGL2) {
    canvas.style.display = 'none';
    console.warn('[scene] WebGL unavailable — 3D background disabled.');
    return null;
  }

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 7;

  // --- Starfield of comic-ink dots + faint red/data sparks ---
  const COUNT = 600;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);

  const palette = [
    new THREE.Color('#ffffff'),
    new THREE.Color('#da2011'),
    new THREE.Color('#ff6b5e'),
    new THREE.Color('#f7d117'),
    new THREE.Color('#5a1010')
  ];

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 34;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    const c = palette[Math.floor(Math.pow(Math.random(), 2.2) * palette.length)];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
  });
  const stars = new THREE.Points(geo, mat);
  scene.add(stars);

  // --- Centerpiece: wireframe icosahedron + red torus knot ---
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.5, 1),
    new THREE.MeshBasicMaterial({ color: 0xda2011, wireframe: true, transparent: true, opacity: 0.35 })
  );
  scene.add(core);

  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(2.2, 0.4, 100, 12),
    new THREE.MeshBasicMaterial({ color: 0xda2011, wireframe: true, transparent: true, opacity: 0.18 })
  );
  scene.add(knot);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.7, 0.03, 12, 90),
    new THREE.MeshBasicMaterial({ color: 0xf7d117, transparent: true, opacity: 0.4 })
  );
  scene.add(ring);

  // --- Mouse parallax target (lerped) ---
  const mouse = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let scrollProgress = 0; // 0..1
  let velocity = 0;

  function onPointer(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }
  window.addEventListener('pointermove', onPointer);

  function setScroll(p, v) {
    scrollProgress = p;
    velocity = v;
  }

  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  let paused = false;
  function onVis() {
    paused = document.hidden;
  }
  document.addEventListener('visibilitychange', onVis);

  const clock = new THREE.Clock();
  let raf = 0;

  function tick() {
    raf = requestAnimationFrame(tick);
    if (paused) return;

    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    // drift particles
    stars.rotation.y += dt * 0.02;
    stars.rotation.x += dt * 0.005;

    // spin centerpiece; velocity adds "momentum spin"
    const spin = 0.25 + Math.min(Math.abs(velocity) * 6, 4);
    core.rotation.x += dt * 0.2;
    core.rotation.y += dt * (0.25 + spin * 0.05);
    knot.rotation.x += dt * 0.12;
    knot.rotation.y -= dt * (0.3 + spin * 0.06);
    ring.rotation.z += dt * 0.3;

    // gentle bob so it feels alive
    core.position.y = Math.sin(t * 0.5) * 0.15;
    knot.position.y = Math.sin(t * 0.5 + 1) * 0.15;

    // mouse parallax (smoothed)
    target.x += (mouse.x - target.x) * 0.04;
    target.y += (mouse.y - target.y) * 0.04;
    camera.position.x = target.x * 0.9;
    camera.position.y = target.y * 0.6;
    camera.lookAt(0, 0, 0);

    // scroll pulls camera back along Z
    camera.position.z = 7 + scrollProgress * 3;

    renderer.render(scene, camera);
  }

  tick();

  return {
    setScroll,
    dispose() {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      geo.dispose();
      mat.dispose();
      core.geometry.dispose();
      core.material.dispose();
      knot.geometry.dispose();
      knot.material.dispose();
      ring.geometry.dispose();
      ring.material.dispose();
      renderer.dispose();
    }
  };
}
