import type { Metadata, Viewport } from "next";
import "./globals.css";
import MotionLayer from "@/components/MotionLayer";

export const metadata: Metadata = {
  title: "Norton-Gauss · Operating Cortex",
  description:
    "Norton-Gauss builds the operating cortex for the world's most demanding enterprises — agentic AI, hyper-automation, cloud & edge and observability sequenced into compounding advantage.",
  icons: { icon: "/assets/favicon.png" },
};

// Responsive viewport — explicit so phones/tablets render at device width.
// (Next.js injects a default, but the design must scale across 360–1280+.)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {/* The design handoff's type system — Bricolage Grotesque (display),
            Inter Tight (body), JetBrains Mono (mono eyebrows) and Instrument
            Serif (serif lime italics). These are the source of truth; the
            brand Ancorli face is loaded via @font-face in globals.css and is
            scoped to the logo/wordmark only. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Inter+Tight:wght@300;400;450;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <MotionLayer />
      </body>
    </html>
  );
}
