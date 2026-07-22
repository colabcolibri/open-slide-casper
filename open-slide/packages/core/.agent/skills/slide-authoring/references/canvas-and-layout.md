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

**Legibilidade em preview, present mode e export (HTML/PDF/PPTX):** o canvas escala inteiro — se o corpo nasce pequeno no TSX, continua pequeno publicado. Priorize corpo confortável; **enxugue copy ou divida página** antes de baixar o corpo abaixo do mínimo.

| Element          | `slide` 1920×1080 | `4x5` 1080×1350 |
| ---------------- | ----------------- | ---------------- |
| Hero title       | 140–200px         | 96–120px (`var(--osd-size-hero)`) |
| Section / page heading | 56–80px     | 52–72px (hard-coded `h2` in deck) |
| **Body + bullets** | **36–42px** (`design.typeScale.body`) | **34–40px** |
| Caption / eyebrow / footer | 24–28px   | 24–28px |

**Defaults for new decks** (set in `export const design`):

| `meta.format` | Recommended `typeScale.body` | When |
| --- | --- | --- |
| `slide` (default) | **38** | standard / light density |
| `slide` | **40–42** | minimal copy per page |
| `slide` | **34–36** | dense — only if vertical budget still passes |
| `4x5` | **36–38** | standard |
| `4x5` | **34** | dense multi-block pages |

**One size for body:** paragraphs, card copy, and bullet lines should all use **`var(--osd-size-body)`** (via shared `BodyCopy` / `BulletList` in `title-body-footer.md`). Do not hard-code 28–32px for bullets while the paragraph uses 38px — export will look uneven and “small”.

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
