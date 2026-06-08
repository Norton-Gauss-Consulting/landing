// Norton-Gauss · Job detail page (ported from JobDetailPage in src/careers.jsx)
import { Fragment } from "react";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubpageMesh from "@/components/SubpageMesh";
import { Arr } from "@/components/icons";
import { careers } from "@/lib/content";

export function generateStaticParams() {
  return careers.jobs.map((j) => ({ id: j.id }));
}

export default function JobDetail({ params }: { params: { id: string } }) {
  const job = careers.jobs.find((j) => j.id === params.id) || careers.jobs[0];
  return (
    <>
      <Topbar />
      <Nav />
      <div className="page-enter">
        <div className="container">
          <Link className="job-back" href="/careers">
            <span className="arr"><Arr /></span> All open roles
          </Link>
        </div>

        <section className="job-hero">
          <SubpageMesh side="right" size="sm" />
          <div className="container">
            <span className="eyebrow">{job.dept} · {job.type}</span>
            <h1 style={{ marginTop: 28 }}>
              {job.title.split(/(\bAgentic\b)/).map((p, i) =>
                p === "Agentic" ? <em key={i}>{p}</em> : <Fragment key={i}>{p}</Fragment>
              )}
            </h1>
            <p className="teaser">{job.teaser}</p>
            <dl className="job-meta-grid">
              <div><dt>Department</dt><dd>{job.dept}</dd></div>
              <div><dt>Location</dt><dd>{job.location}</dd></div>
              <div><dt>Type</dt><dd>{job.type}</dd></div>
              <div><dt>Compensation</dt><dd style={{ color: "var(--ng-lime)" }}>{job.comp}</dd></div>
            </dl>
          </div>
        </section>

        <section className="job-section">
          <div className="container">
            <div className="row">
              <h2>About the role.</h2>
              <div className="body"><p>{job.about}</p></div>
            </div>
          </div>
        </section>

        <section className="job-section">
          <div className="container">
            <div className="row">
              <h2>What you&apos;ll do.</h2>
              <div className="body">
                <ul>{job.do.map((d, i) => <li key={i}>{d}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section className="job-section">
          <div className="container">
            <div className="row">
              <h2>What you bring.</h2>
              <div className="body">
                <ul>{job.you.map((d, i) => <li key={i}>{d}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        <section className="job-section">
          <div className="container">
            <div className="row">
              <h2>How we hire.</h2>
              <div className="body">
                <p>Four steps. Two weeks end-to-end if we both move quickly.</p>
                <ul>
                  <li><em>Conversation with a partner.</em> 45 minutes. Mostly about your work, your motivations and the kind of mandates you&apos;d want to lead.</li>
                  <li><em>Deep-dive interview with two of your peers.</em> 90 minutes. Real architecture / strategy questions on problems we&apos;re working on now.</li>
                  <li><em>Reverse interview.</em> You meet two more of the team and ask whatever you&apos;d need to decide.</li>
                  <li><em>Offer in 48 hours.</em> If we both want this to happen, we do not slow it down.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="job-apply-cta">
          <div className="container">
            <h2>Ready to <em>build with us</em>?</h2>
            <p>Send us a CV, a portfolio, or just a couple of paragraphs about the work you&apos;re proudest of. We read everything.</p>
            <div className="btns">
              <a className="btn primary" href={`mailto:sales@nortongauss.com?subject=Application · ${encodeURIComponent(job.title)}`}>
                <Arr />Apply now
              </a>
              <Link className="btn ghost" href="/careers"><Arr />Browse other roles</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
