// Norton-Gauss · Practices page (ported from ServicesPage in src/pages.jsx)
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import SubpageMesh from "@/components/SubpageMesh";
import { services } from "@/lib/content";

export default function PracticesPage() {
  return (
    <>
      <Topbar />
      <Nav />
      <div className="page-enter">
        <section className="svc-hero">
          <SubpageMesh side="right" size="lg" />
          <div className="container">
            <span className="eyebrow">Services · 07 practices</span>
            <h1 style={{ marginTop: 24 }}>What we <em className="serif-em">do.</em></h1>
            <p className="lede big">
              Seven practices, one operating discipline. Each ships independently, and they compose into the kind of
              transformation where every later phase is cheaper than the one before it.
            </p>
          </div>
        </section>

        <section style={{ padding: "40px 0 100px" }}>
          <div className="container">
            {services.map((s) => (
              <article key={s.id} className="svc-detail">
                <div className="num">{s.num}</div>
                <div>
                  <div className="meta">{s.meta}</div>
                  <h3>{s.title}.</h3>
                  <p>{s.summary}</p>
                  <div className="kpi">
                    {s.kpi.map((k, i) => (
                      <div key={i}>
                        <div className="v">{k.v}</div>
                        <div className="k">{k.k}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="deliverables">
                  <h5>What&apos;s included</h5>
                  <ul>{s.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <FinalCTA />
      </div>
      <Footer />
    </>
  );
}
