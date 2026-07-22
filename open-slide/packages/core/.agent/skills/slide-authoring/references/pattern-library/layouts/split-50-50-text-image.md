---
kit-doc: pattern
id: split-50-50-text-image
kind: layout
summary: "Explain beside a visual: product shot, diagram, or photo. Text column stays short; visual fills the other half."
formats: slide-first
content-keys:
  - splitVisual.title
  - splitVisual.lead
  - splitVisual.bullets[]
  - footerLabel
page-types:
  - ../page-types/split.md
---
# Pattern — split-50-50-text-image

## When to use

Explain beside a visual: product shot, diagram, or photo. Text column stays short; visual fills the other half.

## Prerequisites

`PageLayout`, `PageTitle`, `BulletList`. For assets use `./assets/…` or `<ImagePlaceholder>` per `../assets.md`.

## Variants

Sibling: `split-40-60-quote.md` for quote-heavy copy.

## Skeleton (paste into `index.tsx`)

```tsx
import { ImagePlaceholder } from '@open-slide/core';

const SplitTextImage: Page = () => (
  <PageLayout
    footerLabel={CONTENT.footerLabel}
    head={<PageTitle>{CONTENT.splitVisual.title}</PageTitle>}
  >
    <div
      style={{
        display: 'flex',
        gap: 'var(--osd-gap)',
        width: '100%',
        minHeight: 0,
        flex: 1,
        alignItems: 'stretch',
      }}
    >
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <p
          style={{
            margin: 0,
            fontSize: 'var(--osd-size-body)',
            lineHeight: 1.5,
            color: 'var(--osd-muted)',
          }}
        >
          {CONTENT.splitVisual.lead}
        </p>
        <BulletList items={CONTENT.splitVisual.bullets} />
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImagePlaceholder hint="Hero visual" width={720} height={540} />
      </div>
    </div>
  </PageLayout>
);
```

```tsx
splitVisual: {
  title: 'Show the product',
  lead: 'One sentence framing the visual.',
  bullets: ['Benefit one', 'Benefit two'],
},
```

Replace `ImagePlaceholder` with `<img src={hero} alt="…" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />` when the asset exists.

## Tokens and layout

50/50 flex with `minWidth: 0` on both columns; divider optional per `split.md`.

## Related

- `../page-types/split.md`, `../assets.md`
- `INDEX.md` — `split-50-50-text-image`
