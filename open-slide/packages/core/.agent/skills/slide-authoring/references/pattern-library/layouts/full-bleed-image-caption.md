# Pattern — full-bleed-image-caption

| Field | Value |
| --- | --- |
| **id** | `full-bleed-image-caption` |
| **kind** | layout |
| **page-types ref** | `../assets.md` |
| **CONTENT keys** | `bleed.caption`, `bleed.credit`, `footerLabel` |
| **Canvas formats** | **Both** — crop assets for taller `4x5` aspect |

## When to use

Photography-forward slide with caption strip. Minimal chrome — optional empty `head`.

## Skeleton (paste into `index.tsx`)

```tsx
import { ImagePlaceholder } from '@open-slide/core';

const FullBleedImageCaption: Page = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--osd-bg)',
    }}
  >
    <div style={{ position: 'absolute', inset: 0, bottom: 120 }}>
      <ImagePlaceholder hint="Full bleed" width={1920} height={960} />
    </div>
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '24px var(--osd-padding)',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
        color: '#fff',
      }}
    >
      <p style={{ margin: 0, fontSize: 'var(--osd-size-body)', fontWeight: 600 }}>{CONTENT.bleed.caption}</p>
      <p style={{ margin: '8px 0 0', fontSize: 'calc(var(--osd-size-body) * 0.85)', opacity: 0.85 }}>
        {CONTENT.bleed.credit}
      </p>
    </div>
    <footer style={{ position: 'absolute', right: 'var(--osd-padding)', bottom: 8, opacity: 0.7 }}>
      <DeckFooter label={CONTENT.footerLabel} />
    </footer>
  </div>
);
```

Uses custom frame — ensure `DeckFooter` is in scope. For Design/Inspect, prefer `data-slide-region` on caption block if you extend the pattern.

## Related

- `FORMAT-GUIDANCE.md`
