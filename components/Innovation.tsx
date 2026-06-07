// Norton-Gauss · innovation / alpha partner (ported from src/new-sections.jsx)
import SplineMagnet from "./SplineMagnet";
import { innovation as i } from "@/lib/content";

const NArr = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M4 10L10 4M10 4H5.5M10 4V8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Innovation() {
  return (
    <section className="innovation-section innovation-spline" data-anim="innovation">
      <div className="section-tag" style={{ borderTop: 0 }}>
        <span><span className="num">10</span> · Innovation partner</span>
        <span>Design partner · Alpha programs · Norton-Gauss Labs</span>
      </div>
      {/* Magnetic-field 3D stage — fills the right half, behind the cards */}
      <SplineMagnet />

      <div className="container innovation-inner">
        <div>
          <h2 className="innovation-h2">
            {i.headlineA}<em>{i.headlineEm}</em>{i.headlineB}
          </h2>
          <div className="innovation-tags">
            {i.tags.map((t, j) => <span key={j}>{t}</span>)}
          </div>
          <p className="innovation-sub">{i.sub}</p>
          <div className="innovation-ctas">
            <a className="btn primary" href="#"><NArr />Talk to us</a>
            <a className="btn ghost" href="#"><NArr />Norton-Gauss Labs</a>
          </div>
        </div>
        <div className="innovation-offerings" data-anim-child-list>
          {i.offerings.map((o, j) => (
            <div key={j} className="innovation-offering" data-anim-child>
              <div className="tag">{o.tag}</div>
              <h4>{o.h}</h4>
              <p>{o.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
