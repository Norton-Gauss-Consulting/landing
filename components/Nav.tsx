"use client";

// Norton-Gauss · primary nav (ported from src/sections.jsx)
// The handoff is a client-routed SPA; this port maps each top-level
// destination onto a Next route, and keeps the in-page scroll links
// (Framework · Footprint · About) for sections that live on the home page.
// On narrow viewports the horizontal links collapse into a hamburger that
// opens a full-height drawer; the wordmark and "Book a call" CTA stay
// reachable at every width.
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Arr } from "./icons";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Smooth-scroll to a home-page section, navigating home first if needed.
  const toSection = (id: string) => {
    setOpen(false);
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const links = (
    <>
      <button className={pathname === "/" ? "active" : ""} onClick={() => go("/")}>Home</button>
      <button className={pathname === "/practices" ? "active" : ""} onClick={() => go("/practices")}>Practices</button>
      <button onClick={() => toSection("framework")}>Framework</button>
      <button onClick={() => toSection("industries")}>Footprint</button>
      <button className={pathname === "/case" ? "active" : ""} onClick={() => go("/case")}>Case</button>
      <button className={pathname.startsWith("/careers") ? "active" : ""} onClick={() => go("/careers")}>Careers</button>
      <button onClick={() => toSection("about")}>About</button>
    </>
  );

  return (
    <>
      <header className="nav">
      <div className="nav-inner">
        <Link className="nav-logo" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-mark-color.png" alt="" />
          <span className="wm">Norton-Gauss</span>
        </Link>
        <nav className="nav-links">{links}</nav>
        <div className="nav-actions">
          <Link className="btn primary nav-cta" href="/book">
            <Arr />
            <span className="nav-cta-label">Book a call</span>
          </Link>
          <button
            className={`nav-burger${open ? " is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      </header>

      {/* Mobile drawer — rendered outside <header> so its fixed positioning
          is relative to the viewport (the nav's backdrop-filter would
          otherwise establish a containing block and clip the overlay). */}
      <div className={`nav-drawer${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!open}>
        <button className="nav-drawer__scrim" aria-label="Close menu" tabIndex={-1} onClick={() => setOpen(false)} />
        <div className="nav-drawer__panel">
          <nav className="nav-drawer__links">{links}</nav>
          <Link className="btn primary nav-drawer__cta" href="/book" onClick={() => setOpen(false)}>
            <Arr />
            Book a call
          </Link>
        </div>
      </div>
    </>
  );
}
