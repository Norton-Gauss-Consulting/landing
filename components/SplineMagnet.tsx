"use client";

// Norton-Gauss · spline magnet (ported from src/spline-magnet.jsx)
// No Spline scene URL is configured (the Tweaks panel is not part of this
// port), so the decorative Three.js field is the centerpiece. The magnetic-
// field cursor follow is preserved for when a scene URL is wired later.
import { useEffect, useRef } from "react";
import { mountHeroMesh } from "@/lib/heroMesh";

export default function SplineMagnet({ strength = 0.18, range = 0.6 }: { strength?: number; range?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  // Decorative Three.js mesh, mounted once the section nears the viewport.
  useEffect(() => {
    if (!fallbackRef.current) return;
    let dispose = () => {};
    let mounted = true;
    let started = false;

    const start = () => {
      if (started || !mounted || !fallbackRef.current) return;
      started = true;
      dispose = mountHeroMesh(fallbackRef.current, { decorative: true, meshScale: 0.78 });
    };

    const section = fallbackRef.current.closest(".innovation-spline") || fallbackRef.current;
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) start();
        },
        { rootMargin: "300px" }
      );
      io.observe(section);
    } else {
      start();
    }

    return () => {
      mounted = false;
      if (io) io.disconnect();
      dispose && dispose();
    };
  }, []);

  // Magnetic field — the wrap translates toward the cursor over the section.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    let cx = 0, cy = 0;
    let tx = 0, ty = 0;
    const section = wrap.closest(".innovation-section") || wrap.parentElement;

    function loop() {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      wrap!.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      if (Math.abs(cx - tx) > 0.05 || Math.abs(cy - ty) > 0.05) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    }

    function onMove(e: MouseEvent) {
      if (!section) return;
      const r = section.getBoundingClientRect();
      if (e.clientY < r.top - r.height * 0.2 || e.clientY > r.bottom + r.height * 0.2) {
        tx = 0;
        ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
        return;
      }
      const cxR = r.left + r.width / 2;
      const cyR = r.top + r.height / 2;
      const dx = (e.clientX - cxR) / (r.width * 0.5);
      const dy = (e.clientY - cyR) / (r.height * 0.5);
      const radius = Math.min(r.width, r.height) * range * strength;
      tx = Math.max(-1, Math.min(1, dx)) * radius;
      ty = Math.max(-1, Math.min(1, dy)) * radius;
      if (!raf) raf = requestAnimationFrame(loop);
    }
    function onLeave() {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength, range]);

  return (
    <div className="spline-magnet-stage">
      <div ref={fallbackRef} className="spline-fallback" aria-hidden="true" />
      <div ref={wrapRef} className="spline-magnet-wrap" />
      <div className="spline-hint" aria-hidden="true">
        <span className="dot" />
        Three.js neural field
      </div>
    </div>
  );
}
