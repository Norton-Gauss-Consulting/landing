import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Norton-Gauss · Operating Cortex",
  description:
    "Norton-Gauss builds the operating cortex for the world's most demanding enterprises — agentic AI, hyper-automation, cloud & edge and observability sequenced into compounding advantage.",
  icons: { icon: "/assets/favicon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {/* Handoff stand-ins (Bricolage Grotesque / Inter Tight) so the
            preview matches the design until the real brand files are dropped
            into /public/fonts; Ancorli / Techno Nue take precedence via
            @font-face in globals.css when present, Arial is the alternate.
            JetBrains Mono + Instrument Serif are functional faces the design
            relies on (mono eyebrows, serif lime italics). */}
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
      <body>{children}</body>
    </html>
  );
}
