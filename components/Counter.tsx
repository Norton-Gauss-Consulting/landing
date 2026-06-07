"use client";

// Norton-Gauss · count-up on scroll-into-view (ported from src/sections.jsx)
import { useEffect, useRef, useState } from "react";

export default function Counter({
  value,
  unit,
  prefix = "",
}: {
  value: string | number;
  unit?: string;
  prefix?: string;
}) {
  const str = String(value).trim();
  const m = str.match(/^([^\d.]*?)([\d.,]+)(.*)$/);
  const numeric = m ? parseFloat(m[2].replace(/,/g, "")) : NaN;
  const hasDecimal = m ? /\./.test(m[2]) : false;
  // Start at the final value so the right number shows even without animation.
  const [n, setN] = useState(Number.isNaN(numeric) ? 0 : numeric);
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(numeric) || ran.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !ran.current) {
          ran.current = true;
          io.disconnect();
          setN(0);
          const dur = 1100;
          const start = performance.now();
          let raf: number;
          const tick = (t: number) => {
            const k = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - k, 3);
            setN(Math.abs(numeric) * eased);
            if (k < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [numeric]);

  if (!m) {
    return (
      <span ref={ref}>
        {value}
        {unit ? <small>{unit}</small> : null}
      </span>
    );
  }
  const head = m[1];
  const tail = m[3];
  const display = hasDecimal ? n.toFixed(2) : Math.round(n).toLocaleString();
  return (
    <span ref={ref}>
      {prefix}
      {head}
      {display}
      {tail}
      {unit ? <small>{unit}</small> : null}
    </span>
  );
}
