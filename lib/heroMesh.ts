// Norton-Gauss · Three.js neural-mesh hero centerpiece
// Ported from src/hero-mesh.js — now a real ES module importing `three`
// instead of reading window.THREE from a CDN. A distorted icosahedron driven
// by simplex-noise displacement. Drag to rotate. Scroll deepens distortion.
import * as THREE from "three";

type MeshOpts = {
  decorative?: boolean;
  fov?: number;
  cameraZ?: number;
  meshScale?: number;
};

const hexToVec = (h: string) => {
  const n = parseInt(h.slice(1), 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
};
const LIME = hexToVec("#D9FF35");
const DEEP = hexToVec("#0a1916");

// ─── GLSL ────────────────────────────────────────────────────
// Classic Ashima 3D simplex noise
const NOISE_GLSL = `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

// Solid surface — fresnel rim, dark interior, lime emission on crests
const SURFACE_VERT = `
  uniform float uTime;
  uniform float uAmp;
  uniform float uFreq;
  uniform float uScroll;
  uniform float uPulse;
  varying vec3 vNormal;
  varying float vDisp;
  varying vec3 vPos;
  ${NOISE_GLSL}
  void main(){
    float n  = snoise(position * uFreq + vec3(uTime * 0.18, uTime * 0.21, -uTime * 0.15));
    float n2 = snoise(position * (uFreq * 2.4) - vec3(uTime * 0.12));
    float n3 = snoise(position * (uFreq * 5.0) + vec3(uTime * 0.40));
    float d = n * 0.55 + n2 * 0.30 + n3 * 0.10;
    d *= (uAmp + uScroll * 0.55 + uPulse * 0.25);
    vec3 displaced = position + normal * d;
    vDisp = d;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    vPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const SURFACE_FRAG = `
  uniform vec3 uColor;
  uniform vec3 uDeep;
  uniform float uTime;
  varying vec3 vNormal;
  varying float vDisp;
  varying vec3 vPos;
  void main(){
    vec3 N = normalize(vNormal);
    vec3 V = normalize(-vPos);
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.6);
    float crest = smoothstep(-0.05, 0.55, vDisp);
    vec3 col = mix(uDeep, uColor * 0.55, fres);
    col += uColor * crest * 0.45;
    col += uDeep * 0.6 * (1.0 - fres);
    float a = fres * 0.6 + crest * 0.65;
    a = clamp(a, 0.0, 0.9);
    gl_FragColor = vec4(col, a);
  }
`;

const WIRE_VERT = SURFACE_VERT;
const WIRE_FRAG = `
  uniform vec3 uColor;
  uniform float uTime;
  varying float vDisp;
  varying vec3 vNormal;
  varying vec3 vPos;
  void main(){
    vec3 N = normalize(vNormal);
    vec3 V = normalize(-vPos);
    float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 1.6);
    float a = 0.18 + fres * 0.45 + smoothstep(0.0, 0.55, vDisp) * 0.35;
    gl_FragColor = vec4(uColor, a);
  }
`;

const PART_VERT = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uScroll;
  varying float vAlpha;
  void main(){
    vec3 p = position;
    float t = uTime * 0.12 + aPhase;
    p.x += sin(t) * 0.04;
    p.y += cos(t * 1.3) * 0.04;
    p.z += sin(t * 0.7) * 0.04;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (1.6 + uScroll * 0.6) * (300.0 / -mv.z);
    vAlpha = 0.5 + 0.5 * sin(uTime * 0.6 + aPhase * 3.0);
  }
`;
const PART_FRAG = `
  uniform vec3 uColor;
  varying float vAlpha;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * vAlpha * 0.9;
    gl_FragColor = vec4(uColor, a);
  }
`;

// ─── Mount ──────────────────────────────────────────────────
export function mountHeroMesh(container: HTMLElement, opts: MeshOpts = {}): () => void {
  if (!container) return () => {};

  const decorative = !!opts.decorative;
  const fov = opts.fov || (decorative ? 36 : 38);
  const camZ = opts.cameraZ || (decorative ? 5.1 : 4.6);
  const meshScale = opts.meshScale || (decorative ? 0.78 : 1);
  const autoY = decorative ? 0.1 : 0.18;
  const ampBase = decorative ? 0.12 : 0.18;

  let W = container.clientWidth || 800;
  let H = container.clientHeight || 800;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setSize(W, H, false);
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";
  renderer.domElement.style.cursor = decorative ? "default" : "grab";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, W / H, 0.1, 50);
  camera.position.set(0, 0, camZ);

  // ── Mesh ─────────────────────────────────────────────────
  const geo = new THREE.IcosahedronGeometry(1.15, 64);
  const surfaceUniforms = {
    uTime: { value: 0 },
    uAmp: { value: ampBase },
    uFreq: { value: 1.35 },
    uScroll: { value: 0 },
    uPulse: { value: 0 },
    uColor: { value: new THREE.Color(LIME.r, LIME.g, LIME.b) },
    uDeep: { value: new THREE.Color(DEEP.r, DEEP.g, DEEP.b) },
  };
  const surfaceMat = new THREE.ShaderMaterial({
    vertexShader: SURFACE_VERT,
    fragmentShader: SURFACE_FRAG,
    uniforms: surfaceUniforms,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, surfaceMat);
  mesh.scale.setScalar(meshScale);
  scene.add(mesh);

  // Wireframe shell (slightly larger, additive blend) — shares core uniforms
  const wireGeo = new THREE.IcosahedronGeometry(1.18, 48);
  const wireUniforms = {
    uTime: surfaceUniforms.uTime,
    uAmp: surfaceUniforms.uAmp,
    uFreq: surfaceUniforms.uFreq,
    uScroll: surfaceUniforms.uScroll,
    uPulse: surfaceUniforms.uPulse,
    uColor: { value: new THREE.Color(LIME.r, LIME.g, LIME.b) },
  };
  const wireMat = new THREE.ShaderMaterial({
    vertexShader: WIRE_VERT,
    fragmentShader: WIRE_FRAG,
    uniforms: wireUniforms,
    wireframe: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const wire = new THREE.Mesh(wireGeo, wireMat);
  wire.scale.setScalar(meshScale);
  scene.add(wire);

  // Inner core — small bright sphere for a glow seed
  const coreMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(LIME.r, LIME.g, LIME.b),
    transparent: true,
    opacity: 0.08,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), coreMat);
  core.scale.setScalar(meshScale);
  scene.add(core);

  // ── Particle field ───────────────────────────────────────
  const PCOUNT = 220;
  const pPositions = new Float32Array(PCOUNT * 3);
  const pSizes = new Float32Array(PCOUNT);
  const pPhase = new Float32Array(PCOUNT);
  for (let i = 0; i < PCOUNT; i++) {
    const r = 1.9 + Math.random() * 1.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pPositions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
    pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pPositions[i * 3 + 2] = r * Math.cos(phi);
    pSizes[i] = 0.5 + Math.random() * 1.6;
    pPhase[i] = Math.random() * 6.28;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
  pGeo.setAttribute("aSize", new THREE.BufferAttribute(pSizes, 1));
  pGeo.setAttribute("aPhase", new THREE.BufferAttribute(pPhase, 1));
  const pMat = new THREE.ShaderMaterial({
    vertexShader: PART_VERT,
    fragmentShader: PART_FRAG,
    uniforms: {
      uTime: surfaceUniforms.uTime,
      uScroll: surfaceUniforms.uScroll,
      uColor: { value: new THREE.Color(LIME.r, LIME.g, LIME.b) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  // ── Drag interaction ─────────────────────────────────────
  const rot = { x: -0.2, y: 0.4 };
  const target = { x: -0.2, y: 0.4 };
  const auto = { y: autoY };
  let dragging = false;
  let lastPx = 0,
    lastPy = 0;

  function onDown(e: MouseEvent | TouchEvent) {
    if (decorative) return;
    dragging = true;
    renderer.domElement.style.cursor = "grabbing";
    const t = "touches" in e ? e.touches[0] : e;
    lastPx = t.clientX;
    lastPy = t.clientY;
    surfaceUniforms.uPulse.value = Math.max(surfaceUniforms.uPulse.value, 0.6);
  }
  function onMove(e: MouseEvent | TouchEvent) {
    if (!dragging) return;
    const t = "touches" in e ? e.touches[0] : e;
    const dx = t.clientX - lastPx;
    const dy = t.clientY - lastPy;
    lastPx = t.clientX;
    lastPy = t.clientY;
    target.y += dx * 0.0065;
    target.x += dy * 0.0065;
    target.x = Math.max(-1.2, Math.min(1.2, target.x));
  }
  function onUp() {
    if (!dragging) return;
    dragging = false;
    renderer.domElement.style.cursor = "grab";
  }
  function onEnter() {
    if (!decorative) surfaceUniforms.uPulse.value = Math.max(surfaceUniforms.uPulse.value, 0.25);
  }

  if (!decorative) {
    renderer.domElement.addEventListener("mousedown", onDown);
    renderer.domElement.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    renderer.domElement.addEventListener("mouseenter", onEnter);
  } else {
    renderer.domElement.style.pointerEvents = "none";
  }

  // ── Scroll → uScroll (hero section only) ────────────────
  function onScroll() {
    if (decorative) return;
    const heroEl = document.querySelector(".hero");
    if (!heroEl) return;
    const rect = heroEl.getBoundingClientRect();
    const h = rect.height || 1;
    const p = Math.max(0, Math.min(1, -rect.top / h));
    const s = p * p * (3 - 2 * p);
    surfaceUniforms.uScroll.value = s;
    const ms = meshScale;
    mesh.scale.setScalar(ms * (1 - s * 0.18));
    wire.scale.setScalar(ms * (1 - s * 0.18));
    core.scale.setScalar(ms * (1 - s * 0.25));
    mesh.position.y = wire.position.y = core.position.y = s * 0.6;
    (particles.material as THREE.ShaderMaterial).opacity = 1 - s * 0.6;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ── Resize ──────────────────────────────────────────────
  function onResize() {
    W = container.clientWidth || 800;
    H = container.clientHeight || 800;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(onResize);
  ro.observe(container);
  window.addEventListener("resize", onResize);

  // ── Render loop ─────────────────────────────────────────
  let raf = 0;
  let last = performance.now();
  let running = true;
  const startTime = performance.now();

  function loop() {
    if (!running) return;
    const now = performance.now();
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    surfaceUniforms.uTime.value = (now - startTime) / 1000;
    if (!dragging) target.y += auto.y * dt;
    rot.x += (target.x - rot.x) * Math.min(1, dt * 4.5);
    rot.y += (target.y - rot.y) * Math.min(1, dt * 4.5);
    mesh.rotation.x = rot.x;
    mesh.rotation.y = rot.y;
    wire.rotation.x = rot.x;
    wire.rotation.y = rot.y;
    core.rotation.x = rot.x * 0.5;
    core.rotation.y = rot.y * 0.5;
    particles.rotation.y += dt * 0.04;

    surfaceUniforms.uPulse.value *= Math.pow(0.04, dt);

    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  }
  loop();

  // Pause when tab hidden
  function onVis() {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(raf);
    } else if (!running) {
      running = true;
      last = performance.now();
      loop();
    }
  }
  document.addEventListener("visibilitychange", onVis);

  // ── Dispose ─────────────────────────────────────────────
  return function dispose() {
    running = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    window.removeEventListener("resize", onResize);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
    window.removeEventListener("touchmove", onMove);
    window.removeEventListener("touchend", onUp);
    document.removeEventListener("visibilitychange", onVis);
    renderer.domElement.remove();
    renderer.dispose();
    geo.dispose();
    wireGeo.dispose();
    pGeo.dispose();
    surfaceMat.dispose();
    wireMat.dispose();
    pMat.dispose();
    coreMat.dispose();
  };
}
