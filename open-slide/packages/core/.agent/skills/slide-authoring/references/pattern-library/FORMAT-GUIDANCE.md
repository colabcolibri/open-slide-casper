# Canvas formats — `slide` (16∶9) vs `4x5`

Patterns assume the deck sets **`meta.format`** once (`file-contract.md`, `canvas-and-layout.md`). Layout math differs: widescreen has **width** for columns; portrait has **extra height** but **narrow width**.

| Format | Canvas | Alias in docs |
| --- | --- | --- |
| `slide` (default) | 1920 × 1080 | 16∶9 widescreen |
| `4x5` | 1080 × 1350 | Portrait / social |

```tsx
export const meta: SlideMeta = {
  title: '…',
  format: '4x5', // omit or 'slide' for 16∶9
  createdAt: '…',
};
```

## How to read pattern tables

| Rating | Meaning |
| --- | --- |
| **Both** | Use as-is; tune copy density per `typeScale.body` in `canvas-and-layout.md`. |
| **Both\*** | Works on both; on `4x5` follow the pattern’s **Portrait notes** (often stack instead of side-by-side). |
| **slide-first** | Side-by-side or wide grids; on `4x5` switch to the linked stacked variant or reduce columns. |
| **4x5-first** | Tall stack or centered poster layout; on `slide` add horizontal breathing room, avoid tiny type. |

## Pattern × format matrix

| id | `slide` 16∶9 | `4x5` | Notes |
| --- | --- | --- | --- |
| `cover-centered` | Both | Both | Hero may drop one step on `4x5` (`typeScale.hero` 96–120). |
| `cover-top-editorial` | Both | Both | Top-weighted cover; extra height on `4x5` fits subtitle + eyebrow. |
| `cover-split-visual` | Both\* | Prefer `split-stacked-vertical` | Horizontal cover+image tight on narrow width. |
| `title-body-footer-prose` | Both | Both | Watch vertical budget on `4x5` with long body — split page. |
| `title-body-footer-bullets` | Both | Both | ≤5 bullets; on `4x5` prefer 4 short lines. |
| `title-body-footer-two-col` | Both\* | Both\* | On `4x5`, shorten columns or use `comparison-labeled-columns` stacked. |
| `title-body-footer-closing-cta` | Both | Both | Strong on `4x5` as final “poster” slide. |
| `agenda-numbered` | Both | Both | 4–6 items; more rows fit on `4x5`. |
| `split-50-50-text-image` | slide-first | Use `split-stacked-vertical` | 50/50 columns need width. |
| `split-40-60-quote` | Both\* | Both | Quote column may go full-width above body on `4x5`. |
| `split-before-after` | Both\* | Both\* | Keep ≤3 bullets per side; stack columns on `4x5` if cramped. |
| `split-stacked-vertical` | Both | **4x5-first** | Image block + copy; default for portrait splits. |
| `comparison-labeled-columns` | Both\* | Both\* | Same as split compare; stack on `4x5` when labels wrap. |
| `stat-metric-hero` | Both | Both | Poster-friendly on `4x5`; one metric per page. |
| `quote-full-page` | Both | **4x5-first** | Centered pull quote; great portrait card. |
| `three-up-pillars` | slide-first | Max 2 pillars or use two pages | Three columns need 1920px width. |
| `full-bleed-image-caption` | Both | Both | Caption bar; crop image for taller `4x5` frame. |
| `steps-reveal` | Both | Both | Fewer steps per page on `4x5` if head + steps overflow. |
| `steps-two-column` | slide-first | Use single-column `steps-reveal` | Two `<Steps>` columns need width. |
| `page-transition` | Both | Both | Format-agnostic. |
| `transition-fade-minimal` | Both | Both | Format-agnostic. |
| `morph-highlight` | Both | Both | Pixel layout; remeasure if you change `format` mid-deck (don’t). |

## Deck-level rules

1. **Pick one format per deck** — do not mix `meta.format` across pages in the same `index.tsx`.
2. **Set `design.typeScale`** for the format before pasting patterns (`slide` body **38** default; `4x5` **36–38**).
3. **Prefer stacked patterns on `4x5`** when the matrix says slide-first.
4. **Re-run vertical budget** (`canvas-and-layout.md`) — `4x5` has more height but same “no scroll” rule.

## Related

- `../canvas-and-layout.md` — type scale table and 1080px budget (apply height cap to `4x5` usable height similarly).
- `INDEX.md` — pattern list
