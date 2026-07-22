# Design system (`design` const + `var(--osd-X)`)

A slide can declare its own typed design tokens at the top of `index.tsx`:

```tsx
import type { DesignSystem, Page } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#f7f5f0', text: '#1a1814', accent: '#6d4cff' },
  fonts: {
    display: 'Georgia, "Times New Roman", serif',
    body: '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
  },
  typeScale: { hero: 168, body: 38 },
  radius:    12,
};
```

`export` it (rather than plain `const`) so the framework can read the object and inject CSS variables at the canvas root automatically.

The shape is intentionally minimal — it only covers what the Design panel can currently tweak. The runtime **derives** extra CSS variables from that object (no extra fields in the slide file):

| Variable | Source |
| --- | --- |
| `--osd-muted` | mix of `palette.text` + `palette.bg` |
| `--osd-line` | lighter mix for dividers |
| `--osd-size-heading` | `round(typeScale.hero × 0.48)` |
| `--osd-padding` | `100px 120px` (slide canvas inset) |
| `--osd-gap` | `round(typeScale.body × 0.85)` px — vertical rhythm in `deck-template` layouts |

Semantic typography in **`deck-template/index.tsx`** should use these vars. Theme-only extras (cards, glow, mono) stay in `themes/<id>.md` until a theme US realigns them.

## Design panel vs Inspect

| | **Design (palette icon)** | **Inspect** |
| --- | --- | --- |
| Edits | `export const design` in the slide file | Inline `style` on the **selected** DOM node |
| Scope | Whole slide (`--osd-*` on canvas) | One element (may override a token, e.g. literal `fontSize` after you change size) |
| Text | Not for deck copy — use **CONTENT** + agent/`apply-comments` | Content field for simple text nodes only |
| Spacing | `--osd-padding`, `--osd-gap` via `typeScale.body` / derived vars | **Margin top / bottom** on the selected element |

Prefer **CONTENT** and shared layout (`gap: var(--osd-gap)`) before per-element margins. Use Inspect margin for one-off tweaks.

## Authoring contract gate

Slides are classified **`full`** vs **`legacy`** at dev time (`authoring-contract.md`). Design and Inspect **disable file writes** when `legacy`. Preview, present, and export are never blocked.

Motion and one-off palette keys outside the panel still belong as named constants in the slide when needed.

## Two consumption surfaces

There are **two consumption surfaces**; both may appear in the same slide:

- **`var(--osd-X)` for visual properties (color, font, font-size, radius)** — these get instant updates while the user drags a slider in the Design panel, before any file write.
  ```tsx
  <div style={{ background: 'var(--osd-bg)', color: 'var(--osd-text)', borderRadius: 'var(--osd-radius)', fontFamily: 'var(--osd-font-body)', fontSize: 'var(--osd-size-body)' }}>
  ```
  Available vars: `--osd-bg`, `--osd-text`, `--osd-accent`, `--osd-muted`, `--osd-line`, `--osd-font-display`, `--osd-font-body`, `--osd-size-hero`, `--osd-size-heading`, `--osd-size-body`, `--osd-radius`, `--osd-padding`, `--osd-gap`.

- **Direct `design.X` reads** — when you need a JS number for arithmetic or to label something in the UI. These update via HMR after the panel commits the file, not while dragging.
  ```tsx
  <p>{design.typeScale.hero}px</p>
  ```

## The Design panel

The dev UI has a **Design** button in the slide header (next to Inspect). Edits update an in-memory draft and the live-preview overlay; a floating Save / Discard bar at the bottom of the canvas commits or reverts. The const stays the single source of truth — production builds bake the saved values.

**Default to using it.** Every new slide should declare a `design` const so it stays tweakable from the panel after generation — this is the expected baseline. Only fall back to plain top-of-file constants (`const palette = { bg: …, text: …, accent: … }`, referenced directly in styles) for a one-off slide whose palette is intentionally locked and not meant to be re-themed. Both styles can coexist across slides — the panel only operates on the *currently viewed* slide.

## Format constraints (for the panel's AST writer)

- Must be `export const design: DesignSystem = { … }` (or `as DesignSystem` / `satisfies DesignSystem`) at module top level. (The panel's parser also tolerates a non-exported const, but the runtime reads `design` off the module's exports — without `export`, every `var(--osd-X)` is unresolved.)
- Object initializer must be a literal — no spreads, no helper calls. Plain values only.
- `DesignSystem` must be imported from `@open-slide/core` (the panel adds the import automatically when creating a fresh block).
