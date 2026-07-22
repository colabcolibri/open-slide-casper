# Pattern — title-body-footer-bullets

| Field | Value |
| --- | --- |
| **id** | `title-body-footer-bullets` |
| **kind** | layout |
| **page-types ref** | `../page-types/title-body-footer.md` |
| **CONTENT keys** | `bullets.eyebrow`, `bullets.title`, `bullets.items[]`, `footerLabel` |
| **Canvas formats** | **Both** — ≤5 bullets; on `4x5` prefer 4 short lines |

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
