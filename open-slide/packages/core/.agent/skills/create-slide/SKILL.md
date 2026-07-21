---
name: create-slide
description: Use this skill when the user wants to create, draft, author, or generate new slides / a presentation in this open-slide repo. Triggers on phrases like "make slides about X", "make a deck about X", "create a presentation", "draft slides for", "new slide", or when the user asks to add content under `slides/`. Do NOT use for editing the framework itself — only for authoring content inside `slides/<id>/`.
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
