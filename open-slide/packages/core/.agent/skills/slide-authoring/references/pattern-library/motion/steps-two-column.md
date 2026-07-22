# Pattern — steps-two-column

| Field | Value |
| --- | --- |
| **id** | `steps-two-column` |
| **kind** | motion |
| **page-types ref** | `../steps.md` |
| **CONTENT keys** | `stepsTwoCol.title`, per-column beat strings |
| **Canvas formats** | **slide-first** — on `4x5` use `steps-reveal` single column |

## When to use

Two parallel build sequences (e.g. left = problem, right = solution). Document order: left column finishes all steps before right (`steps.md`).

## Skeleton (paste into `index.tsx`)

```tsx
import { Step, Steps } from '@open-slide/core';

const StepsTwoColumn: Page = () => (
  <PageLayout footerLabel={CONTENT.footerLabel} head={<PageTitle>{CONTENT.stepsTwoCol.title}</PageTitle>}>
    <div style={{ display: 'flex', gap: 'var(--osd-gap)', width: '100%', flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Steps>
          <Step>
            <p style={{ margin: 0, fontSize: 'var(--osd-size-body)' }}>{CONTENT.stepsTwoCol.leftOne}</p>
          </Step>
          <Step>
            <p style={{ margin: 0, fontSize: 'var(--osd-size-body)' }}>{CONTENT.stepsTwoCol.leftTwo}</p>
          </Step>
        </Steps>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Steps>
          <Step>
            <p style={{ margin: 0, fontSize: 'var(--osd-size-body)' }}>{CONTENT.stepsTwoCol.rightOne}</p>
          </Step>
          <Step>
            <p style={{ margin: 0, fontSize: 'var(--osd-size-body)' }}>{CONTENT.stepsTwoCol.rightTwo}</p>
          </Step>
        </Steps>
      </div>
    </div>
  </PageLayout>
);
```

## Related

- `steps-reveal.md`
- `FORMAT-GUIDANCE.md`
