"use client";

// Norton-Gauss · decorative sub-page mesh (ported from src/hero-sim.jsx)
// Three.js is dynamic-imported inside the effect so it never touches SSR and
// stays in a lazy client chunk.
import { useEffect, useRef } from "react";

export default function SubpageMesh({
  side = "right",
  size = "md",
}: {
  side?: "right" | "left";
  size?: "sm" | "md" | "lg";
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hostRef.current) return;
    let disposed = false;
    let dispose = () => {};
    import("@/lib/heroMesh").then(({ mountHeroMesh }) => {
      if (disposed || !hostRef.current) return;
      const meshScale = size === "sm" ? 0.62 : size === "lg" ? 0.92 : 0.78;
      dispose = mountHeroMesh(hostRef.current, { decorative: true, meshScale });
    });
    return () => {
      disposed = true;
      dispose();
    };
  }, [side, size]);

  return <div ref={hostRef} className={`subpage-mesh-host pos-${side} size-${size}`} aria-hidden="true" />;
}
