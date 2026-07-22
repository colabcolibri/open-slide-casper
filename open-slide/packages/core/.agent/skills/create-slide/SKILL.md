---
name: create-slide
description: Creates and drafts new slide decks under slides/<id>/ after mandatory scoping (AskUserQuestion). Use for new decks or /create-slide; never skip Step 2 and write TSX in the same turn as an unanswered scoping pass.
---

# Create a slide in open-slide

Entry workflow: **`/create-slide`** → `.agent/workflows/create-slide.md`. This skill owns **procedure**; TSX contract lives in **`slide-authoring`**. Ambiguous intent → **`slide-routing`**.

**Write scope:** only `slides/<id>/`. Never `package.json`, `open-slide.config.ts`, or other slides.

---

## Selective reading

| File | When to read |
| ---- | ------------ |
| `references/theme-registry.md` | Step 1 — how themes register; catalog vs deep read |
| `references/theme-pick.md` | Step 1 — picker procedure |
| `references/scoping.md` | **Mandatory** Step 2 — before any code |
| `slide-authoring/references/deck-layers.md` | Step 6 — CONTENT → templates → pages |
| `slide-authoring/references/deck-template/index.tsx` | **Mandatory** Step 6 — copy scaffold (placeholder deck) |
| `slide-authoring/references/pattern-library/INDEX.md` | Steps 4 & 6 — map outline pages → pattern ids; paste skeletons |
| `slide-authoring/references/pattern-library/FORMAT-GUIDANCE.md` | Step 2 scoping / Step 6 — `slide` (16∶9) vs `4x5` |
| `slide-authoring/SKILL.md` | Steps 5–7 — design, file contract, checklist |
| `slide-authoring/references/page-types/title-body-footer.md` | Step 6 — grid contract (full TSX lives in deck-template) |
| Other `slide-authoring/references/page-types/*.md` | Step 4 — per-page layout choice |

---

## Procedure

**Gate:** Steps **3–8** run only after Step **2** scoping is answered (or explicitly skipped with assumptions restated). **Never** write under `slides/` in the same turn as an unanswered scoping pass.

1. **Theme** — **`pnpm exec open-slide themes list --json`** from the slide app root (or **`pnpm themes:list`**); see `references/theme-registry.md` + `theme-pick.md`. Full `themes/<id>.md` **after** user picks one id.
2. **Scope** — **`references/scoping.md`**. **STOP** after this step until the user responds — no `slides/` files, no invented deck content. If `$ARGUMENTS` is vague, ask topic / audience / outline first.
3. **Slide id** — kebab-case; check `slides/` (e.g. `q2-roadmap`).
4. **Structure** — ordered page list; for each page pick a **pattern id** from **`slide-authoring/references/pattern-library/INDEX.md`** (and/or page types in **`slide-authoring`** § Page types); one idea per page; draft **`CONTENT`** keys (titles, bullets, footer label) for each page so Step 6 does not invent copy inline; `<ImagePlaceholder>` only when user must supply assets (`slide-authoring/references/assets.md`).
5. **Visual direction** — palette/type scale per **`slide-authoring`**; default `export const design: DesignSystem` + `var(--osd-X)`.
6. **Write `slides/<id>/index.tsx`** — **copy `slide-authoring/references/deck-template/index.tsx`** into `slides/<id>/index.tsx` (do **not** use `getting-started`, marketing decks, production demos under `apps/demo/slides/`, or **`apps/demo/examples/`** as scaffold). Then follow **`deck-layers.md`**: replace placeholder **`CONTENT`**, paste pattern skeletons from the INDEX into templates/pages, adjust **`design`** (and theme overrides from Step 1), trim or add `Page` components — typography roles stay on `var(--osd-*)`; set `typeScale.body` per scoping (`canvas-and-layout.md`).
7. **Self-review** — `slide-authoring/references/self-review-checklist.md`.
8. **Hand off** — id, path, `/s/<id>` when dev runs; don't start dev unless asked.
