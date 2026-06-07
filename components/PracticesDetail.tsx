"use client";

// Norton-Gauss · practices in depth (ported from src/new-sections.jsx)
import { useState } from "react";
import { useRouter } from "next/navigation";
import { practicesDetail as data } from "@/lib/content";

const NArr = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
    <path d="M4 10L10 4M10 4H5.5M10 4V8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PracticesDetail() {
  const router = useRouter();
  const items = data.items;
  const [active, setActive] = useState(0);
  const p = items[active];

  return (
    <section className="section-pad-sm" data-anim="pdetail">
      <div className="section-tag">
        <span><span className="num">04</span> · Practices in depth</span>
        <span>Pod · Stack · Outcome contract</span>
      </div>
      <div className="container">
        <div className="section-head">
          <h2 className="display-2xl">
            {data.h2A}<em className="serif-em" style={{ color: "var(--ng-lime)" }}>{data.h2Em}</em>{data.h2B}
          </h2>
          <p className="right">{data.sub}</p>
        </div>

        <div className="pdetail-tabs">
          {items.map((it, i) => (
            <button
              key={it.id}
              className={`pdetail-tab ${i === active ? "active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <div className="code">{it.num} · {it.code}</div>
              <div className="ttl">{it.title}</div>
              <div className="cat">{it.category}</div>
            </button>
          ))}
        </div>

        <div className="pdetail-card" key={p.id}>
          <div className="head" style={{ display: "flex", flexDirection: "column", minHeight: 360 }}>
            <div className="num">{p.num} / 07 · {p.code}</div>
            <h3>{p.title}.</h3>
            <div className="cat">{p.category}</div>
            <p>{p.pitch}</p>
            <div className="pod">POD · {p.pod}</div>
          </div>
          <div className="stack" style={{ display: "flex", flexDirection: "column", minHeight: 360 }}>
            <h5>Stack</h5>
            <ul>{p.stack.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
          <div className="outcomes" style={{ display: "flex", flexDirection: "column", minHeight: 360 }}>
            <h5>Outcome contract</h5>
            <ul>
              {p.outcomes.map((o, i) => (
                <li key={i}>
                  <span>{o.split(" ").slice(0, -1).join(" ")}</span>
                  <span>{o.split(" ").slice(-1)[0]}</span>
                </li>
              ))}
            </ul>
            <div className="proof">{p.proof}</div>
          </div>
        </div>

        <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="mono">{p.code} · Full spec on the Practices page</span>
          <button className="btn ghost" onClick={() => router.push("/practices")}><NArr />See all practices</button>
        </div>
      </div>
    </section>
  );
}
