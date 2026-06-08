// Norton-Gauss · extra cases grid (ported from src/new-sections.jsx)
import Link from "next/link";
import { additionalCases } from "@/lib/content";

export default function ExtraCases() {
  if (!additionalCases.length) return null;
  return (
    <div className="container" data-anim="extra-cases" style={{ marginTop: 32 }}>
      <h4 className="mono" style={{ marginBottom: 18, color: "var(--ng-ink-dim)" }}>More from the 2024–2026 portfolio · representative engagements</h4>
      <div className="cases-extra-grid" data-anim-child-list>
        {additionalCases.map((c) => (
          <Link key={c.id} className="case-secondary" data-anim-child href="/case">
            <div className="tag">{c.tag}</div>
            <div className="client">{c.client}</div>
            <h3>{c.title}</h3>
            <p>{c.summary}</p>
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
  );
}
