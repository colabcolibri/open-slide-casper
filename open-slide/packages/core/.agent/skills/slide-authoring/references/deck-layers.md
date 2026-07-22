# Deck layers — CONTENT, templates, structure

Every `slides/<id>/index.tsx` should read top-to-bottom in **three layers**. This keeps copy DRY and makes `/apply-comments` text edits predictable.

| Layer | What | Where in file |
| --- | --- | --- |
| **1. CONTENT** | All user-facing strings (titles, bullets, labels, CTAs, footer deck name) | One `const CONTENT = { … } as const` (or typed object) after imports + `design` |
| **2. Templates** | Reused layout/chrome (`PageLayout`, cards, bullet rows, section headers) | Components declared **after** CONTENT, **before** any `Page` |
| **3. Structure** | One `const Foo: Page = () => …` per slide page | Bottom of file; pages only compose templates + `CONTENT.*` keys |

**Rule:** If the same phrase appears on two pages, it lives in **one** CONTENT key. Pages never duplicate string literals for shared copy.

**Relation to `repeated-elements.md`:** repeated **visual** blocks = explicit sibling components (no `map`). Repeated **words** = CONTENT keys (no copy-paste between pages).

---

## Recommended file order

```txt
imports
export const design …
CONTENT
PageLayout + other templates (paste from page-types/title-body-footer.md first)
const Cover: Page = …
const Body: Page = …
export const meta …
export default [Cover, Body] satisfies Page[];
```

---

## Minimal example

```tsx
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
// …PageLayout + DeckFooter from page-types/title-body-footer.md…

export const design: DesignSystem = { /* … */ };

const CONTENT = {
  deckTitle: 'The big idea',
  footerLabel: 'My deck',
  cover: {
    eyebrow: 'CHAPTER 01',
    title: 'The big idea',
    subtitle: 'A short subtitle.',
  },
  section: {
    heading: 'Section heading',
    bullets: ['One clear point per line', 'Keep to 3–5 bullets'],
  },
} as const;

// --- templates (layer 2) ---
// PageLayout, DeckFooter, optional BulletList …

const BulletList = ({ items }: { items: readonly string[] }) => (
  <ul style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.6, margin: 0, paddingLeft: 48 }}>
    {items.map((line) => (
      <li key={line}>{line}</li>
    ))}
  </ul>
);

// --- structure (layer 3) ---

const Cover: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel} bodyAlign="center">
    <p style={{ fontSize: 28, color: 'var(--osd-accent)', letterSpacing: '0.2em', margin: 0 }}>
      {CONTENT.cover.eyebrow}
    </p>
    <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 'var(--osd-size-hero)', margin: 0 }}>
      {CONTENT.cover.title}
    </h1>
    <p style={{ fontSize: 'var(--osd-size-body)', color: 'var(--osd-muted)', margin: 0 }}>
      {CONTENT.cover.subtitle}
    </p>
  </PageLayout>
);

const Content: Page = () => (
  <PageLayout
    footerLabel={CONTENT.footerLabel}
    head={<h2 style={{ fontSize: 80, margin: 0 }}>{CONTENT.section.heading}</h2>}
  >
    <BulletList items={CONTENT.section.bullets} />
  </PageLayout>
);

export const meta: SlideMeta = {
  title: CONTENT.deckTitle,
  createdAt: '2026-05-16T12:00:00Z',
};
export default [Cover, Content] satisfies Page[];
```

Use `key={line}` on bullets only inside a **template** when the list is data-driven from CONTENT — not for repeating visual cards (see `repeated-elements.md`).

---

## Editing and comments

- **New deck:** draft page outline in scoping, then fill CONTENT keys before writing `Page` components (`create-slide` Step 4 → 6).
- **Text comment on one element:** update the matching CONTENT key; if the string is shared, one key update fixes every page.
- **Large deck:** `grep -n "const .* Page"` to jump to structure; `grep CONTENT` or read the CONTENT block first when changing copy globally.

---

## When to skip

- One-off decorative micro-copy that never repeats (e.g. a single emoji) may stay inline in one page — prefer CONTENT anyway if the deck may grow.
- Do not split CONTENT across multiple files — single `index.tsx` only (`file-contract.md`).
