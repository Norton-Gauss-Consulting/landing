// Norton-Gauss · practices (ported from src/sections.jsx)
import Link from "next/link";
import { Arr } from "./icons";
import { featured, services } from "@/lib/content";

function AgenticMiniDiagram() {
  return (
    <svg viewBox="0 0 460 460" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="ag-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D9FF35" stopOpacity=".55" />
          <stop offset="60%" stopColor="#D9FF35" stopOpacity=".06" />
          <stop offset="100%" stopColor="#D9FF35" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="230" cy="230" r="180" fill="url(#ag-halo)" />
      {[80, 130, 180].map((r) => (
        <circle key={r} cx="230" cy="230" r={r} fill="none" stroke="#234234" strokeWidth=".7" strokeDasharray="3 5" opacity=".7" />
      ))}
      <circle cx="230" cy="230" r="22" fill="#D9FF35" />
      <circle cx="230" cy="230" r="32" fill="none" stroke="#D9FF35" strokeWidth="1" opacity=".5" />
      <text x="230" y="234" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1.4" fill="#0A1614">ORCH</text>
      {[
        { a: 0, r: 80, lbl: "TRIAGE" },
        { a: 60, r: 80, lbl: "CORRELATE" },
        { a: 120, r: 80, lbl: "REMEDIATE" },
        { a: 180, r: 80, lbl: "SUMMARISE" },
        { a: 240, r: 80, lbl: "EVAL" },
        { a: 300, r: 80, lbl: "POLICY" },
      ].map((d, i) => {
        const rad = (d.a * Math.PI) / 180;
        const x = 230 + Math.cos(rad) * d.r;
        const y = 230 + Math.sin(rad) * d.r;
        return (
          <g key={i}>
            <line x1="230" y1="230" x2={x} y2={y} stroke="#D9FF35" strokeWidth=".5" opacity=".35" />
            <circle cx={x} cy={y} r="5" fill="#D9FF35" />
          </g>
        );
      })}
      {[
        { a: 30, r: 180, lbl: "CRM" },
        { a: 75, r: 180, lbl: "OBSERV" },
        { a: 120, r: 180, lbl: "CMDB" },
        { a: 165, r: 180, lbl: "PRICE" },
        { a: 210, r: 180, lbl: "TICKETS" },
        { a: 255, r: 180, lbl: "POLICY" },
        { a: 300, r: 180, lbl: "DATA-LAKE" },
        { a: 345, r: 180, lbl: "ENG-DB" },
      ].map((d, i) => {
        const rad = (d.a * Math.PI) / 180;
        const x = 230 + Math.cos(rad) * d.r;
        const y = 230 + Math.sin(rad) * d.r;
        const lx = 230 + Math.cos(rad) * (d.r + 22);
        const ly = 230 + Math.sin(rad) * (d.r + 22);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="#0C1A18" stroke="#234234" strokeWidth="1.2" />
            <text
              x={lx}
              y={ly + 3}
              textAnchor={Math.cos(rad) > 0.3 ? "start" : Math.cos(rad) < -0.3 ? "end" : "middle"}
              fontFamily="JetBrains Mono"
              fontSize="9"
              letterSpacing="1.4"
              fill="#8DA09B"
            >
              {d.lbl}
            </text>
          </g>
        );
      })}
      <text x="20" y="30" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.4" fill="#5A6E6A">AGENTIC · TOPOLOGY</text>
      <text x="440" y="30" textAnchor="end" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.4" fill="#D9FF35">6 AGENTS · 8 TOOLS</text>
      <text x="20" y="445" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.4" fill="#5A6E6A">EVAL · TRACE · GUARDRAIL</text>
    </svg>
  );
}

export default function Practices() {
  return (
    <section className="section-pad-sm">
      <div className="section-tag">
        <span><span className="num">02</span> · Practices</span>
        <span>Seven practices · One operating discipline</span>
      </div>
      <div className="container">
        <div className="section-head">
          <h2 className="display-2xl">
            Capabilities <span className="serif-em" style={{ color: "var(--ng-lime)" }}>composed</span> into outcomes.
          </h2>
          <p className="right">
            Each practice ships independently — but they&rsquo;re engineered to compose. A custom-software build inherits the
            same automation, agents and operating model as the transformation programme around it. Compounding, not stacking.
          </p>
        </div>

        {/* Featured: Hyper-Automation */}
        <article className="featured-practice">
          <div className="l">
            <div className="ix">{featured.num} · {featured.eyebrow}</div>
            <h3>
              Automate the work that decides<br />whether a programme <em>scales.</em>
            </h3>
            <p>{featured.summary}</p>
            <ul>
              {featured.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
            <div className="kpi">
              {featured.kpi.map((k, i) => (
                <div key={i}>
                  <div className="v">{k.v}</div>
                  <div className="k">{k.k}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="r">
            <AgenticMiniDiagram />
          </div>
        </article>

        {/* Compact list */}
        <div className="prac-list">
          {services.slice(1).map((s) => (
            <Link key={s.id} className="prac-row" href="/practices">
              <span className="ix">{s.num}</span>
              <div>
                <div className="ttl">{s.title}</div>
                <div
                  className="mono"
                  style={{
                    marginTop: 6,
                    color: "var(--ng-ink-mute)",
                    textTransform: "none",
                    letterSpacing: "normal",
                    fontFamily: "var(--font-body)",
                    fontSize: 13.5,
                  }}
                >
                  {s.summary.split(".")[0]}.
                </div>
              </div>
              <div className="meta">{s.meta}</div>
              <span className="go"><Arr /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
