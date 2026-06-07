"use client";

// Norton-Gauss · compounding (ported from src/new-sections.jsx)
import { useEffect, useRef, useState } from "react";
import { compounding as c } from "@/lib/content";

function CompoundingCurve({ progress = 1 }: { progress?: number }) {
  const W = 1200, H = 360;
  const pad = { l: 70, r: 60, t: 30, b: 50 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const points: { x: number; y: number; t: number }[] = [];
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const y = Math.pow(t, 1.7);
    points.push({ x: pad.l + t * innerW, y: pad.t + (1 - y) * innerH, t });
  }
  const clipIdx = Math.floor(points.length * progress);
  const visible = points.slice(0, clipIdx + 1);
  const pathD = visible.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const fillD = pathD + ` L ${visible[visible.length - 1]?.x.toFixed(1) || pad.l} ${H - pad.b} L ${pad.l} ${H - pad.b} Z`;

  const ms = [
    { t: 0.08, label: "Month 1", kpi: "1.0×" },
    { t: 0.5, label: "Month 6", kpi: "3.4×" },
    { t: 0.95, label: "Month 12+", kpi: "12×" },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="curve-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#D9FF35" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#D9FF35" stopOpacity="0" />
        </linearGradient>
        <pattern id="grid-soft" width="60" height="40" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 40" fill="none" stroke="#1A2E29" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect x={pad.l} y={pad.t} width={innerW} height={innerH} fill="url(#grid-soft)" />
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={H - pad.b} stroke="#1A2E29" strokeWidth="0.8" />
      <line x1={pad.l} y1={H - pad.b} x2={W - pad.r} y2={H - pad.b} stroke="#1A2E29" strokeWidth="0.8" />
      {[
        { y: 0.0, lbl: "12×" },
        { y: 0.3, lbl: "6×" },
        { y: 0.6, lbl: "3×" },
        { y: 0.95, lbl: "1×" },
      ].map((t, i) => (
        <g key={i}>
          <line x1={pad.l - 5} y1={pad.t + t.y * innerH} x2={pad.l} y2={pad.t + t.y * innerH} stroke="#5A6E6A" />
          <text x={pad.l - 12} y={pad.t + t.y * innerH + 4} textAnchor="end" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.2" fill="#5A6E6A">{t.lbl}</text>
        </g>
      ))}
      <text x={pad.l} y={H - pad.b + 22} fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.2" fill="#5A6E6A">DAY 1</text>
      <text x={(pad.l + W - pad.r) / 2} y={H - pad.b + 22} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.2" fill="#5A6E6A">MONTH 6</text>
      <text x={W - pad.r} y={H - pad.b + 22} textAnchor="end" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.2" fill="#5A6E6A">MONTH 12</text>

      <line x1={pad.l} y1={H - pad.b - 4} x2={W - pad.r} y2={H - pad.b - 80} stroke="#5A6E6A" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <text x={W - pad.r - 6} y={H - pad.b - 86} textAnchor="end" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.4" fill="#5A6E6A">LINEAR BASELINE</text>

      {visible.length > 1 && <path d={fillD} fill="url(#curve-fill)" />}
      {visible.length > 1 && <path d={pathD} fill="none" stroke="#D9FF35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />}

      {ms.map((m, i) => {
        const x = pad.l + m.t * innerW;
        const y = pad.t + (1 - Math.pow(m.t, 1.7)) * innerH;
        const reveal = progress >= m.t;
        if (!reveal) return null;
        return (
          <g key={i}>
            <line x1={x} y1={y} x2={x} y2={H - pad.b} stroke="#D9FF35" strokeWidth="0.6" strokeDasharray="2 4" opacity="0.5" />
            <circle cx={x} cy={y} r="9" fill="#08110F" stroke="#D9FF35" strokeWidth="2" />
            <circle cx={x} cy={y} r="4" fill="#D9FF35" />
            <text x={x} y={y - 18} textAnchor="middle" fontFamily="Bricolage Grotesque" fontWeight="500" fontSize="22" fill="#D9FF35">{m.kpi}</text>
            <text x={x} y={y - 38} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9.5" letterSpacing="1.4" fill="#F2F1EC">{m.label.toUpperCase()}</text>
          </g>
        );
      })}

      <text x={pad.l + 8} y={pad.t + 18} fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.4" fill="#D9FF35">VALUE · COMPOUNDING CURVE</text>
    </svg>
  );
}

export default function Compounding() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          io.disconnect();
          const dur = 2200;
          const start = performance.now();
          let raf: number;
          const tick = (t: number) => {
            const k = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - k, 2.6);
            setProgress(eased);
            if (k < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section-pad-sm" data-anim="compounding" id="compounding">
      <div className="section-tag">
        <span><span className="num">05</span> · Compounding</span>
        <span>The platform pays back exponentially</span>
      </div>
      <div className="container" ref={ref}>
        <div className="section-head">
          <h2 className="display-2xl">
            {c.h2A}<em className="serif-em" style={{ color: "var(--ng-lime)" }}>{c.h2Em}</em>{c.h2B}
          </h2>
          <p className="right">{c.sub}</p>
        </div>

        <div className="compounding-curve">
          <CompoundingCurve progress={progress} />
          <div className="compounding-stops">
            {c.milestones.map((m, i) => (
              <div key={i} className="compounding-stop" data-anim-child>
                <div className="x">{m.x}</div>
                <div className="label">{m.label}</div>
                <div className="kpi">
                  <span className="v">{m.kpi}</span>
                  <span className="k">{m.kpiLabel}</span>
                </div>
                <ul>{m.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>

        <div className="compounding-loops">
          {c.feedbackLoops.map((l, i) => (
            <div key={i} className="compounding-loop" data-anim-child>
              <div className="arrow-row">
                <span className="from">{l.from}</span>
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                  <path d="M1 7h13M10 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="to">{l.to}</span>
              </div>
              <p>{l.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
