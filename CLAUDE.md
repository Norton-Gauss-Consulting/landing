
## Design fidelity (source of truth)

- Each task comes with a **Claude Design handoff URL**. That design is the **single source of truth** — pull it and match it **exactly**: layout, grid, spacing, type scale, color, radii, motion/animation, copy, responsive behavior, and interaction states.
- **No creative deviation.** Do not redesign, "improve," reorder, add, or drop sections, rewrite copy, or substitute components unless explicitly told to. Build what the design shows, nothing more, nothing less.
- Fidelity is to **what the user sees and how it behaves**. The production porting rules above (no in-browser Babel, strip TweaksPanel, assets to /public, dynamic-import the 3D hero, real build pipeline) change *how* it's built — never the visual result.
- If any porting choice would alter appearance or behavior, **match the design and flag it**. If this file ever conflicts with the design on something visual, the **design wins** — and flag the conflict.
