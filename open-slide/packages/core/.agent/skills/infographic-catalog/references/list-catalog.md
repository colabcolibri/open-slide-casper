# List infographic catalog (read-only)

Use when the user or a **`/list-infographic-*`** workflow asks for an inventory — **no** scoping, **no** `visualDescription`, **no** image prompt.

## Source files

| List | Primary read | Optional filter |
| --- | --- | --- |
| Layouts | `layouts-by-category.md` + `catalog.json` → `layouts` | Category: `Process`, `Structure`, `Comparison`, `Metaphor`, `Data`, `Identity` |
| Visual styles | `catalog.json` → `styles` | `vibe` or `format` tag (substring match on arrays) |

Parse **`$ARGUMENTS`** (workflow) for an optional filter token; if absent, list **all** entries.

## Output shape (chat)

1. One-line header: total count and filter applied (or “all”).
2. **Markdown table** — keep rows complete; do not truncate the catalog silently.
3. Columns:
   - **Layouts:** `id` | `name` | `categories` | `description` (from `catalog.json`)
   - **Styles:** `id` | `name` | `vibe` | `format` | `description`
4. Footer: preview paths — `previews/layouts/<id>.webp` or `previews/styles/<id>.webp`; full prompts in `layouts/<id>.md` / `styles/<id>.md` on demand.
5. Offer: “pick ids for **`/generate-infographic`**” or “detail on one id”.

## Forbidden

- Invent ids not in `catalog.json`
- Write files under `slides/`, `themes/`, or mutate catalog
- Run external sync or import scripts
