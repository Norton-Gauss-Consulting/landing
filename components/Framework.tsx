"use client";

// Norton-Gauss · framework (ported from src/sections.jsx)
import { useEffect, useState } from "react";
import { framework as f } from "@/lib/content";

export default function Framework() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const cur = f[active];

  // Auto-advance with a progress indicator
  useEffect(() => {
    if (paused) return;
    const step = 4500;
    const startedAt = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const p = Math.min(1, elapsed / step);
      setProgress(p);
      if (p >= 1) {
        setActive((a) => (a + 1) % f.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active, paused]);

  const select = (i: number) => {
    setPaused(true);
    setActive(i);
    setProgress(0);
  };

  return (
    <section className="section-pad-sm" id="framework">
      <div className="section-tag">
        <span><span className="num">03</span> · Framework</span>
        <span>Discover · Diagnose · Design · Implement · Automate · Optimize · Scale</span>
      </div>
      <div className="container">
        <div className="section-head">
          <h2 className="display-2xl">
            From discovery to <em className="serif-em" style={{ color: "var(--ng-lime)" }}>compounding</em> scale.
          </h2>
          <p className="right">
            A seven-stage operating discipline. Each stage produces artefacts the next builds on — so phase four costs less
            than phase three, and phase seven is a platform the next region inherits rather than rebuilds.
          </p>
        </div>

        <div className="fw-wrap">
          <div className="fw-track" onMouseLeave={() => setPaused(false)}>
            {f.map((s, i) => (
              <button
                key={s.code}
                className={`fw-cell ${i === active ? "active" : ""} ${i < active ? "passed" : ""}`}
                onMouseEnter={() => select(i)}
                onClick={() => select(i)}
              >
                <span className="indicator" />
                <span className="step">{s.step} · {s.code}</span>
                <div className="ttl">{s.title}</div>
                <span className="arrow">→</span>
                {i === active && !paused && (
                  <div className="fw-progress" style={{ width: `${progress * 100}%`, top: "auto", bottom: -1 }} />
                )}
              </button>
            ))}
          </div>

          <div className="fw-detail" key={cur.code}>
            <div className="l">
              <div className="step-label">STAGE {cur.step} · {cur.code}</div>
              <h3>{cur.title}.</h3>
              <p className="lede" style={{ marginTop: 14 }}>{cur.lede}</p>
            </div>
            <div>
              <h5>What we do</h5>
              <p>{cur.body}</p>
            </div>
            <div>
              <h5>Deliverables</h5>
              <ul>{cur.out.map((o, i) => <li key={i}>{o}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
