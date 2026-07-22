---
kit-doc: pattern
id: split-40-60-quote
kind: layout
summary: "Lead with a pull quote (40%) and supporting paragraph or short list (60%). Good for testimonials or thesis + evidence."
formats: both-star
content-keys:
  - splitQuote.title
  - splitQuote.quote
  - splitQuote.attribution
  - splitQuote.body
  - footerLabel
page-types:
  - ../page-types/split.md
---
# Pattern — split-40-60-quote

## When to use

Lead with a pull quote (40%) and supporting paragraph or short list (60%). Good for testimonials or thesis + evidence.

## Prerequisites

`PageLayout`, `PageTitle`, `BodyCopy`.

## Variants

Sibling: `split-50-50-text-image.md` when the right column is visual.

## Skeleton (paste into `index.tsx`)

```tsx
const SplitQuote: Page = () => (
  <PageLayout
    footerLabel={CONTENT.footerLabel}
    head={<PageTitle>{CONTENT.splitQuote.title}</PageTitle>}
  >
    <div
      style={{
        display: 'flex',
        gap: 'var(--osd-gap)',
        width: '100%',
        minHeight: 0,
        flex: 1,
      }}
    >
      <div
        style={{
          flex: '0 0 40%',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 16,
          borderLeft: '4px solid var(--osd-accent)',
          paddingLeft: 32,
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 'calc(var(--osd-size-body) * 1.15)',
            lineHeight: 1.35,
            color: 'var(--osd-text)',
          }}
        >
          “{CONTENT.splitQuote.quote}”
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 'calc(var(--osd-size-body) * 0.85)',
            color: 'var(--osd-muted)',
          }}
        >
          {CONTENT.splitQuote.attribution}
        </p>
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
        <BodyCopy>{CONTENT.splitQuote.body}</BodyCopy>
      </div>
    </div>
  </PageLayout>
);
```

```tsx
splitQuote: {
  title: 'What they said',
  quote: 'This changed how we run reviews.',
  attribution: 'Name, role',
  body: 'Supporting context in one or two sentences.',
},
```

## Tokens and layout

Quote column uses display font; accent border uses `var(--osd-accent)`.

## Related

- `../page-types/split.md`
- `INDEX.md` — `split-40-60-quote`
