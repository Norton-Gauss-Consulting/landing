// Norton-Gauss · thesis (ported from src/sections.jsx)
import { Cross, Check } from "./icons";
import { thesis } from "@/lib/content";

export default function Thesis() {
  return (
    <section className="section-pad">
      <div className="section-tag">
        <span><span className="num">01</span> · The thesis</span>
        <span>Why agentic now</span>
      </div>
      <div className="container">
        <div className="section-head" style={{ marginBottom: 56 }}>
          <h2 className="thesis-h">
            Software used to <em className="serif-em" style={{ color: "var(--ng-lime)" }}>wait.</em> <br />Now it{" "}
            <em className="serif-em" style={{ color: "var(--ng-lime)" }}>thinks.</em>
          </h2>
          <p className="right">
            Agentic systems collapse the gap between intent and operation. The work isn&apos;t deploying a model — it&apos;s
            rebuilding the operating model so machines do the cognitive work, humans set the policy, and the business can
            finally tell the difference.
          </p>
        </div>

        <div className="thesis-grid">
          <div className="thesis-col then">
            <div className="tag">{thesis.then.tag}</div>
            <h3>{thesis.then.h}</h3>
            <ul>
              {thesis.then.items.map((t, i) => (
                <li key={i}>
                  <span className="ico"><Cross /></span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="thesis-col now">
            <div className="arrow-sep">→</div>
            <div className="tag">{thesis.now.tag}</div>
            <h3>{thesis.now.h}</h3>
            <ul>
              {thesis.now.items.map((t, i) => (
                <li key={i}>
                  <span className="ico"><Check /></span>
                  <span><strong>{t.s}</strong> {t.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
