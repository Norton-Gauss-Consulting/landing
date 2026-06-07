// Norton-Gauss · manifesto / about (ported from src/sections.jsx)
import { Fragment } from "react";
import { manifesto, type H2Part } from "@/lib/content";

function ManifestoH2({ parts }: { parts: H2Part[] }) {
  return (
    <h2>
      {parts.map((p, i) => {
        if (typeof p === "string") return <Fragment key={i}>{p}</Fragment>;
        if (p.italic)
          return (
            <em key={i} className="serif-em" style={{ color: p.lime ? "var(--ng-lime)" : undefined }}>
              {p.text}
            </em>
          );
        return <Fragment key={i}>{p.text}</Fragment>;
      })}
    </h2>
  );
}

export default function Manifesto() {
  return (
    <section className="section-pad-sm" id="about">
      <div className="section-tag">
        <span><span className="num">11</span> · Manifesto</span>
        <span>The meaning of the name</span>
      </div>
      <div className="container">
        <div className="manifesto">
          <div className="l">
            <div className="logo-stage">
              <div className="logo-anim">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="morph bw" src="/assets/logo-mark-white.png" alt="" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="morph color" src="/assets/logo-mark-color.png" alt="" />
              </div>
              <div className="caption">GREY → GREEN · THE TRANSFORMATION LOOP</div>
            </div>
            <div className="manifesto-stats">
              {manifesto.stats.map((s, i) => (
                <div key={i} className="cell">
                  <div className="v">{s.v}</div>
                  <div className="k">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="r">
            <span className="eyebrow">About · Brand DNA</span>
            <ManifestoH2 parts={manifesto.h2} />
            <div className="body">
              {manifesto.body.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
