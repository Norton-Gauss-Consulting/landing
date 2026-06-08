// Norton-Gauss · roadmaps (ported from src/new-sections.jsx)
import { roadmaps as r } from "@/lib/content";

function RoadmapIcon({ name }: { name: string }) {
  const s = { stroke: "currentColor", strokeWidth: 1.4, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "compass")
    return (
      <svg width="18" height="18" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" {...s} /><path d="M12 8L9 13 8 12 11 7z" stroke="none" fill="currentColor" /></svg>
    );
  if (name === "stack")
    return (
      <svg width="18" height="18" viewBox="0 0 20 20"><path d="M3 6l7-3 7 3-7 3-7-3zM3 10l7 3 7-3M3 14l7 3 7-3" {...s} /></svg>
    );
  if (name === "people")
    return (
      <svg width="18" height="18" viewBox="0 0 20 20"><circle cx="7" cy="7" r="2.5" {...s} /><circle cx="13" cy="7" r="2.5" {...s} /><path d="M3 17c0-2.8 1.8-4 4-4s4 1.2 4 4M9 17c0-2.8 1.8-4 4-4s4 1.2 4 4" {...s} /></svg>
    );
  if (name === "risk")
    return (
      <svg width="18" height="18" viewBox="0 0 20 20"><path d="M10 3l7 13H3z" {...s} /><line x1="10" y1="8" x2="10" y2="12" {...s} /><circle cx="10" cy="14" r=".7" fill="currentColor" /></svg>
    );
  return null;
}

export default function Roadmaps() {
  return (
    <section className="section-pad-sm" data-anim="roadmaps">
      <div className="section-tag">
        <span><span className="num">06</span> · Hyper-personalised roadmaps</span>
        <span>No two operations · No two roadmaps</span>
      </div>
      <div className="container">
        <div className="section-head">
          <h2 className="display-2xl">
            {r.h2A}<em className="serif-em" style={{ color: "var(--ng-lime)" }}>{r.h2Em}</em>{r.h2B}
          </h2>
          <p className="right">{r.sub}</p>
        </div>

        <div className="roadmap-grid">
          <div>
            <h5 className="mono" style={{ marginBottom: 18, color: "var(--ng-ink-dim)" }}>Inputs we shape around</h5>
            <div className="roadmap-inputs" data-anim-child-list>
              {r.inputs.map((inp, i) => (
                <div key={i} className="roadmap-input" data-anim-child>
                  <div className="ic"><RoadmapIcon name={inp.icon} /></div>
                  <div>
                    <div className="k">{inp.k}</div>
                    <div className="v">{inp.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="mono" style={{ marginBottom: 28, color: "var(--ng-ink-dim)" }}>Sample roadmap output</h5>
            <div className="roadmap-output" data-anim-child-list>
              {r.outputs.map((o, i) => (
                <div key={i} className="roadmap-output-stage" data-anim-child>
                  <div className="tag">{o.tag}</div>
                  <h4>{o.h}</h4>
                  <ul>{o.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
