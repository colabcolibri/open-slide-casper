# Canvas, layout, type scale, vertical budget

Every page renders into a fixed canvas. The framework scales it; you design in absolute pixels.

| `meta.format` | Size |
| --- | --- |
| `slide` (default) | 1920 × 1080 |
| `4x5` | 1080 × 1350 |

Bind layout at the top when using portrait:

```tsx
import { resolveCanvasSize, type Page, type SlideMeta } from '@open-slide/core';

const CANVAS = resolveCanvasSize('4x5');

export const meta: SlideMeta = { title: '…', format: '4x5', createdAt: '…' };
```

Default widescreen omits `format` (or `format: 'slide'`) and designs for **1920×1080**.

- Use **absolute pixel values** for `font-size`, padding, positioning. No `rem`, no `vw`/`vh`, no `%` for type.
- Root element of each page: `width: '100%'; height: '100%'`.
- Prefer inline `style={{ … }}`. Any CSS you load is global — scope classnames carefully.

## Page layout (copy per deck)

**Every new `index.tsx` must include head / body / footer** from **`page-types/title-body-footer.md`** (local components — not from `@open-slide/core`). See **Page types** in the skill hub for cover and split variants.

## Type scale (start here, adjust to taste)

| Element          | Size       |
| ---------------- | ---------- |
| Hero title       | 140–200px  |
| Section heading  | 80–120px   |
| Page heading     | 56–80px    |
| Body text        | 32–44px    |
| Caption / label  | 22–28px    |

## Spacing

- Content padding: **100–160px** from canvas edges. Never let text touch the edge.
- Line-height: 1.2 for headings, 1.5–1.7 for body.
- Breathing room between elements: 32–64px.

## Vertical budget — content MUST fit 1080px

The canvas does **not** scroll. Anything past the bottom edge is cropped. **Usable height** = `1080 − top_padding − bottom_padding`. With 120px padding each side → **840px**; with 160px → **760px**.

**Element height** = `font_size × line_height × lines`. Add gaps (32–64px) when summing.

**Worked example — 120px padding (budget = 840px):**

| Element | Height |
| --- | --- |
| Heading: 80px × 1.2 × 1 line | 96px |
| Gap | 64px |
| Body: 40px × 1.6 × 3 lines | 192px |
| Gap | 48px |
| 5 bullets: 40px × 1.6 each | 320px |
| 4 gaps × 24px | 96px |
| **Total** | **816px ✅** |

**Page-level rules:**

- One heading + body OR heading + ≤5 short bullets — not both long body and long list.
- Bullets should fit one line at chosen font size; otherwise shorten or new page.
- Hero title pages: title + subtitle + eyebrow only.
- If shrinking type below scale or padding below 100px to fit — **split the page**.

**Never** use `overflow: auto/scroll`, negative margins, or transforms to hide overflow.
