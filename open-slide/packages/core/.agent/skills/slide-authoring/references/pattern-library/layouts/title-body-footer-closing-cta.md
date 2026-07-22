# Pattern — title-body-footer-closing-cta

| Field | Value |
| --- | --- |
| **id** | `title-body-footer-closing-cta` |
| **kind** | layout |
| **page-types ref** | `../page-types/title-body-footer.md` |
| **CONTENT keys** | `closing.eyebrow`, `closing.title`, `closing.body`, `closing.action`, `footerLabel` |
| **Canvas formats** | **Both** — strong final slide on `4x5` social exports |

## When to use

Last page: recap + one CTA line (URL, next step, contact). Often `bodyAlign="center"` on body band.

## Skeleton (paste into `index.tsx`)

```tsx
const ClosingCta: Page = () => (
  <PageLayout
    footerLabel={CONTENT.footerLabel}
    bodyAlign="center"
    head={
      <>
        <Eyebrow>{CONTENT.closing.eyebrow}</Eyebrow>
        <PageTitle>{CONTENT.closing.title}</PageTitle>
      </>
    }
  >
    <BodyCopy>{CONTENT.closing.body}</BodyCopy>
    <p
      style={{
        margin: 0,
        fontSize: 'var(--osd-size-body)',
        fontWeight: 600,
        color: 'var(--osd-accent)',
      }}
    >
      {CONTENT.closing.action}
    </p>
  </PageLayout>
);
```

## Related

- `deck-template` Closing page
- `FORMAT-GUIDANCE.md`
