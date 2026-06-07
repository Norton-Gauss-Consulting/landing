"use client";

// Norton-Gauss · Three.js neural-mesh host (client-only).
// Loaded via a client-only dynamic import from the Hero so `three` never
// runs during SSR.
import { useEffect, useRef } from "react";
import { mountHeroMesh } from "@/lib/heroMesh";

export default function HeroMesh() {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hostRef.current) return;
    const dispose = mountHeroMesh(hostRef.current);
    return () => dispose();
  }, []);
  return <div ref={hostRef} className="hero-mesh-host" aria-hidden="true" />;
}
