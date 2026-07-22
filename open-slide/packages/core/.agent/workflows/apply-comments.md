---
name: workflow-apply-comments
description: Apply @slide-comment markers from the inspector in slides/<id>/index.tsx. Cursor slash command /apply-comments.
---

# /apply-comments — inspector markers

$ARGUMENTS

| Slash | Workflow file | Agent | Mode |
| --- | --- | --- | --- |
| **`/apply-comments`** | `workflows/apply-comments.md` | `slide-author` | apply `@slide-comment` markers |

---

## Critical rules

1. Use agent **`slide-author`** (`.agent/agents/slide-author.md`).
2. Load **`.agent/skills/apply-comments/SKILL.md`** and **`.agent/skills/slide-authoring/SKILL.md`** for every edit.
3. If the user says “this page” without naming a slide, load **`current-slide`** first.
4. **Write scope:** only files under `slides/` that contain markers (usually one `index.tsx`).
5. Remove each marker after the edit is applied.

---

## Task

```txt
CONTEXT:
- User Request: $ARGUMENTS
- Mode: APPLY SLIDE COMMENTS
- Agent: slide-author

RULES:
1. Find @slide-comment markers (regex in apply-comments skill).
2. Decode note text; edit the enclosing element per slide-authoring. For copy changes, update CONTENT keys in deck-layers order when applicable.
3. Delete markers; do not leave stale comment lines.
4. If no markers remain, say so explicitly.
```

---

## Output

```txt
Comments applied:
- slide id(s):
- markers processed:
Next: user refresh dev preview
```
