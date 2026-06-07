import type { Config } from "tailwindcss";

/**
 * Norton-Gauss · Tailwind theme
 * Brand colors per the branding guideline:
 *   lime  #D9FF35  ·  grey #808080  ·  teal #234234  ·  black #000000
 * The full surface/ink token set mirrors the CSS custom properties defined
 * in app/globals.css so utilities and the ported design CSS stay in sync.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lime: "#D9FF35",
          grey: "#808080",
          teal: "#234234",
          black: "#000000",
        },
        ng: {
          lime: "#D9FF35",
          "lime-bright": "#E6FF60",
          grey: "#808080",
          teal: "#234234",
          bg: "var(--ng-bg)",
          surface: "var(--ng-surface)",
          "surface-2": "var(--ng-surface-2)",
          line: "var(--ng-line)",
          "line-strong": "var(--ng-line-strong)",
          ink: "var(--ng-ink)",
          "ink-mute": "var(--ng-ink-mute)",
          "ink-dim": "var(--ng-ink-dim)",
        },
      },
      fontFamily: {
        // Ancorli = primary (display), Techno Nue = secondary (body).
        // Arial is the brand's official alternate per the guideline.
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
        serif: ["var(--font-serif)"],
      },
      maxWidth: {
        ng: "1440px",
        "ng-wide": "1680px",
      },
      transitionTimingFunction: {
        ng: "cubic-bezier(.22,.61,.36,1)",
        "ng-out": "cubic-bezier(.16,.84,.34,1)",
        "ng-in-out": "cubic-bezier(.65,0,.35,1)",
      },
    },
  },
  plugins: [],
};

export default config;
