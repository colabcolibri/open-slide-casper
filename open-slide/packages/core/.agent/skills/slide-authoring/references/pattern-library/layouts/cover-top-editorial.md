# Pattern — cover-top-editorial

| Field | Value |
| --- | --- |
| **id** | `cover-top-editorial` |
| **kind** | layout |
| **page-types ref** | `../page-types/cover.md` |
| **CONTENT keys** | `coverEditorial.eyebrow`, `coverEditorial.title`, `coverEditorial.subtitle`, `footerLabel` |
| **Canvas formats** | **Both** — extra vertical space on `4x5` fits subtitle without shrinking hero |

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
