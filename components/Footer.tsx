// Norton-Gauss · footer (ported from src/sections.jsx)
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="top">
          <div className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-wordmark-white.png" alt="Norton-Gauss" />
            <p>
              A senior consulting and engineering partner. We help enterprises turn fragmented, manual
              operations into intelligent, automated and scalable digital systems — across hyper-automation,
              agentic AI, custom software, cloud &amp; edge, and digital transformation.
            </p>
            <div className="addr">sales@nortongauss.com · www.nortongauss.com</div>
          </div>
          <div>
            <h5>Practices</h5>
            <ul>
              <li><Link href="/practices">Hyper-Automation</Link></li>
              <li><Link href="/practices">Agentic AI</Link></li>
              <li><Link href="/practices">Digital Transformation</Link></li>
              <li><Link href="/practices">Custom Software</Link></li>
              <li><Link href="/practices">Cloud &amp; Edge</Link></li>
            </ul>
          </div>
          <div>
            <h5>Industries</h5>
            <ul>
              <li><a href="#">Financial Services</a></li>
              <li><a href="#">Telecom</a></li>
              <li><a href="#">Retail &amp; Consumer</a></li>
              <li><a href="#">Manufacturing &amp; Logistics</a></li>
              <li><a href="#">Platform Businesses</a></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="#">About</a></li>
              <li><Link href="/case">Case studies</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:sales@nortongauss.com">sales@nortongauss.com</a></li>
              <li><a href="#">EMEA · Paris</a></li>
              <li><a href="#">NAR · Sheridan</a></li>
              <li><a href="#">LATAM · São Paulo</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <span>© 2026 Norton-Gauss LLC · All rights reserved</span>
          <span className="tagline serif">Drive disruptive change.</span>
          <span>v 2.0 · 2026.05</span>
        </div>
      </div>
    </footer>
  );
}
