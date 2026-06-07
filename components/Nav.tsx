"use client";

// Norton-Gauss · primary nav (ported from src/sections.jsx)
// The handoff is a client-routed SPA; this port maps each top-level
// destination onto a Next route, and keeps the in-page scroll links
// (Framework · Footprint · About) for sections that live on the home page.
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Arr } from "./icons";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  // Smooth-scroll to a home-page section, navigating home first if needed.
  const toSection = (id: string) => {
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="nav-logo" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-mark-color.png" alt="" />
          <span className="wm">Norton-Gauss</span>
        </Link>
        <nav className="nav-links">
          <button className={pathname === "/" ? "active" : ""} onClick={() => router.push("/")}>Home</button>
          <button className={pathname === "/practices" ? "active" : ""} onClick={() => router.push("/practices")}>Practices</button>
          <button onClick={() => toSection("framework")}>Framework</button>
          <button onClick={() => toSection("industries")}>Footprint</button>
          <button className={pathname === "/case" ? "active" : ""} onClick={() => router.push("/case")}>Case</button>
          <button className={pathname.startsWith("/careers") ? "active" : ""} onClick={() => router.push("/careers")}>Careers</button>
          <button onClick={() => toSection("about")}>About</button>
        </nav>
        <div className="nav-actions">
          <Link className="btn primary" style={{ padding: "10px 18px", fontSize: 13.5 }} href="/book">
            <Arr />
            Book a call
          </Link>
        </div>
      </div>
    </header>
  );
}
