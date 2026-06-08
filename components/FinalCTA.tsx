// Norton-Gauss · final CTA (ported from src/sections.jsx)
import Link from "next/link";
import { Arr } from "./icons";

export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="inner">
        <span className="eyebrow">12 · Next step</span>
        <h2>Let&apos;s make your strategy <em className="serif-em">operational.</em></h2>
        <p>
          A 45-minute working session with a partner. We bring a perspective on your operating constraint. You leave with a
          sharper question and a concrete next move — useful whether or not we ever work together.
        </p>
        <div className="ctas">
          <Link className="btn primary" href="/book"><Arr />Book a call</Link>
          <a className="btn ghost" href="#"><Arr />Capability deck</a>
        </div>
      </div>
    </section>
  );
}
