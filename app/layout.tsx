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
        {/* Functional faces the design relies on (mono eyebrows, serif lime
            italics). Brand display/body faces are wired via @font-face in
            globals.css (Ancorli / Techno Nue, Arial fallback). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
