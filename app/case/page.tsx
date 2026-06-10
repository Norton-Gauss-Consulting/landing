// Norton-Gauss · Case studies index. Not in the handoff — composed from the
// existing design system: the home "Case studies" section header (verbatim
// copy) plus the `.case-secondary` card used across the home cases grid. Each
// card links to its /case/[slug] detail. Maps over the single `caseStudies`
// source, so adding a case adds a card here automatically.
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import Link from "next/link";
import { caseStudies } from "@/lib/content";

export default function CaseIndex() {
  return (
    <>
      <Topbar />
      <Nav />
      <div className="page-enter">
        <section className="section-pad-sm">
          <div className="section-tag">
            <span><span className="num">09</span> · Case studies</span>
            <span>Production engagements · Five core practices</span>
          </div>
          <div className="container">
            <div className="section-head">
              <h2 className="display-2xl">Engagements that <em className="serif-em" style={{ color: "var(--ng-lime)" }}>compound.</em></h2>
              <p className="right">
                Three engagements that show the shape of how we work — when hyper-automation, agentic AI and custom software are
                sequenced together rather than bought as separate workstreams. Figures are specific to each engagement and were
                measured during post-go-live operating reviews.
              </p>
            </div>

            <div className="case-secondary-grid">
              {caseStudies.map((s) => (
                <Link key={s.slug} className="case-secondary" href={`/case/${s.slug}`}>
                  <div className="tag">{s.card.tag}</div>
                  <div className="client">{s.card.client}</div>
                  <h3>{s.card.title}</h3>
                  <p>{s.card.summary}</p>
                  <div className="metrics">
                    {s.card.metrics.map((m, i) => (
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
        </section>

        <FinalCTA />
      </div>
      <Footer />
    </>
  );
}
