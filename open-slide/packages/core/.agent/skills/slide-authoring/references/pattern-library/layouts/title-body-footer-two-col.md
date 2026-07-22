---
kit-doc: pattern
id: title-body-footer-two-col
kind: layout
summary: "Two parallel lists under one title (compare tracks, pros/cons columns). Keep ≤4 short lines per column on 1080p."
formats: both-star
content-keys:
  - twoCol.eyebrow
  - twoCol.title
  - twoCol.leftLabel
  - twoCol.leftItems[]
  - twoCol.rightLabel
  - twoCol.rightItems[]
page-types:
  - ../page-types/title-body-footer.md
---
# Pattern — title-body-footer-two-col

## When to use

Two parallel lists under one title (compare tracks, pros/cons columns). Keep ≤4 short lines per column on 1080p.

## Prerequisites

`PageLayout`, `Eyebrow`, `PageTitle`, `BulletList` (or inline column lists).

## Variants

Sibling: `title-body-footer-bullets.md` for a single column.

## Skeleton (paste into `index.tsx`)

```tsx
const TwoColBullets: Page = () => (
  <PageLayout
    footerLabel={CONTENT.footerLabel}
    head={
      <>
        <Eyebrow>{CONTENT.twoCol.eyebrow}</Eyebrow>
        <PageTitle>{CONTENT.twoCol.title}</PageTitle>
      </>
    }
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--osd-gap)',
        width: '100%',
        minHeight: 0,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            margin: '0 0 16px',
            fontSize: 'calc(var(--osd-size-body) * 0.85)',
            color: 'var(--osd-accent)',
            fontWeight: 600,
          }}
        >
          {CONTENT.twoCol.leftLabel}
        </p>
        <BulletList items={CONTENT.twoCol.leftItems} />
      </div>
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            margin: '0 0 16px',
            fontSize: 'calc(var(--osd-size-body) * 0.85)',
            color: 'var(--osd-accent)',
            fontWeight: 600,
          }}
        >
          {CONTENT.twoCol.rightLabel}
        </p>
        <BulletList items={CONTENT.twoCol.rightItems} />
      </div>
    </div>
  </PageLayout>
);
```

```tsx
twoCol: {
  eyebrow: 'compare · 04',
  title: 'Two tracks',
  leftLabel: 'Option A',
  leftItems: ['Point one', 'Point two'],
  rightLabel: 'Option B',
  rightItems: ['Point one', 'Point two'],
},
```

## Tokens and layout

Two-column grid in the body band only; shared title stays in `head`.

## Related

- `../page-types/title-body-footer.md`
- `INDEX.md` — `title-body-footer-two-col`
