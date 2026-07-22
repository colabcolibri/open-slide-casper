---
kit-doc: pattern
id: cover-centered
kind: layout
summary: "First page or ceremonial opener: one hero line + subtitle. Avoid bullet lists on the cover — move lists to `title-body-footer-bullets`."
formats: both
content-keys:
  - cover.title
  - cover.subtitle
  - optional cover.eyebrow
  - footerLabel
page-types:
  - ../page-types/cover.md
---
# Pattern — cover-centered

## When to use

First page or ceremonial opener: one hero line + subtitle. Avoid bullet lists on the cover — move lists to `title-body-footer-bullets`.

## Prerequisites

`PageLayout`, `DeckFooter`, and typography helpers from `deck-template` (or `title-body-footer.md`). Use `bodyAlign="center"`.

## Variants

Single variant in this entry; deck-template `Cover` page is the canonical full-deck example.

## Skeleton (paste into `index.tsx`)

Assumes `PageLayout`, `Eyebrow`, `DisplayTitle`, `BodyCopy`, and `CONTENT.cover` exist (as in `deck-template`).

```tsx
const CoverCentered: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel} bodyAlign="center">
    {CONTENT.cover.eyebrow ? <Eyebrow>{CONTENT.cover.eyebrow}</Eyebrow> : null}
    <DisplayTitle>{CONTENT.cover.title}</DisplayTitle>
    <BodyCopy>{CONTENT.cover.subtitle}</BodyCopy>
  </PageLayout>
);
```

```tsx
// CONTENT excerpt:
cover: {
  eyebrow: 'optional · 01',
  title: 'The big idea',
  subtitle: 'Audience or promise in one line.',
},
```

## Tokens and layout

Centered body band uses `bodyAlign="center"`; title uses `var(--osd-size-hero)`, subtitle `var(--osd-muted)` via `BodyCopy`.

## Related

- `../page-types/cover.md`
- `INDEX.md` — `cover-centered`
