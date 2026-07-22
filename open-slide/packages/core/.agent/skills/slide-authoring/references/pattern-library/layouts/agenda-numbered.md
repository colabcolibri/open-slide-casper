# Pattern — agenda-numbered

| Field | Value |
| --- | --- |
| **id** | `agenda-numbered` |
| **kind** | layout |
| **page-types ref** | `../page-types/title-body-footer.md` |
| **CONTENT keys** | `agenda.title`, `agenda.items[]` (each `{ num, label }`), `footerLabel` |
| **Canvas formats** | **Both** — `4x5` fits 6–7 rows more comfortably than wide dense agendas |

## When to use

Talk outline, chapter list, workshop schedule. One line per item.

## Skeleton (paste into `index.tsx`)

```tsx
const AgendaItem = ({ num, label }: { num: string; label: string }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '72px 1fr',
      gap: 24,
      alignItems: 'baseline',
    }}
  >
    <span
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'calc(var(--osd-size-body) * 1.1)',
        color: 'var(--osd-accent)',
        fontWeight: 700,
      }}
    >
      {num}
    </span>
    <span style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.4, color: 'var(--osd-text)' }}>
      {label}
    </span>
  </div>
);

const AgendaNumbered: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel} head={<PageTitle>{CONTENT.agenda.title}</PageTitle>}>
    <div style={{ display: 'grid', gap: 28, width: '100%' }}>
      <AgendaItem num={CONTENT.agenda.items[0].num} label={CONTENT.agenda.items[0].label} />
      <AgendaItem num={CONTENT.agenda.items[1].num} label={CONTENT.agenda.items[1].label} />
      <AgendaItem num={CONTENT.agenda.items[2].num} label={CONTENT.agenda.items[2].label} />
      <AgendaItem num={CONTENT.agenda.items[3].num} label={CONTENT.agenda.items[3].label} />
    </div>
  </PageLayout>
);
```

Instantiate one `AgendaItem` per section (no `map` — see `repeated-elements.md`).

## Related

- `FORMAT-GUIDANCE.md`
