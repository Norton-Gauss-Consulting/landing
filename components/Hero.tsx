"use client";

// Norton-Gauss · hero (ported from src/sections.jsx)
import dynamic from "next/dynamic";
import Link from "next/link";
import { Arr } from "./icons";
import Counter from "./Counter";
import OpsFeed from "./OpsFeed";
import { hero, marquee } from "@/lib/content";

// Three.js mesh — client-only dynamic import so `three` never touches SSR.
const HeroMesh = dynamic(() => import("./HeroMesh"), { ssr: false });

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <HeroMesh />
        </div>

        <div className="hero-inner">
          <div className="hero-l">
            <div className="hero-badge">
              <span className="pill">Senior pods, only</span>
              <span className="label">
                Norton-Gauss · Technology consulting &amp; engineering · 2026
              </span>
            </div>
            <h1 className="hero-h1">
              <span className="row">
                <span className="word">Strategy</span>
              </span>
              <span className="row">
                <span className="word">
                  that <em className="lime-italic">ships</em>
                </span>
              </span>
              <span className="row">
                <span className="word">into operations.</span>
              </span>
            </h1>
            <p className="hero-sub">
              Norton-Gauss is a <strong>senior consulting and engineering</strong> partner. We help
              enterprises turn fragmented, manual operations into intelligent, automated and scalable
              digital systems — across <strong>hyper-automation, agentic AI, custom software, cloud
              &amp; edge</strong>, and digital transformation.
            </p>
            <div className="hero-ctas">
              <Link className="btn primary" href="/book">
                <Arr />
                Book a call
              </Link>
              <Link className="btn ghost" href="/practices">
                <Arr />
                Explore practices
              </Link>
            </div>
          </div>

          <div className="hero-r">
            <OpsFeed />
            <div className="hero-counters">
              {hero.counters.map((c, i) => (
                <div key={i}>
                  <div className="v">
                    <Counter value={c.v} unit={c.unit} />
                  </div>
                  <div className="k">{c.k}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="hero-marquee">
        <div className="hero-marquee-track">
          {Array.from({ length: 2 }).flatMap((_, ii) =>
            marquee.map((t, i) => (
              <span key={`${ii}-${i}`} className={i % 2 === 1 ? "muted" : ""}>
                {t}
              </span>
            ))
          )}
        </div>
      </div>
    </>
  );
}
