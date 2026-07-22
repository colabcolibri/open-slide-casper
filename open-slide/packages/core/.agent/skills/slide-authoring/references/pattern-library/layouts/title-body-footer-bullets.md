---
kit-doc: pattern
id: title-body-footer-bullets
kind: layout
summary: "Default editorial page: section label, title, short bullet list (3–5 items). One idea per page."
formats: both
content-keys:
  - bullets.eyebrow
  - bullets.title
  - bullets.items[]
  - footerLabel
page-types:
  - ../page-types/title-body-footer.md
---
# Pattern — title-body-footer-bullets

## When to use

Default editorial page: section label, title, short bullet list (3–5 items). One idea per page.

## Prerequisites

`PageLayout`, `Eyebrow`, `PageTitle`, `BulletList` from `deck-template`.

## Variants

See also `title-body-footer-two-col.md` for dual columns.

## Skeleton (paste into `index.tsx`)

```tsx
const BulletsPage: Page = () => (
  <PageLayout
    footerLabel={CONTENT.footerLabel}
    head={
      <>
        <Eyebrow>{CONTENT.bullets.eyebrow}</Eyebrow>
        <PageTitle>{CONTENT.bullets.title}</PageTitle>
      </>
    }
  >
    <BulletList items={CONTENT.bullets.items} />
  </PageLayout>
);
```

```tsx
bullets: {
  eyebrow: 'section · 03',
  title: 'Key points',
  items: [
    'First point in plain language.',
    'Second point.',
    'Third point.',
  ],
},
```

## Tokens and layout

Head row `gridRow: 1`, body `gridRow: 2`, footer `gridRow: 3` via `PageLayout`. List gap uses component styles aligned with `var(--osd-gap)`.

## Related

- `../page-types/title-body-footer.md`
- `INDEX.md` — `title-body-footer-bullets`
