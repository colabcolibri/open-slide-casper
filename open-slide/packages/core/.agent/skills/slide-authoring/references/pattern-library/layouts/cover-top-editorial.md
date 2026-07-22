---
kit-doc: pattern
id: cover-top-editorial
kind: layout
summary: "Editorial opener: content starts at the top third (magazine style). Use when a centered cover feels too “keynote default”."
formats: both
content-keys:
  - coverEditorial.eyebrow
  - coverEditorial.title
  - coverEditorial.subtitle
  - footerLabel
page-types:
  - ../page-types/cover.md
---
# Pattern — cover-top-editorial

## When to use

Editorial opener: content starts at the top third (magazine style). Use when a centered cover feels too “keynote default”.

## Prerequisites

`PageLayout` with default `bodyAlign="start"` (not center).

## Skeleton (paste into `index.tsx`)

```tsx
const CoverTopEditorial: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel}>
    <Eyebrow>{CONTENT.coverEditorial.eyebrow}</Eyebrow>
    <DisplayTitle>{CONTENT.coverEditorial.title}</DisplayTitle>
    <BodyCopy>{CONTENT.coverEditorial.subtitle}</BodyCopy>
  </PageLayout>
);
```

## Related

- `cover-centered.md` — ceremonial center band
- `FORMAT-GUIDANCE.md`
