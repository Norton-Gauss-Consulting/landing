"use client";

// Norton-Gauss · Careers page body (ported from src/careers.jsx)
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Arr } from "./icons";
import SubpageMesh from "./SubpageMesh";
import FinalCTA from "./FinalCTA";
import { careers as c } from "@/lib/content";

export default function CareersPage() {
  const router = useRouter();
  const [dep, setDep] = useState("All");
  const filtered = useMemo(() => (dep === "All" ? c.jobs : c.jobs.filter((j) => j.dept === dep)), [dep]);
  const openJob = (id: string) => router.push(`/careers/${id}`);

  return (
    <div className="page-enter">
      <section className="careers-hero">
        <SubpageMesh side="right" size="md" />
        <div className="container">
          <div className="top">
            <div>
              <span className="eyebrow">{c.eyebrow}</span>
              <h1 style={{ marginTop: 28 }}>
                {c.h1A}<em>{c.h1Em}</em>{c.h1B}
              </h1>
              <p className="lede big">{c.sub}</p>
              <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
                <a className="btn primary" href="#open-roles"><Arr />See open roles</a>
                <a className="btn ghost" href="mailto:sales@nortongauss.com"><Arr />Talk to us</a>
              </div>
            </div>
            <div className="quick">
              <div className="row">
                <div>
                  <div className="lbl">Open roles</div>
                  <div className="v">{c.jobs.length}</div>
                </div>
                <div>
                  <div className="lbl">Departments</div>
                  <div className="v">{c.departments.length - 1}</div>
                </div>
              </div>
              <div className="row">
                <div>
                  <div className="lbl">HQs</div>
                  <div className="v">3</div>
                </div>
                <div>
                  <div className="lbl">Senior firm</div>
                  <div className="v">120+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="careers-perks">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 48 }}>
            <h2 className="display-lg">Why people <em className="serif-em" style={{ color: "var(--ng-lime)" }}>stay.</em></h2>
            <p className="right">
              We&apos;ve built this firm so senior people can do their best work — outcome contracts, no staffing
              pyramids, async-first across three timezones.
            </p>
          </div>
          <div className="grid">
            {c.perks.map((p, i) => (
              <div key={i} className="cell">
                <div className="ix">{String(i + 1).padStart(2, "0")} / {String(c.perks.length).padStart(2, "0")}</div>
                <h4>{p.k}</h4>
                <p>{p.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-jobs" id="open-roles">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 32 }}>
            <h2 className="display-lg">Open <em className="serif-em" style={{ color: "var(--ng-lime)" }}>roles.</em></h2>
            <p className="right">
              Filter by department, or browse all. Don&apos;t see your role? Email{" "}
              <a href="mailto:sales@nortongauss.com" style={{ color: "var(--ng-lime)" }}>sales@nortongauss.com</a> — we hire
              on signal.
            </p>
          </div>

          <div className="careers-deps">
            {c.departments.map((d) => (
              <button key={d} className={d === dep ? "active" : ""} onClick={() => setDep(d)}>
                {d}
                {d !== "All" && <span style={{ opacity: 0.6, marginLeft: 6 }}>· {c.jobs.filter((j) => j.dept === d).length}</span>}
              </button>
            ))}
          </div>

          <div>
            {filtered.map((job) => (
              <div key={job.id} className="job-row" onClick={() => openJob(job.id)}>
                <div>
                  <div className="ttl">{job.title}</div>
                  <div className="teaser">{job.teaser}</div>
                </div>
                <div className="meta"><strong>{job.dept}</strong></div>
                <div className="meta">{job.location}</div>
                <div className="comp">{job.comp}</div>
                <span className="go"><Arr /></span>
              </div>
            ))}
            {!filtered.length && (
              <div style={{ padding: 60, textAlign: "center", color: "var(--ng-ink-mute)", border: "1px dashed var(--ng-line)", borderRadius: 14 }}>
                No open roles in {dep} right now. Email{" "}
                <a href="mailto:sales@nortongauss.com" style={{ color: "var(--ng-lime)" }}>sales@nortongauss.com</a> with what
                you&apos;d want to build.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="careers-values">
        <div className="container">
          <div className="section-head" style={{ marginBottom: 48 }}>
            <h2 className="display-lg">How we <em className="serif-em" style={{ color: "var(--ng-lime)" }}>actually</em> work.</h2>
            <p className="right">
              Three operating principles you can check against on any given day. If you ever feel they&apos;re slipping, you
              tell a partner.
            </p>
          </div>
          <div className="vals">
            <div className="v">
              <div className="ix">Principle 01</div>
              <h4>Senior people, not staffing pyramids.</h4>
              <p>Every engagement is staffed with senior people. We don&apos;t bill juniors against an account; we hire people who can take a system to production and let them.</p>
            </div>
            <div className="v">
              <div className="ix">Principle 02</div>
              <h4>Outcomes are contracted, not promised.</h4>
              <p>Every program has measurable outputs — MTTR, STP, run-rate save — agreed up front. Your work ships against numbers, not slide decks.</p>
            </div>
            <div className="v">
              <div className="ix">Principle 03</div>
              <h4>Async-first, focus-first.</h4>
              <p>Three HQs across three timezones, written-first culture, and four weeks of protected focus time per year. The work is high-leverage; we treat your attention that way.</p>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
