---
name: generate-infographic
description: Plans an image-based infographic after mandatory scoping — selects layout and style from the infographic catalog, drafts visualDescription and final image prompt. Use with /generate-infographic or @infographic-author. Does not edit slides/ or themes/.
---

# Generate infographic (plan + prompt)

Entry workflow: **`/generate-infographic`** → `.agent/workflows/generate-infographic.md`.

Produces **prompt artifacts** (layout/style ids, strategy scene text, assembled image prompt). Does **not** write under `slides/` or `themes/`.

---

## Selective reading

| File | When to read |
| ---- | ------------ |
| `references/scoping.md` | **Mandatory** Step 2 — before any prompt draft |
| `infographic-catalog/references/aspect-ratios.md` | Step 2 — **all 14** aspect ratios |
| `infographic-catalog/references/layouts-by-category.md` | Step 2 — layout options |
| `infographic-catalog/references/catalog.json` | **Mandatory** — ids, style tags, paths |
| `infographic-catalog/references/prompt-assembly.md` | **Mandatory** — Step 4 assembly |
| `infographic-catalog/references/layouts/<id>.md` | Step 3 — after layout chosen |
| `infographic-catalog/references/styles/<id>.md` | Step 3 — after style chosen |

---

## Procedure

**Gate:** Steps **3–5** run only after Step **2** scoping is answered. **Never** draft `visualDescription` or the final prompt in the same turn as an unanswered scoping pass.

1. **Intake** — confirm source text (paste, file, or outline), language, and audience. If `$ARGUMENTS` is thin, ask before scoping.
2. **Scope** — **`references/scoping.md`**. **STOP** until the user responds — no prompt composition.
3. **Confirm catalog choices** — restate `layoutId`, `styleId`, `detailLevel`, `aspectRatio`; read the matching `.md` files under `infographic-catalog/references/`.
4. **Strategy** — draft **`visualDescription`** (quoted labels, placement, flow) using layout STRUCTURE + style art direction.
5. **Assembly** — build final image prompt per **`prompt-assembly.md`**; hand off ids, `visualDescription`, and final prompt text in chat (unless user asked to save to a file).

Catalog is already in the kit — no external sync at runtime.
