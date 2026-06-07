"use client";

// Norton-Gauss · case feature mini-dashboard (ported from src/sections.jsx)
import { useEffect, useState } from "react";

export default function CaseFeatureDash() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setT((x) => x + 1), 1200);
    return () => clearInterval(i);
  }, []);

  const rng = (s: number) => {
    s = s | 0;
    return () => {
      s = (s * 1664525 + 1013904223) | 0;
      return ((s >>> 0) % 100000) / 100000;
    };
  };
  const r1 = rng(t + 13);
  const r2 = rng(t + 27);
  const bars = Array.from({ length: 24 }, () => 25 + r1() * 65);
  const spark = Array.from({ length: 24 }, () => 30 + r2() * 60);
  const sparkPath = (data: number[], w: number, h: number) => {
    const max = Math.max(...data);
    return data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * (h - 4) - 2}`).join(" ");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
      <div className="mini-dash" style={{ flex: 1 }}>
        <div className="tile">
          <div className="lbl">Agents · active</div>
          <div className="v">38</div>
          <div style={{ display: "flex", alignItems: "end", gap: 2, height: 36, marginTop: 12 }}>
            {bars.map((v, i) => (
              <i key={i} style={{ flex: 1, height: `${v}%`, background: "#D9FF35", opacity: 0.85, borderRadius: 1 }} />
            ))}
          </div>
        </div>
        <div className="tile">
          <div className="lbl">Tier-1 · auto-resolved</div>
          <div className="v">52<small>%</small></div>
          <div style={{ marginTop: 16, height: 36, position: "relative" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#1A2E29", borderRadius: 2 }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "52%", height: 4, background: "#D9FF35", borderRadius: 2 }} />
            <div style={{ position: "absolute", bottom: 12, left: "52%", transform: "translateX(-50%)", fontFamily: "JetBrains Mono", fontSize: 9, color: "#D9FF35", letterSpacing: "0.1em" }}>↑ AI THRESHOLD</div>
          </div>
        </div>
        <div className="tile full">
          <div className="lbl">MTTR · last 30 days</div>
          <div className="v">−74<small>%</small> <span style={{ fontSize: 14, color: "var(--ng-ink-mute)", marginLeft: 14 }}>cross-domain, sub-90s detect</span></div>
          <svg viewBox="0 0 360 36" style={{ width: "100%", height: 36, marginTop: 12 }}>
            <polyline points={sparkPath(spark, 360, 36)} fill="none" stroke="#D9FF35" strokeWidth="1.6" opacity="0.95" />
            <polyline points={sparkPath(spark.map((v, i) => v * (1 + i * 0.04)), 360, 36)} fill="none" stroke="#5A6E6A" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        </div>
        <div className="tile">
          <div className="lbl">Sites monitored</div>
          <div className="v">2,847</div>
          <div className="mono" style={{ marginTop: 14, fontSize: 10, color: "var(--ng-lime)" }}>↑ 12 last 24h</div>
        </div>
        <div className="tile">
          <div className="lbl">Run-rate save</div>
          <div className="v">€21<small>M</small></div>
          <div className="mono" style={{ marginTop: 14, fontSize: 10, color: "var(--ng-ink-dim)" }}>ANNUALISED</div>
        </div>
      </div>
    </div>
  );
}
