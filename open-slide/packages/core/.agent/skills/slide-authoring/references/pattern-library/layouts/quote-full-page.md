# Pattern — quote-full-page

| Field | Value |
| --- | --- |
| **id** | `quote-full-page` |
| **kind** | layout |
| **page-types ref** | `../page-types/title-body-footer.md` |
| **CONTENT keys** | `quoteFull.text`, `quoteFull.attribution`, `footerLabel` |
| **Canvas formats** | **4x5-first** — also works on `slide` for testimonial beat |

## When to use

One quote is the entire message — no section title. Social/portrait cards.

## Skeleton (paste into `index.tsx`)

```tsx
const QuoteFullPage: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel} bodyAlign="center">
    <blockquote
      style={{
        margin: 0,
        maxWidth: 1000,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'calc(var(--osd-size-body) * 1.25)',
        lineHeight: 1.35,
        textAlign: 'center',
        color: 'var(--osd-text)',
      }}
    >
      “{CONTENT.quoteFull.text}”
    </blockquote>
    <p
      style={{
        margin: '32px 0 0',
        fontSize: 'var(--osd-size-body)',
        color: 'var(--osd-muted)',
        textAlign: 'center',
      }}
    >
      {CONTENT.quoteFull.attribution}
    </p>
  </PageLayout>
);
```

## Related

- `split-40-60-quote.md` — quote + supporting copy
- `FORMAT-GUIDANCE.md`
