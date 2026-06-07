// Norton-Gauss · manifesto banner (ported from src/new-sections.jsx)
import { manifestoBanner as b } from "@/lib/content";

export default function ManifestoBanner() {
  return (
    <section className="manifesto-banner" data-anim="manifesto-banner">
      <div className="container">
        <h2>
          <span className="banner-pre">{b.pre}</span>{" "}
          <span className="banner-post">
            {b.post}
            <em>{b.em}</em>
          </span>
        </h2>
        <div className="sub">{b.sub}</div>
      </div>
    </section>
  );
}
