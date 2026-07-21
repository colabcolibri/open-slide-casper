---
name: create-slide
description: Creates and drafts new slide decks under slides/<id>/ in open-slide workspaces. Use when the user asks to make slides, create a presentation, or add a deck; also when /create-slide runs. Do not use for framework source or themes-only work.
---

# Create a slide in open-slide

Entry workflow: **`/create-slide`** → `.agent/workflows/create-slide.md`. This skill owns **procedure**; TSX contract lives in **`slide-authoring`**. Ambiguous intent → **`slide-routing`**.

**Write scope:** only `slides/<id>/`. Never `package.json`, `open-slide.config.ts`, or other slides.

---

## Selective reading

| File | When to read |
| ---- | ------------ |
| `references/theme-pick.md` | Step 1 — `themes/` + AskUserQuestion |
| `references/scoping.md` | **Mandatory** Step 2 — before any code |
| `slide-authoring/SKILL.md` | Steps 5–7 — design, file contract, checklist |
| `slide-authoring/references/page-types/title-body-footer.md` | Step 6 — paste PageLayout |
| Other `slide-authoring/references/page-types/*.md` | Step 4 — per-page layout choice |

---

## Procedure

1. **Theme** — `references/theme-pick.md`.
2. **Scope** — `references/scoping.md`.
3. **Slide id** — kebab-case; check `slides/` (e.g. `q2-roadmap`).
4. **Structure** — ordered page list; page types from **`slide-authoring`** § Page types; one idea per page; `<ImagePlaceholder>` only when user must supply assets (`slide-authoring/references/assets.md`).
5. **Visual direction** — palette/type scale per **`slide-authoring`**; default `export const design: DesignSystem` + `var(--osd-X)`.
6. **Write `slides/<id>/index.tsx`** — **`slide-authoring`** + paste **`PageLayout`** from `title-body-footer.md`.
7. **Self-review** — `slide-authoring/references/self-review-checklist.md`.
8. **Hand off** — id, path, `/s/<id>` when dev runs; don't start dev unless asked.
