// Norton-Gauss · case studies (ported from src/sections.jsx)
import Link from "next/link";
import { Arr } from "./icons";
import CaseFeatureDash from "./CaseFeatureDash";
import { cases } from "@/lib/content";

function CaseSecondaryViz({ id }: { id: string }) {
  if (id === "proposal") {
    return (
      <svg viewBox="0 0 460 220" style={{ width: "100%", height: 220 }}>
        <text x="20" y="28" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.4" fill="#5A6E6A">PROPOSAL CYCLE</text>
        <text x="20" y="64" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.4" fill="#8DA09B">BEFORE</text>
        <rect x="20" y="74" width="420" height="12" fill="#1A2E29" rx="2" />
        <text x="440" y="106" textAnchor="end" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.4" fill="#5A6E6A">6 WEEKS</text>
        <text x="20" y="148" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.4" fill="#D9FF35">AFTER</text>
        <rect x="20" y="158" width="14" height="12" fill="#D9FF35" rx="2" />
        <text x="42" y="186" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.4" fill="#D9FF35">6 HOURS</text>
        <text x="440" y="186" textAnchor="end" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.4" fill="#D9FF35">+4.1pts MARGIN</text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 460 220" style={{ width: "100%", height: 220 }}>
      <text x="20" y="28" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.4" fill="#5A6E6A">EDGE FLEET · 4,200 STORES</text>
      {Array.from({ length: 80 }).map((_, i) => {
        const x = (25 + (i * 31)) % 420 + Math.floor(i / 14) * 7;
        const y = 60 + Math.floor(i / 14) * 22 + (i % 3) * 4;
        const lit = i % 6 === 0;
        return <circle key={i} cx={x} cy={y} r={lit ? 3 : 1.6} fill={lit ? "#D9FF35" : "#1A2E29"} />;
      })}
      <text x="440" y="200" textAnchor="end" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="1.4" fill="#D9FF35">−86% ON-PREM</text>
    </svg>
  );
}

export default function Cases() {
  const f = cases.feature;
  return (
    <section className="section-pad-sm">
      <div className="section-tag">
        <span><span className="num">09</span> · Case studies</span>
        <span>Production engagements · Five core practices</span>
      </div>
      <div className="container">
        <div className="section-head">
          <h2 className="display-2xl">Engagements that <em className="serif-em" style={{ color: "var(--ng-lime)" }}>compound.</em></h2>
          <p className="right">
            Three engagements that show the shape of how we work — when hyper-automation, agentic AI and custom software are
            sequenced together rather than bought as separate workstreams.
          </p>
        </div>

        <Link className="case-feature" href="/case" style={{ cursor: "pointer" }}>
          <div className="l">
            <div className="tag">{f.tag}</div>
            <div className="client">{f.client}</div>
            <h3>A treasury close that <em>runs overnight,</em><br />not over three days.</h3>
            <p>{f.summary}</p>
            <div className="metrics">
              {f.metrics.map((m, i) => (
                <div key={i}>
                  <div className="v">{m.v}</div>
                  <div className="k">{m.k}</div>
                </div>
              ))}
            </div>
            <span className="read">Read the case <Arr /></span>
          </div>
          <div className="r">
            <CaseFeatureDash />
          </div>
        </Link>

        <div className="case-secondary-grid">
          {cases.secondary.map((c) => (
            <Link key={c.id} className="case-secondary" href="/case">
              <div className="tag">{c.tag}</div>
              <div className="client">{c.client}</div>
              <h3>{c.title}</h3>
              <p>{c.summary}</p>
              <CaseSecondaryViz id={c.id} />
              <div className="metrics">
                {c.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="v">{m.v}</div>
                    <div className="k">{m.k}</div>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
