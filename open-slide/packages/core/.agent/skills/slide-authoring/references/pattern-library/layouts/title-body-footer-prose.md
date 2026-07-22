# Pattern — title-body-footer-prose

| Field | Value |
| --- | --- |
| **id** | `title-body-footer-prose` |
| **kind** | layout |
| **page-types ref** | `../page-types/title-body-footer.md` |
| **CONTENT keys** | `prose.eyebrow`, `prose.title`, `prose.body`, `footerLabel` |
| **Canvas formats** | **Both** — cap body to ~3 lines on `slide`; on `4x5` one extra line if budget allows |

## When to use

Single idea explained in prose (no bullets). Section transitions in narrative decks.

## Skeleton (paste into `index.tsx`)

```tsx
const ProsePage: Page = () => (
  <PageLayout
    footerLabel={CONTENT.footerLabel}
    head={
      <>
        <Eyebrow>{CONTENT.prose.eyebrow}</Eyebrow>
        <PageTitle>{CONTENT.prose.title}</PageTitle>
      </>
    }
  >
    <BodyCopy>{CONTENT.prose.body}</BodyCopy>
  </PageLayout>
);
```

## Related

- `title-body-footer-bullets.md`
- `FORMAT-GUIDANCE.md`
