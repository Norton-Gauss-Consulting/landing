"use client";

// Norton-Gauss · global motion layer
// One client-side pass that ports the handoff's motion JS:
//   · animations.js  — section/grid scroll reveals
//   · motion-v3.js   — Lenis smooth scroll, hero H1 scramble, magnetic CTAs,
//                      custom cursor, hero parallax, word-split reveals,
//                      framework scroll-scrub, marquee accelerate, final-CTA orb
//   · motion-v4.js   — manifesto banner, compounding curve head, practices
//                      spotlight, impact count-up, cases 3D tilt, thesis
//                      connector, roadmap beam, world-map beads
//
// All setups are idempotent (data-ng-* flags) and re-run on route change.
// Skipped entirely under prefers-reduced-motion, leaving static content visible.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const SCRAMBLE_GLYPHS = "!<>-_\\/[]{}—=+*^?#§$%&AGNTRX◆◇•·";
const NS = "http://www.w3.org/2000/svg";

let lenisStarted = false;
let cursorStarted = false;

export default function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    // Created once for the session.
    setupLenis();
    setupCustomCursor();

    // Re-runnable per route (idempotent via data flags).
    const run = () => {
      setupSectionAnimations();
      setupScramble();
      setupMagnetic();
      setupHeroParallax();
      setupSectionReveals();
      setupFrameworkScrub();
      setupMarqueeAccelerate();
      setupFinalCTAOrb();
      setupManifestoBanner();
      setupCompoundingCurve();
      setupPracticesList();
      setupImpactCountUp();
      setupCasesTilt();
      setupThesisConnector();
      setupRoadmapBeam();
      setupWorldMapBeams();
      ScrollTrigger.refresh();
    };

    const t = window.setTimeout(run, 350);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}

// ─── Lenis smooth scroll, synced to GSAP ticker ──────────────────
function setupLenis() {
  if (lenisStarted) return;
  lenisStarted = true;
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.4,
  });
  (window as unknown as { __ngLenis?: Lenis }).__ngLenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time: number) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Smooth-scroll same-page anchors through Lenis.
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target as HTMLElement, { offset: -80 });
  });
}

// ─── Hero H1 scramble (cryptic → resolved) ───────────────────────
function setupScramble() {
  const h1 = document.querySelector(".hero-h1") as HTMLElement | null;
  if (!h1 || h1.dataset.ngScrambled) return;
  h1.dataset.ngScrambled = "1";

  const charSpans: HTMLElement[] = [];
  function wrapTextNodes(node: Node) {
    Array.from(node.childNodes).forEach((k) => {
      if (k.nodeType === 3) {
        const text = k.nodeValue || "";
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        for (const ch of text) {
          if (ch === " ") { frag.appendChild(document.createTextNode(" ")); continue; }
          const sp = document.createElement("span");
          sp.className = "ng-char";
          sp.textContent = ch;
          frag.appendChild(sp);
          charSpans.push(sp);
        }
        k.parentNode!.replaceChild(frag, k);
      } else if (k.nodeType === 1) {
        wrapTextNodes(k);
      }
    });
  }
  wrapTextNodes(h1);

  charSpans.forEach((sp) => {
    sp.dataset.target = sp.textContent || "";
    sp.textContent = SCRAMBLE_GLYPHS[(Math.random() * SCRAMBLE_GLYPHS.length) | 0];
    sp.style.opacity = "0.25";
  });

  function resolveAll() {
    charSpans.forEach((sp, i) => {
      const delay = 250 + i * 28;
      const target = sp.dataset.target || "";
      const cycles = 6 + Math.floor(Math.random() * 4);
      let n = 0;
      sp.style.transition = "opacity 0.35s ease-out";
      setTimeout(() => { sp.style.opacity = "1"; }, delay);
      const interval = setInterval(() => {
        if (n >= cycles) { sp.textContent = target; clearInterval(interval); return; }
        sp.textContent = SCRAMBLE_GLYPHS[(Math.random() * SCRAMBLE_GLYPHS.length) | 0];
        n++;
      }, 40 + Math.random() * 30);
      setTimeout(() => clearInterval(interval), delay + cycles * 55);
      setTimeout(() => { sp.textContent = target; }, delay + cycles * 55 + 40);
    });
  }
  setTimeout(resolveAll, 250);

  charSpans.forEach((sp) => {
    sp.addEventListener("mouseenter", () => {
      const span = sp as HTMLElement & { _scr?: ReturnType<typeof setInterval> | null };
      if (span._scr) return;
      const target = sp.dataset.target || "";
      let n = 0;
      span._scr = setInterval(() => {
        if (n >= 4) { sp.textContent = target; clearInterval(span._scr!); span._scr = null; return; }
        sp.textContent = SCRAMBLE_GLYPHS[(Math.random() * SCRAMBLE_GLYPHS.length) | 0];
        n++;
      }, 50);
    });
  });
}

// ─── Magnetic hover on CTAs ──────────────────────────────────────
function setupMagnetic() {
  document.querySelectorAll<HTMLElement>(".btn, .nav-actions a, .case-secondary .read").forEach((el) => {
    if (el.dataset.ngMag) return;
    el.dataset.ngMag = "1";
    el.style.willChange = "transform";
    el.classList.add("ng-magnetic");
    const STRENGTH = 0.32;
    const RANGE = 80;
    let raf = 0;
    let tx = 0, ty = 0;
    function leave() {
      const start = performance.now();
      const sx = tx, sy = ty;
      cancelAnimationFrame(raf);
      const dur = 380;
      function stepFn() {
        const p = Math.min(1, (performance.now() - start) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        tx = sx * (1 - e); ty = sy * (1 - e);
        el.style.transform = `translate(${tx}px, ${ty}px)`;
        if (p < 1) raf = requestAnimationFrame(stepFn);
      }
      stepFn();
    }
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      if (Math.hypot(dx, dy) > RANGE * 1.5) return;
      tx = dx * STRENGTH; ty = dy * STRENGTH;
      el.style.transform = `translate(${tx}px, ${ty}px)`;
    });
    el.addEventListener("mouseleave", leave);
  });
}

// ─── Custom cursor (dot + ring) ──────────────────────────────────
function setupCustomCursor() {
  if (cursorStarted) return;
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
  cursorStarted = true;
  const dot = document.createElement("div"); dot.className = "ng-cursor ng-cursor-dot";
  const ring = document.createElement("div"); ring.className = "ng-cursor ng-cursor-ring";
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  let dx = -100, dy = -100, rx = -100, ry = -100, tx = -100, ty = -100;
  window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  function tick() {
    dx += (tx - dx) * 0.55; dy += (ty - dy) * 0.55;
    rx += (tx - rx) * 0.16; ry += (ty - ry) * 0.16;
    dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }
  tick();
  const hoverables = "a, button, .btn, .prac-row, .case-secondary, .fw-cell, [data-cursor]";
  document.addEventListener("mouseover", (e) => {
    if ((e.target as HTMLElement).closest(hoverables)) ring.classList.add("on");
    const overCanvas = !!(e.target as HTMLElement).closest(".hero-mesh-host canvas");
    dot.style.opacity = overCanvas ? "0" : "1";
    ring.style.opacity = overCanvas ? "0" : "1";
  });
  document.addEventListener("mouseout", (e) => {
    if ((e.target as HTMLElement).closest(hoverables)) ring.classList.remove("on");
  });
}

// ─── Hero parallax ───────────────────────────────────────────────
function setupHeroParallax() {
  const hero = document.querySelector(".hero");
  if (!hero || (hero as HTMLElement).dataset.ngParallax) return;
  (hero as HTMLElement).dataset.ngParallax = "1";
  gsap.to(".hero-l", { y: -60, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero-r", { y: -120, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".hero-l", { opacity: 0.05, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom 30%", scrub: true } });
}

// ─── Section reveals — words split + lift + lede fade ────────────
function splitToWords(el: Node) {
  const words: HTMLElement[] = [];
  function walk(node: Node) {
    Array.from(node.childNodes).forEach((k) => {
      if (k.nodeType === 3) {
        const text = k.nodeValue || "";
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        for (const p of text.split(/(\s+)/)) {
          if (!p) continue;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); continue; }
          const outer = document.createElement("span"); outer.className = "ng-w";
          const inner = document.createElement("span"); inner.className = "ng-w-i"; inner.textContent = p;
          outer.appendChild(inner); frag.appendChild(outer); words.push(inner);
        }
        k.parentNode!.replaceChild(frag, k);
      } else if (k.nodeType === 1 && !(k as HTMLElement).classList.contains("ng-w")) {
        walk(k);
      }
    });
  }
  walk(el);
  return words;
}

function setupSectionReveals() {
  const headlines = document.querySelectorAll<HTMLElement>(
    ".thesis-h, .featured-practice .l h3, .case-feature h3, .manifesto h2, " +
      ".compounding h2, .innovation h2, .final-cta h2, .svc-hero h1, .cs-hero h1, " +
      ".careers-hero h1, .job-hero h1, .cs-section h2, .job-apply-cta h2"
  );
  headlines.forEach((h) => {
    if (h.dataset.ngSplit) return;
    h.dataset.ngSplit = "1";
    const words = splitToWords(h);
    gsap.set(words, { yPercent: 110, opacity: 0 });
    gsap.to(words, {
      yPercent: 0, opacity: 1, duration: 0.95, ease: "power3.out", stagger: 0.045,
      scrollTrigger: { trigger: h, start: "top 88%", toggleActions: "play none none none" },
    });
  });

  document.querySelectorAll<HTMLElement>(".lede, .section-head .right, .hero-sub, .manifesto-banner p").forEach((el) => {
    if (el.dataset.ngLede) return;
    el.dataset.ngLede = "1";
    gsap.from(el, { y: 22, opacity: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } });
  });
}

// ─── Section / grid reveals (from animations.js) ─────────────────
function fromStagger(scope: string, childSel: string, vars: gsap.TweenVars, start = "top 85%") {
  document.querySelectorAll<HTMLElement>(scope).forEach((el) => {
    if (el.dataset.ngRev) return;
    el.dataset.ngRev = "1";
    const items = childSel ? el.querySelectorAll(childSel) : [el];
    gsap.from(items, { ...vars, scrollTrigger: { trigger: el, start, toggleActions: "play none none none" } });
  });
}

function setupSectionAnimations() {
  fromStagger(".section-head", "h2, .right", { y: 30, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 });
  fromStagger(".section-tag", "", { y: 12, opacity: 0, duration: 0.7, ease: "power2.out" }, "top 92%");
  fromStagger(".prac-list", ".prac-row", { y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" });
  fromStagger(".fw-track", ".fw-cell", { y: 20, opacity: 0, duration: 0.55, stagger: 0.07, ease: "power2.out" });
  fromStagger(".compounding-loops", ".compounding-loop", { y: 18, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "top 88%");
  fromStagger(".pdetail-tabs", ".pdetail-tab", { y: 18, opacity: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" }, "top 88%");
  fromStagger(".roadmap-inputs", ".roadmap-input", { x: -24, opacity: 0, duration: 0.55, stagger: 0.08, ease: "power2.out" });
  fromStagger(".industry-strip", "div", { y: 16, opacity: 0, duration: 0.45, stagger: 0.04, ease: "power2.out" }, "top 90%");
  fromStagger(".impact-strip", ":scope > div", { y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" });
  fromStagger(".impact-detailed", ":scope > div", { y: 18, opacity: 0, duration: 0.45, stagger: 0.03, ease: "power2.out" }, "top 88%");
  fromStagger(".case-secondary-grid", ".case-secondary", { y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" });
  fromStagger(".cases-extra-grid", ".case-secondary", { y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "top 88%");
  fromStagger(".innovation-offerings", ".innovation-offering", { x: 24, opacity: 0, duration: 0.55, stagger: 0.1, ease: "power2.out" });
  fromStagger(".final-cta .inner", ":scope > *", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });

  // Featured practice timeline
  document.querySelectorAll<HTMLElement>(".featured-practice").forEach((el) => {
    if (el.dataset.ngRevF) return;
    el.dataset.ngRevF = "1";
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" } });
    const left = el.querySelector(".l"), right = el.querySelector(".r");
    if (left) tl.from(left, { x: -40, opacity: 0, duration: 0.9, ease: "power3.out" }, 0);
    if (right) tl.from(right, { x: 40, opacity: 0, duration: 1.0, ease: "power3.out" }, 0.1);
    tl.from(el.querySelectorAll(".l ul li"), { y: 14, opacity: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" }, 0.45);
    tl.from(el.querySelectorAll(".l .kpi > div"), { y: 18, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 0.6);
  });

  // Thesis columns + roadmap output stages + manifesto split halves
  fromStagger(".thesis-col", "li", { x: -16, opacity: 0, duration: 0.5, stagger: 0.06, ease: "power2.out", delay: 0.3 }, "top 80%");
  fromStagger(".roadmap-output", ".roadmap-output-stage", { x: 24, opacity: 0, duration: 0.55, stagger: 0.1, ease: "power2.out" });
  fromStagger(".fw-detail", "", { y: 24, opacity: 0, duration: 0.8, ease: "power3.out" });

  // Map dots/arcs
  document.querySelectorAll<HTMLElement>(".worldmap-wrap svg").forEach((el) => {
    if (el.dataset.ngMapRev) return;
    el.dataset.ngMapRev = "1";
    gsap.from(el.querySelectorAll("circle"), { opacity: 0, duration: 1.4, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" } });
  });
}

// ─── Framework — scroll-driven step advance ──────────────────────
function setupFrameworkScrub() {
  const fw = document.getElementById("framework");
  if (!fw || fw.dataset.ngFwScrub) return;
  fw.dataset.ngFwScrub = "1";
  const cells = fw.querySelectorAll<HTMLElement>(".fw-cell");
  if (!cells.length) return;
  const total = cells.length;
  let lastIdx = -1;
  ScrollTrigger.create({
    trigger: fw, start: "top 65%", end: "bottom 35%", scrub: 0.6,
    onUpdate: (self) => {
      const idx = Math.max(0, Math.min(total - 1, Math.floor(self.progress * total * 0.999)));
      if (idx === lastIdx) return;
      lastIdx = idx;
      // 'mouseover' bubbles → React derives onMouseEnter from it.
      cells[idx].dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
    },
  });
}

// ─── Marquee — accelerate on scroll velocity ─────────────────────
function setupMarqueeAccelerate() {
  const track = document.querySelector<HTMLElement>(".hero-marquee-track");
  if (!track || track.dataset.ngMarq) return;
  track.dataset.ngMarq = "1";
  const baseDuration = 50;
  let lastY = window.scrollY, lastT = performance.now();
  window.addEventListener("scroll", () => {
    const now = performance.now();
    const dt = Math.max(16, now - lastT);
    const velocity = Math.min(1, (Math.abs(window.scrollY - lastY) / dt) * 0.3);
    lastY = window.scrollY; lastT = now;
    track.style.animationDuration = Math.max(12, baseDuration - velocity * 36) + "s";
  }, { passive: true });
}

// ─── Final CTA — pulsing orb + parallax ──────────────────────────
function setupFinalCTAOrb() {
  const cta = document.querySelector<HTMLElement>(".final-cta");
  if (!cta || cta.dataset.ngOrb) return;
  cta.dataset.ngOrb = "1";
  if (!cta.querySelector(".ng-orb-bg")) {
    const orb = document.createElement("div"); orb.className = "ng-orb-bg"; cta.prepend(orb);
  }
  gsap.to(".ng-orb-bg", { y: -60, ease: "none", scrollTrigger: { trigger: cta, start: "top bottom", end: "bottom top", scrub: true } });
}

// ─── Manifesto banner — scrub scale + reveal + glow ──────────────
function setupManifestoBanner() {
  document.querySelectorAll<HTMLElement>(".manifesto-banner").forEach((b) => {
    if (b.dataset.ngV4) return;
    b.dataset.ngV4 = "1";
    const h2 = b.querySelector("h2");
    const pre = b.querySelector(".banner-pre"), post = b.querySelector(".banner-post");
    if (!h2) return;
    gsap.fromTo(h2, { scale: 0.88, y: 60 }, { scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: b, start: "top 80%", end: "center 40%", scrub: 0.5 } });
    if (pre && post) {
      gsap.fromTo([pre, post], { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.18, scrollTrigger: { trigger: b, start: "top 85%", toggleActions: "play none none none" } });
    }
    if (!b.querySelector(".ng-banner-glow")) {
      const g = document.createElement("div"); g.className = "ng-banner-glow"; b.prepend(g);
      gsap.fromTo(g, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, ease: "power2.out", duration: 1.4, scrollTrigger: { trigger: b, start: "top 85%", toggleActions: "play none none reverse" } });
    }
  });
}

// ─── Compounding curve — traveling head + milestone pings ────────
function setupCompoundingCurve() {
  document.querySelectorAll<HTMLElement>('[data-anim="compounding"]').forEach((sec) => {
    if (sec.dataset.ngV4) return;
    sec.dataset.ngV4 = "1";
    const svg = sec.querySelector(".compounding-curve svg");
    if (!svg) return;
    const W = 1200, H = 360, pad = { l: 70, r: 60, t: 30, b: 50 };
    const innerW = W - pad.l - pad.r, innerH = H - pad.t - pad.b;

    let synth = svg.querySelector(".ng-curve-synth") as SVGPathElement | null;
    if (!synth) {
      synth = document.createElementNS(NS, "path");
      let d = "";
      for (let i = 0; i <= 100; i++) {
        const t = i / 100, y = Math.pow(t, 1.7);
        d += (i === 0 ? "M " : " L ") + (pad.l + t * innerW).toFixed(2) + " " + (pad.t + (1 - y) * innerH).toFixed(2);
      }
      synth.setAttribute("class", "ng-curve-synth");
      synth.setAttribute("d", d);
      synth.setAttribute("fill", "none");
      synth.setAttribute("stroke", "transparent");
      synth.setAttribute("stroke-width", "0");
      svg.appendChild(synth);
    }
    const synthLen = synth.getTotalLength();

    let aura = svg.querySelector(".ng-curve-aura") as SVGCircleElement | null;
    if (!aura) {
      aura = document.createElementNS(NS, "circle");
      aura.setAttribute("class", "ng-curve-aura"); aura.setAttribute("r", "18");
      aura.setAttribute("fill", "rgba(217,255,53,0.18)"); aura.setAttribute("opacity", "0");
      svg.appendChild(aura);
    }
    let head = svg.querySelector(".ng-curve-head") as SVGCircleElement | null;
    if (!head) {
      head = document.createElementNS(NS, "circle");
      head.setAttribute("class", "ng-curve-head"); head.setAttribute("r", "7");
      head.setAttribute("fill", "#D9FF35"); head.setAttribute("opacity", "0");
      head.setAttribute("filter", "drop-shadow(0 0 10px rgba(217,255,53,0.9))");
      svg.appendChild(head);
    }

    ScrollTrigger.create({
      trigger: sec, start: "top 70%", end: "bottom 30%", scrub: 0.6,
      onUpdate: (self) => {
        const p = Math.min(0.998, Math.max(0, self.progress));
        const pt = synth!.getPointAtLength(p * synthLen);
        head!.setAttribute("cx", String(pt.x)); head!.setAttribute("cy", String(pt.y));
        aura!.setAttribute("cx", String(pt.x)); aura!.setAttribute("cy", String(pt.y));
        const op = 0.25 + p * 0.75;
        head!.setAttribute("opacity", String(op));
        aura!.setAttribute("opacity", String(op * 0.55));
      },
    });

    sec.querySelectorAll<HTMLElement>(".compounding-stop").forEach((stop) => {
      if (stop.dataset.ngPing) return;
      stop.dataset.ngPing = "1";
      const ring = document.createElement("div"); ring.className = "ng-stop-ping"; stop.appendChild(ring);
      gsap.fromTo(ring, { scale: 0.2, opacity: 0.9 }, { scale: 2.6, opacity: 0, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: stop, start: "top 80%", toggleActions: "play none none none" } });
    });
  });
}

// ─── Practices list — cursor spotlight + row hover lift ──────────
function setupPracticesList() {
  document.querySelectorAll<HTMLElement>(".prac-list").forEach((list) => {
    if (list.dataset.ngV4) return;
    list.dataset.ngV4 = "1";
    let spot = list.querySelector<HTMLElement>(".ng-spotlight");
    if (!spot) { spot = document.createElement("div"); spot.className = "ng-spotlight"; list.prepend(spot); }
    list.addEventListener("mousemove", (e) => {
      const rect = list.getBoundingClientRect();
      spot!.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px) translate(-50%, -50%)`;
      spot!.style.opacity = "1";
    });
    list.addEventListener("mouseleave", () => { spot!.style.opacity = "0"; });

    list.querySelectorAll<HTMLElement>(".prac-row").forEach((row) => {
      if (row.dataset.ngHov) return;
      row.dataset.ngHov = "1";
      const num = row.querySelector<HTMLElement>(".ix");
      const ttl = row.querySelector<HTMLElement>(".ttl");
      row.addEventListener("mouseenter", () => {
        if (num) { num.style.transition = "transform 0.45s cubic-bezier(.22,.61,.36,1), color 0.25s"; num.style.transform = "translateX(-4px) scale(1.45)"; num.style.transformOrigin = "left center"; num.style.color = "var(--ng-lime)"; }
        if (ttl) { ttl.style.transition = "transform 0.4s cubic-bezier(.22,.61,.36,1)"; ttl.style.transform = "translateX(8px)"; }
      });
      row.addEventListener("mouseleave", () => {
        if (num) { num.style.transform = ""; num.style.color = ""; }
        if (ttl) ttl.style.transform = "";
      });
    });
  });
}

// ─── Impact / counters — count-up on enter (text-node safe) ──────
function setupImpactCountUp() {
  document.querySelectorAll<HTMLElement>(".impact-strip .v, .cs-results-grid .v, .hero-counters .v").forEach((el) => {
    if (el.dataset.ngCount4) return;
    el.dataset.ngCount4 = "1";
    const first = el.firstChild;
    if (!first || first.nodeType !== 3) return;
    const raw = first.nodeValue || "";
    const match = raw.match(/^(\s*)(-?)([\d.,]+)(.*)$/);
    if (!match) return;
    const [, lead, sign, numStr, tail] = match;
    const final = parseFloat(numStr.replace(/,/g, "."));
    if (!isFinite(final)) return;
    const decimals = (numStr.split(".")[1] || numStr.split(",")[1] || "").length;
    const obj = { v: 0 };
    first.nodeValue = lead + sign + (decimals > 0 ? (0).toFixed(decimals) : "0") + tail;
    gsap.to(obj, {
      v: final, duration: 1.6, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate: () => {
        const f = decimals > 0 ? obj.v.toFixed(decimals) : Math.round(obj.v).toLocaleString("en-US");
        first.nodeValue = lead + sign + f + tail;
      },
    });
  });
}

// ─── Cases — 3D tilt on hover ────────────────────────────────────
function setupCasesTilt() {
  document.querySelectorAll<HTMLElement>(".case-secondary, .case-feature .r").forEach((card) => {
    if (card.dataset.ngTilt) return;
    card.dataset.ngTilt = "1";
    card.style.transformStyle = "preserve-3d";
    card.style.willChange = "transform";
    const parent = card.parentElement || card;
    parent.style.perspective = parent.style.perspective || "1200px";
    let raf = 0, cx = 0, cy = 0, tx = 0, ty = 0;
    const MAX = 6;
    function loop() {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      card.style.transform = `rotateX(${-cy}deg) rotateY(${cx}deg) translateZ(0)`;
      if (Math.abs(cx - tx) > 0.05 || Math.abs(cy - ty) > 0.05) raf = requestAnimationFrame(loop); else raf = 0;
    }
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * MAX * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * MAX * 2;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    card.addEventListener("mouseleave", () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(loop); });
  });
}

// ─── Thesis — connecting flow line between then & now ────────────
function setupThesisConnector() {
  document.querySelectorAll<HTMLElement>(".thesis-grid").forEach((grid) => {
    if (grid.dataset.ngConn) return;
    grid.dataset.ngConn = "1";
    let svg = grid.querySelector(".ng-thesis-flow") as SVGSVGElement | null;
    if (!svg) {
      svg = document.createElementNS(NS, "svg");
      svg.setAttribute("class", "ng-thesis-flow");
      svg.setAttribute("viewBox", "0 0 200 24");
      svg.setAttribute("preserveAspectRatio", "none");
      svg.innerHTML = `
        <defs><linearGradient id="ngThesisGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="#5A6E6A" stop-opacity="0.0" />
          <stop offset="25%" stop-color="#5A6E6A" stop-opacity="0.4" />
          <stop offset="75%" stop-color="#D9FF35" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#D9FF35" stop-opacity="1" />
        </linearGradient></defs>
        <path class="ng-thesis-line" d="M2 12 L198 12" fill="none" stroke="url(#ngThesisGrad)" stroke-width="1.4" />
        <path class="ng-thesis-arrow" d="M188 5 L198 12 L188 19" fill="none" stroke="#D9FF35" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />`;
      grid.appendChild(svg);
    }
    const line = svg.querySelector(".ng-thesis-line") as SVGPathElement | null;
    const arrow = svg.querySelector(".ng-thesis-arrow");
    if (line) {
      const len = line.getTotalLength();
      line.style.strokeDasharray = String(len);
      line.style.strokeDashoffset = String(len);
      gsap.to(line, { strokeDashoffset: 0, ease: "power2.out", duration: 1.6, scrollTrigger: { trigger: grid, start: "top 75%", toggleActions: "play none none none" } });
    }
    if (arrow) gsap.from(arrow, { opacity: 0, x: -8, duration: 0.6, ease: "power2.out", delay: 0.9, scrollTrigger: { trigger: grid, start: "top 75%", toggleActions: "play none none none" } });
  });
}

// ─── Roadmap — progress beam through the stages ──────────────────
function setupRoadmapBeam() {
  document.querySelectorAll<HTMLElement>(".roadmap-output").forEach((wrap) => {
    if (wrap.dataset.ngBeam) return;
    wrap.dataset.ngBeam = "1";
    if (!wrap.querySelector(".ng-roadmap-beam")) {
      const beam = document.createElement("div"); beam.className = "ng-roadmap-beam"; wrap.appendChild(beam);
    }
    const beam = wrap.querySelector(".ng-roadmap-beam");
    gsap.fromTo(beam, { scaleY: 0, transformOrigin: "top center" }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: wrap, start: "top 70%", end: "bottom 30%", scrub: 0.6 } });
    wrap.querySelectorAll<HTMLElement>(".roadmap-output-stage").forEach((stage) => {
      if (stage.dataset.ngGlow) return;
      stage.dataset.ngGlow = "1";
      ScrollTrigger.create({ trigger: stage, start: "top 75%", onEnter: () => stage.classList.add("ng-stage-lit") });
    });
  });
}

// ─── WorldMap — beads travelling along arcs ──────────────────────
function setupWorldMapBeams() {
  document.querySelectorAll<SVGSVGElement>(".worldmap-wrap svg").forEach((svg) => {
    if (svg.dataset.ngBeams) return;
    svg.dataset.ngBeams = "1";
    const arcs = Array.from(svg.querySelectorAll<SVGPathElement>("path")).filter(
      (p) => (p.getAttribute("stroke") || "").toLowerCase() === "#d9ff35"
    );
    arcs.forEach((arc, i) => {
      const bead = document.createElementNS(NS, "circle");
      bead.setAttribute("r", "2.4");
      bead.setAttribute("fill", "#D9FF35");
      bead.setAttribute("filter", "drop-shadow(0 0 5px rgba(217,255,53,0.8))");
      bead.setAttribute("class", "ng-arc-bead");
      svg.appendChild(bead);
      const len = arc.getTotalLength();
      const start = performance.now() + i * 600;
      const DUR = 3200;
      function tick(now: number) {
        const t = ((now - start) % DUR) / DUR;
        const pt = arc.getPointAtLength(t * len);
        bead.setAttribute("cx", String(pt.x));
        bead.setAttribute("cy", String(pt.y));
        bead.setAttribute("opacity", String(Math.sin(Math.PI * t) * 0.95));
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  });
}
