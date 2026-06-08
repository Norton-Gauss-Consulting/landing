// Norton-Gauss · Case study page (ported from CaseStudyPage in src/pages.jsx)
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import SubpageMesh from "@/components/SubpageMesh";
import { caseDetail as cs } from "@/lib/content";

export default function CaseStudyPage() {
  return (
    <>
      <Topbar />
      <Nav />
      <div className="page-enter">
        <section className="cs-hero">
          <SubpageMesh side="right" size="md" />
          <div className="container">
            <div className="top">
              <div>
                <span className="eyebrow">{cs.tag}</span>
                <h1 style={{ marginTop: 28 }}>
                  {cs.titleA} <em className="serif-em">{cs.titleEm}</em>
                  <br />
                  {cs.titleB}
                </h1>
                <p className="lede big">{cs.subtitle}</p>
              </div>
              <dl className="meta">
                <div><dt>Client</dt><dd>{cs.client}</dd></div>
                <div><dt>Region</dt><dd>{cs.region}</dd></div>
                <div><dt>Duration</dt><dd>{cs.duration}</dd></div>
                <div><dt>Team</dt><dd>{cs.team}</dd></div>
              </dl>
            </div>
          </div>
        </section>

        {cs.sections.map((s, i) => (
          <section className="cs-section" key={i}>
            <div className="container">
              <div className="row">
                <h2>{s.h}.</h2>
                <div className="body">
                  {s.body.map((p, j) => (
                    <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="cs-section">
          <div className="container">
            <div className="row">
              <h2>The results.</h2>
              <div className="body">
                <p>
                  Twelve months post platform go-live, with the operating model embedded in the bank&apos;s treasury team
                  and the agent fleet trained on a full close cycle. All figures were measured during post-go-live operating
                  reviews and reflect this engagement, not a portfolio average.
                </p>
                <div className="cs-results-grid">
                  {cs.results.map((r, i) => (
                    <div key={i}>
                      <div className="v">{r.v}</div>
                      <div className="k">{r.k}</div>
                      <div className="desc">{r.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cs-quote">
          <div className="container">
            <blockquote>
              <span dangerouslySetInnerHTML={{ __html: cs.quote.text.replace(/own/, "<em>own</em>") }} />
              <span className="who">— {cs.quote.who}</span>
            </blockquote>
          </div>
        </section>

        <section className="cs-section">
          <div className="container">
            <div className="row">
              <h2>The timeline.</h2>
              <div className="body">
                <p>
                  Five phases over fourteen months. The same shape as every Norton-Gauss engagement — Discover, Diagnose,
                  Design, Build, Operate.
                </p>
                <div className="cs-timeline">
                  {cs.timeline.map((t, i) => (
                    <div key={i} className="step">
                      <div className="phase">{t.phase}</div>
                      <h4>{t.h}</h4>
                      <p>{t.d}</p>
                      <div className="dur">{t.dur}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <FinalCTA />
      </div>
      <Footer />
    </>
  );
}
