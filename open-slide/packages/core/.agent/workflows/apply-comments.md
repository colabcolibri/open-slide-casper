---
description: Apply @slide-comment markers from the inspector in slides/<id>/index.tsx.
---

# apply-comments — inspector markers

$ARGUMENTS

---

## Critical rules

1. **Mandatory skill:** `skills/apply-comments/SKILL.md`.
2. **Mandatory reference:** `skills/slide-authoring/SKILL.md` for every edit (canvas, tokens, layout).
3. If the user says “this page” without naming a slide, read **`skills/current-slide/SKILL.md`** first.
4. **Write scope:** only files under `slides/` that contain markers (usually one `index.tsx`).
5. Remove each marker after the edit is applied.

---

## Task

```txt
CONTEXT:
- User Request: $ARGUMENTS
- Mode: APPLY SLIDE COMMENTS

RULES:
1. Find @slide-comment markers (regex in apply-comments skill).
2. Decode note text; edit the enclosing element per slide-authoring.
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
