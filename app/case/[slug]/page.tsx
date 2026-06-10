// Norton-Gauss · Case study detail (ported from CaseStudyPage in src/pages.jsx).
// Data-driven: one entry per study in `caseStudies`, mirroring /careers/[id].
import { notFound } from "next/navigation";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import SubpageMesh from "@/components/SubpageMesh";
import { Arr } from "@/components/icons";
import { caseStudies } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export default function CaseStudyDetail({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug);
  if (!study) notFound();
  const cs = study.detail;

  return (
    <>
      <Topbar />
      <Nav />
      <div className="page-enter">
        <div className="container">
          <Link className="job-back" href="/case">
            <span className="arr"><Arr /></span> All case studies
          </Link>
        </div>

        <section className="cs-hero">
          <SubpageMesh side="right" size="md" />
          <div className="container">
            <div className="top">
              <div>
                <span className="eyebrow">{cs.eyebrow}</span>
                <h1 style={{ marginTop: 28 }}>
                  {cs.titleA}
                  {cs.titleEm && <> <em className="serif-em">{cs.titleEm}</em></>}
                  {cs.titleB && <><br />{cs.titleB}</>}
                </h1>
                <p className="lede big">{cs.subtitle}</p>
              </div>
              <dl className="meta">
                <div><dt>Client</dt><dd>{cs.client}</dd></div>
                <div><dt>Region</dt><dd>{cs.region}</dd></div>
                {cs.industry && <div><dt>Industry</dt><dd>{cs.industry}</dd></div>}
                {cs.duration && <div><dt>Duration</dt><dd>{cs.duration}</dd></div>}
                {cs.team && <div><dt>Team</dt><dd>{cs.team}</dd></div>}
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
                {cs.resultsIntro && <p>{cs.resultsIntro}</p>}
                <div className="cs-results-grid">
                  {cs.results.map((r, i) => (
                    <div key={i}>
                      <div className="v">{r.v}</div>
                      <div className="k">{r.k}</div>
                      {r.d && <div className="desc">{r.d}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {cs.quote && (
          <section className="cs-quote">
            <div className="container">
              <blockquote>
                <span dangerouslySetInnerHTML={{ __html: cs.quote.text.replace(/own/, "<em>own</em>") }} />
                <span className="who">— {cs.quote.who}</span>
              </blockquote>
            </div>
          </section>
        )}

        {cs.timeline && cs.timeline.length > 0 && (
          <section className="cs-section">
            <div className="container">
              <div className="row">
                <h2>The timeline.</h2>
                <div className="body">
                  {cs.timelineIntro && <p>{cs.timelineIntro}</p>}
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
        )}

        <FinalCTA />
      </div>
      <Footer />
    </>
  );
}
