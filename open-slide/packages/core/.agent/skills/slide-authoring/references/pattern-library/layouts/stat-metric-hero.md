---
kit-doc: pattern
id: stat-metric-hero
kind: layout
summary: "Highlight a single number (KPI, result, scale). Avoid multiple competing stats."
formats: both
content-keys:
  - metric.value
  - metric.unit
  - metric.label
  - metric.context
  - footerLabel
page-types:
  - ../page-types/title-body-footer.md
---
# Pattern — stat-metric-hero

## When to use

Highlight a single number (KPI, result, scale). Avoid multiple competing stats.

## Skeleton (paste into `index.tsx`)

```tsx
const StatMetricHero: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel} bodyAlign="center">
    <div style={{ textAlign: 'center', width: '100%' }}>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'calc(var(--osd-size-hero) * 1.35)',
          fontWeight: 800,
          lineHeight: 1,
          color: 'var(--osd-accent)',
        }}
      >
        {CONTENT.metric.value}
        <span style={{ fontSize: '0.45em', color: 'var(--osd-text)' }}>{CONTENT.metric.unit}</span>
      </p>
      <p
        style={{
          margin: '24px 0 0',
          fontSize: 'var(--osd-size-heading)',
          fontWeight: 600,
        }}
      >
        {CONTENT.metric.label}
      </p>
      <BodyCopy>{CONTENT.metric.context}</BodyCopy>
    </div>
  </PageLayout>
);
```

On `4x5`, reduce hero multiplier slightly if the value string is long.

## Related

- `FORMAT-GUIDANCE.md`
