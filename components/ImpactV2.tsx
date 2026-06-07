// Norton-Gauss · business impact v2 (ported from src/new-sections.jsx)
import Counter from "./Counter";
import { impact as imp } from "@/lib/content";

export default function ImpactV2() {
  return (
    <section className="section-pad-sm" data-anim="impact" id="impact">
      <div className="section-tag">
        <span><span className="num">08</span> · Business impact</span>
        <span>Measurable, instrumented, contracted</span>
      </div>
      <div className="container">
        <div className="section-head">
          <h2 className="display-2xl">Outcomes, <em className="serif-em" style={{ color: "var(--ng-lime)" }}>instrumented.</em></h2>
          <p className="right">{imp.lede}</p>
        </div>

        <div className="impact-strip">
          {imp.big.map((k, i) => (
            <div key={i} data-anim-child>
              <div className="v"><Counter value={k.v} /><sup>{k.sup}</sup></div>
              <div className="label">{k.label}</div>
              <div className="desc">{k.desc}</div>
            </div>
          ))}
        </div>

        <h4 className="mono" style={{ marginTop: 48, marginBottom: 18, color: "var(--ng-ink-dim)" }}>
          Detailed measurable outputs · medians, 2025 portfolio
        </h4>
        <div className="impact-detailed" data-anim-child-list>
          {imp.detailed.map((k, i) => (
            <div key={i} data-anim-child>
              <div className="v"><Counter value={k.v} />{k.unit ? <small>{k.unit}</small> : null}</div>
              <div className="k">{k.k}</div>
              <div className="d">{k.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
