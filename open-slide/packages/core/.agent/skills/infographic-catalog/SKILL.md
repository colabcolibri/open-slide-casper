---
name: infographic-catalog
description: Reference catalog of infographic layout archetypes and visual styles — catalog.json, prompt markdown, and preview images. Use with skill generate-infographic or /generate-infographic when picking layoutId and styleId or reading prompt text. Not for slide TSX (see slide-authoring pattern-library).
---

# Infographic catalog (reference)

Vendored **layout** and **style** prompts for image-based infographics. Shipped under this skill’s **`references/`** with `@open-slide/core`.

Entry workflow: **`/generate-infographic`** → skill **`generate-infographic`** loads this catalog.

**Not slide TSX** — for deck skeletons use **`slide-authoring`** → **`pattern-library/INDEX.md`**.

---

## Selective reading

| File | When to read |
| ---- | ------------ |
| `references/INDEX.md` | Overview — links to layouts-by-category and styles count |
| `references/aspect-ratios.md` | **Mandatory** Step 2 — all 14 canvas ratios (+ optional output size) |
| `references/aspect-ratios.json` | Same ratios for programmatic checks |
| `references/layouts-by-category.md` | All 39 layout ids grouped by taxonomy |
| `references/catalog.json` | Machine-readable ids, tags, paths |
| `references/layouts/<id>.md` | Full layout prompt for one archetype |
| `references/styles/<id>.md` | Full style prompt modifier |
| `references/prompt-assembly.md` | **Mandatory** before composing final image prompt |
| `references/list-catalog.md` | **`/list-infographic-layouts`** and **`/list-infographic-styles`** |
| `references/README.md` | Maintainer refresh of `.md` / `catalog.json` |

Preview images: `references/previews/layouts/`, `references/previews/styles/`.

---

## Procedure (lookup)

1. Parse **`references/catalog.json`** for `layoutId` and `styleId` (or filter by `categories`, `vibe`, `format`).
2. Open the listed **`promptMarkdown`** files; use preview paths for visual reference when explaining choices to the user.
3. Hand off to **`generate-infographic`** for scene strategy and prompt assembly — do not invent layout geometry without reading the layout `.md`.

Maintainers: after editing **`references/snapshot/`**, run `node scripts/build-infographic-catalog.mjs` from the open-slide monorepo root.
