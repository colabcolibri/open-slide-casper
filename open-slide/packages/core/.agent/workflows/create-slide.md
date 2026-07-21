---
description: Draft a new slide deck — theme, scoping questions, then slides/<id>/index.tsx.
---

# create-slide — new deck

$ARGUMENTS

| Workflow | Agent | Mode |
| --- | --- | --- |
| `create-slide` | `slide-author` | new deck under `slides/` |

---

## Critical rules

1. Use agent **`slide-author`** (`.agent/agents/slide-author.md`).
2. Use **`slide-routing`** when the request could match framework work, themes, comments, or a new deck.
3. **Mandatory skills:** **`create-slide`**, **`slide-authoring`** — page types under **`.agent/skills/slide-authoring/references/page-types/`** before TSX.
4. **Write scope:** only `slides/<id>/` (+ assets). Never `packages/core`, config, or other slides.
5. Do not run the dev server unless the user asks.

---

## Task

```txt
CONTEXT:
- User Request: $ARGUMENTS
- Mode: CREATE SLIDE DECK
- Agent: slide-author

RULES:
1. Execute create-slide skill Steps 1–8 (theme → scoping → id → structure → visual direction → index.tsx → self-review → handoff).
2. Step 2: `.agent/skills/create-slide/references/scoping.md`.
3. Step 4: page types in **`slide-authoring`**; Step 6: `.agent/skills/slide-authoring/references/page-types/title-body-footer.md`.
4. Self-review: `.agent/skills/slide-authoring/references/self-review-checklist.md`.
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
