---
name: workflow-create-slide
description: Draft a new slide deck — theme pick, scoping questions (required), then slides/<id>/index.tsx only after answers. Cursor /create-slide; Codex $workflow-create-slide.
---

# /create-slide — new deck

$ARGUMENTS

| Slash | Workflow file | Agent | Mode |
| --- | --- | --- | --- |
| **`/create-slide`** | `workflows/create-slide.md` | `slide-author` | new deck under `slides/` |

---

## Critical rules

1. Use agent **`slide-author`** (`.agent/agents/slide-author.md`).
2. Load **`.agent/skills/create-slide/SKILL.md`** — follow Steps 1–8 **in order**.
3. **Scoping gate (P0):** Do **not** create or edit `slides/<id>/index.tsx` (or assets) until Step 2 is done — user answered scoping (or you documented explicit skips with assumptions). A thin `$ARGUMENTS` is **not** enough to skip questions.
4. **Same turn after `/create-slide`:** Steps 1–2 only — theme pick (if needed) + **`AskUserQuestion`** / chat questions. **Stop** when questions are out; resume Steps 3–8 only after the user replies (new turn or continued thread with answers).
5. Use **`slide-routing`** when intent could be framework work, themes-only, comments, or ambiguous.
6. **Mandatory skills:** **`create-slide`**, **`slide-authoring`** — page types under **`.agent/skills/slide-authoring/references/page-types/`** before TSX.
7. **Write scope:** only `slides/<id>/` (+ assets). Never `packages/core`, config, or other slides.
8. Do not run the dev server unless the user asks.

If **`AskUserQuestion`** is unavailable (e.g. some Codex sessions), ask the same scoping items **in chat** and **wait** — do not invent topic, page list, or aesthetic and write TSX in the same turn.

---

## Task

```txt
CONTEXT:
- User Request: $ARGUMENTS
- Mode: CREATE SLIDE DECK (may be phase A discovery or phase B build)
- Agent: slide-author

PHASE A — discovery (required when scoping not already answered):
1. Read .agent/skills/create-slide/SKILL.md — Step 1 (theme-pick) and Step 2 (scoping.md).
2. Ask topic / audience / outline if the request is thin.
3. Ask scoping questions (aesthetic unless theme locked, page count, density, motion, format).
4. End turn with questions only — no slides/ writes.

PHASE B — build (only after user answers Phase A):
5. Steps 3–8: id → structure → visual direction → index.tsx → self-review → handoff.
6. Step 6: .agent/skills/slide-authoring/references/page-types/title-body-footer.md.
7. Self-review: .agent/skills/slide-authoring/references/self-review-checklist.md.
```

---

## Output

**Phase A (scoping only — no TSX yet):**

```txt
Scoping — /create-slide:
- understood topic: (or "needs your input")
- theme: (picked id | none | pending)
- questions asked: (list)
- assumptions: (only if user already supplied detail — else "none")
Next: reply with answers; then I continue with slides/<id>/index.tsx
```

**Phase B (after answers — deck written):**

```txt
Deck created:
- slide id:
- path: slides/<id>/index.tsx
- dev URL: /s/<id> (when dev server is running)
Next: user preview, or /apply-comments for inspector markers
```
