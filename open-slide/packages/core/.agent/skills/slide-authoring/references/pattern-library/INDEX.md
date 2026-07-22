# Pattern library — index

Copy-paste **skeletons** for common layouts and motion. Read **`FORMAT-GUIDANCE.md`** (16∶9 vs `4x5`) and **`SCHEMA.md`** (`kit-doc: pattern` frontmatter) before adding entries.

## How this fits the deck

1. Copy **`../deck-template/index.tsx`** into `slides/<id>/index.tsx` (`create-slide` Step 6).
2. Set **`meta.format`** (`slide` or `4x5`) and **`design.typeScale`** per `../canvas-and-layout.md`.
3. Draft copy in **`CONTENT`** (`../deck-layers.md`).
4. Pick patterns below → paste skeletons into **templates** / **pages**.
5. Grid contracts for regions live in **`../page-types/`**; this library adds ready-made `Page` bodies.

**Not a scaffold:** `packages/core/examples/` is a read-only design vitrine. Do not clone example decks when creating new slides.

---

### Covers

| id | kind | When to use | Entry |
| --- | --- | --- | --- |
| `cover-centered` | layout | Hero title + subtitle, vertically centered | [layouts/cover-centered.md](layouts/cover-centered.md) |
| `cover-top-editorial` | layout | Top-weighted opener (eyebrow + title at top third) | [layouts/cover-top-editorial.md](layouts/cover-top-editorial.md) |
| `cover-split-visual` | layout | Title block beside hero visual on opener | [layouts/cover-split-visual.md](layouts/cover-split-visual.md) |

### Content pages

| id | kind | When to use | Entry |
| --- | --- | --- | --- |
| `title-body-footer-prose` | layout | Eyebrow, title, single body paragraph | [layouts/title-body-footer-prose.md](layouts/title-body-footer-prose.md) |
| `title-body-footer-bullets` | layout | Title + bullet list (default content) | [layouts/title-body-footer-bullets.md](layouts/title-body-footer-bullets.md) |
| `title-body-footer-two-col` | layout | Two parallel bullet columns | [layouts/title-body-footer-two-col.md](layouts/title-body-footer-two-col.md) |
| `title-body-footer-closing-cta` | layout | Closing slide with body + accent CTA line | [layouts/title-body-footer-closing-cta.md](layouts/title-body-footer-closing-cta.md) |
| `agenda-numbered` | layout | Numbered section list (talk outline) | [layouts/agenda-numbered.md](layouts/agenda-numbered.md) |

### Split, compare, visual

| id | kind | When to use | Entry |
| --- | --- | --- | --- |
| `split-50-50-text-image` | layout | Copy beside visual (wide decks) | [layouts/split-50-50-text-image.md](layouts/split-50-50-text-image.md) |
| `split-stacked-vertical` | layout | Visual block above copy (portrait-friendly) | [layouts/split-stacked-vertical.md](layouts/split-stacked-vertical.md) |
| `split-40-60-quote` | layout | Pull quote + supporting body | [layouts/split-40-60-quote.md](layouts/split-40-60-quote.md) |
| `split-before-after` | layout | Labeled before/after columns | [layouts/split-before-after.md](layouts/split-before-after.md) |
| `comparison-labeled-columns` | layout | Two titled columns with divider | [layouts/comparison-labeled-columns.md](layouts/comparison-labeled-columns.md) |
| `stat-metric-hero` | layout | One big metric + label | [layouts/stat-metric-hero.md](layouts/stat-metric-hero.md) |
| `quote-full-page` | layout | Centered quote as the whole page | [layouts/quote-full-page.md](layouts/quote-full-page.md) |
| `three-up-pillars` | layout | Three parallel pillars (icon/title/blurb) | [layouts/three-up-pillars.md](layouts/three-up-pillars.md) |
| `full-bleed-image-caption` | layout | Edge-to-edge image + caption strip | [layouts/full-bleed-image-caption.md](layouts/full-bleed-image-caption.md) |

### Motion

| id | kind | When to use | Entry |
| --- | --- | --- | --- |
| `steps-reveal` | motion | Sequential `<Steps>` on one page | [motion/steps-reveal.md](motion/steps-reveal.md) |
| `steps-two-column` | motion | Left-then-right stepped columns (wide) | [motion/steps-two-column.md](motion/steps-two-column.md) |
| `page-transition` | motion | Module or per-page `SlideTransition` | [motion/page-transition.md](motion/page-transition.md) |
| `transition-fade-minimal` | motion | Short opacity-only deck transition | [motion/transition-fade-minimal.md](motion/transition-fade-minimal.md) |
| `morph-highlight` | motion | `MorphElement` across adjacent pages | [motion/morph-highlight.md](motion/morph-highlight.md) |

---

## Adding entries

Copy `_entry-template.md`, fill frontmatter per `SCHEMA.md`, link a new row here (stable **id**).
