---
description: Draft a new slide deck — theme, scoping questions, then slides/<id>/index.tsx.
---

# create-slide — new deck

$ARGUMENTS

---

## Critical rules

1. Use **`slide-routing`** when the request could match framework work, themes, comments, or a new deck.
2. **Mandatory skill:** `create-slide` (`skills/create-slide/SKILL.md`) — procedure after this workflow gate.
3. **Mandatory reference:** `skills/slide-authoring/SKILL.md` + page types under `skills/slide-authoring/references/page-types/` before writing TSX.
4. **Write scope:** only `slides/<id>/` (+ assets). Never `packages/core`, config, or other slides.
5. Do not run the dev server unless the user asks.

---

## Task

```txt
CONTEXT:
- User Request: $ARGUMENTS
- Mode: CREATE SLIDE DECK

RULES:
1. Execute create-slide skill Steps 1–8 (theme → scoping → id → structure → visual direction → index.tsx → self-review → handoff).
2. Step 2: `skills/create-slide/references/scoping.md`.
3. Step 4: page types table in slide-authoring; Step 6: paste PageLayout from `slide-authoring/references/page-types/title-body-footer.md`.
4. Self-review: `slide-authoring/references/self-review-checklist.md`.
```

---

## Output

```txt
Deck created:
- slide id:
- path: slides/<id>/index.tsx
- dev URL: /s/<id> (when dev server is running)
Next: user preview, or apply-comments for inspector markers
```
