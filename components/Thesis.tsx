// Norton-Gauss · thesis (ported from src/sections.jsx)
import { Cross, Check } from "./icons";
import { thesis } from "@/lib/content";

export default function Thesis() {
  return (
    <section className="section-pad">
      <div className="section-tag">
        <span><span className="num">01</span> · The thesis</span>
        <span>Why operations stall</span>
      </div>
      <div className="container">
        <div className="section-head" style={{ marginBottom: 56 }}>
          <h2 className="thesis-h">
            Operations used to <em className="serif-em" style={{ color: "var(--ng-lime)" }}>wait.</em> <br />Now they can{" "}
            <em className="serif-em" style={{ color: "var(--ng-lime)" }}>run.</em>
          </h2>
          <p className="right">
            The gap is rarely strategy — it is execution. Manual handoffs, disconnected systems and pilots that never reach
            production keep good decisions waiting. We rebuild the operating model so routine work runs as governed systems,
            people set policy and approve exceptions, and the business can measure the difference.
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
