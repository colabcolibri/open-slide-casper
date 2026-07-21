---
name: create-theme
description: Creates or extracts reusable slide themes (themes/<id>.md and <id>.demo.tsx) in open-slide workspaces. Use when the user asks to create or extract a theme, or when /create-theme runs. Do not use for editing slides under slides/ or framework code.
---

# Create a slide theme

Entry workflow: **`/create-theme`** → `.agent/workflows/create-theme.md`. Produces a **theme bundle** under `themes/`:

1. `themes/<id>.md` — what `create-slide` reads when an author picks the theme.
2. `themes/<id>.demo.tsx` — preview in the dev UI **Themes** panel (not listed under slides).

Theme markdown = authoring direction; per-slide `design` const = runtime tweak panel; demo `.tsx` = preview only.

**Write scope:** only `themes/<id>.md` and `themes/<id>.demo.tsx`. Read **`slide-authoring`** before overrides (canvas, type scale).

---

## Selective reading

| File | When to read |
| ---- | ------------ |
| `references/input-sources.md` | Steps 1–2 — images, text, or lift from slide |
| `references/theme-md-template.md` | **Mandatory** before writing `themes/<id>.md` |
| `references/theme-demo-contract.md` | **Mandatory** before `themes/<id>.demo.tsx` |
| `references/theme-self-review.md` | Step 5 — checklist |
| `references/anti-patterns.md` | Any time — quick guardrails |
| `slide-authoring/SKILL.md` | Before palette/type overrides |

---

## Procedure

1. **Inputs** — follow `references/input-sources.md`.
2. **Theme id** — kebab-case; check `themes/` for collisions (e.g. `editorial-noir`).
3. **Write `.md`** — section order and snippets from `references/theme-md-template.md`.
4. **Write `.demo.tsx`** — contract + skeleton from `references/theme-demo-contract.md`.
5. **Self-review** — `references/theme-self-review.md`.
6. **Hand off** — theme id, both paths, Themes panel + `/create-slide` picker, one-line aesthetic summary. Do not run dev server or edit real slides.

New themes **auto-register** when `themes/<id>.md` exists (see **`create-slide/references/theme-registry.md`**) — no manifest or CLI register step.
