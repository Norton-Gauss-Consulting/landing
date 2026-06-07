
## Design fidelity (source of truth)

- Each task comes with a **Claude Design handoff URL**. That design is the **single source of truth** — pull it and match it **exactly**: layout, grid, spacing, type scale, color, radii, motion/animation, copy, responsive behavior, and interaction states.
- **No creative deviation.** Do not redesign, "improve," reorder, add, or drop sections, rewrite copy, or substitute components unless explicitly told to. Build what the design shows, nothing more, nothing less.
- Fidelity is to **what the user sees and how it behaves**. The production porting rules above (no in-browser Babel, strip TweaksPanel, assets to /public, dynamic-import the 3D hero, real build pipeline) change *how* it's built — never the visual result.
- If any porting choice would alter appearance or behavior, **match the design and flag it**. If this file ever conflicts with the design on something visual, the **design wins** — and flag the conflict.

## Fonts (locked — do not regress)

The design's type system is the **single source of truth**. The font tokens in `app/globals.css` `:root` must be exactly:

```css
--font-display: 'Bricolage Grotesque', system-ui, sans-serif;
--font-body: 'Inter Tight', 'Inter', system-ui, sans-serif;
--font-serif: 'Instrument Serif', 'Times New Roman', serif;
--font-mono: 'JetBrains Mono', ui-monospace, monospace;
```

- **Ancorli** is the brand wordmark face. Use it **only** for the logo/wordmark (via `--font-wordmark` on `.nav-logo .wm`). **Never** add Ancorli (or any brand display face) to `--font-display`, `--font-body`, or any general type token.
- **Techno Nue** is **not** used anywhere in this build. Do not wire it into display or body.
- Do not insert brand display faces ahead of the handoff faces in any font stack. If a branding guideline ever asks to override the display/body type, that conflicts with the design — **the design wins**; flag it instead of applying it.
