# Pattern — steps-reveal

| Field | Value |
| --- | --- |
| **id** | `steps-reveal` |
| **kind** | motion |
| **page-types ref** | `../steps.md` |
| **CONTENT keys** | `stepsPage.title`, `stepsPage.intro`, `stepsPage.beatOne`, `stepsPage.beatTwo`, `stepsPage.beatThree` |
| **Canvas formats** | **Both** — fewer beats on `4x5` if head + steps overflow budget |

## When to use

The **order** of ideas matters: build to a payoff, peel back with `←`. Not for hero-only or single-glance pages.

## Prerequisites

A `Page` with `PageLayout` body band. Import `Step`, `Steps` from `@open-slide/core`.

## Variants

Headline visible immediately + steps in body (see `steps.md` “headline always, body in turn”).

## Skeleton (paste into `index.tsx`)

```tsx
import { Step, Steps } from '@open-slide/core';

const StepsRevealPage: Page = () => (
  <PageLayout
    footerLabel={CONTENT.footerLabel}
    head={<PageTitle>{CONTENT.stepsPage.title}</PageTitle>}
  >
    <Steps>
      <p
        style={{
          margin: '0 0 24px',
          fontSize: 'var(--osd-size-body)',
          color: 'var(--osd-muted)',
        }}
      >
        {CONTENT.stepsPage.intro}
      </p>
      <Step>
        <p style={{ margin: 0, fontSize: 'var(--osd-size-body)', lineHeight: 1.5 }}>
          {CONTENT.stepsPage.beatOne}
        </p>
      </Step>
      <Step>
        <p style={{ margin: 0, fontSize: 'var(--osd-size-body)', lineHeight: 1.5 }}>
          {CONTENT.stepsPage.beatTwo}
        </p>
      </Step>
      <Step>
        <p style={{ margin: 0, fontSize: 'var(--osd-size-body)', lineHeight: 1.5 }}>
          {CONTENT.stepsPage.beatThree}
        </p>
      </Step>
    </Steps>
  </PageLayout>
);
```

```tsx
stepsPage: {
  title: 'Build in time',
  intro: 'Visible before the first reveal.',
  beatOne: 'First beat after →',
  beatTwo: 'Second beat',
  beatThree: 'Payoff line',
},
```

**Note:** Each `<Step>` must be a **direct** child of `<Steps>`. Non-`Step` siblings render immediately.

## Tokens and layout

Default step fade ~180ms; `prefers-reduced-motion` is handled by the runtime.

## Related

- `../steps.md`
- `INDEX.md` — `steps-reveal`
