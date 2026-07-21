---
description: Create or extract a reusable theme under themes/ (<id>.md + <id>.demo.tsx).
---

# create-theme — theme bundle

$ARGUMENTS

---

## Critical rules

1. **Mandatory skill:** `skills/create-theme/SKILL.md` — **Mandatory** read `references/theme-md-template.md` before `.md`.
2. Read **`skills/slide-authoring/SKILL.md`** for canvas and type-scale defaults before overriding in the theme.
3. **Write scope:** only `themes/<id>.md` and `themes/<id>.demo.tsx`. Never real slides under `slides/`.
4. Theme id: kebab-case; check `themes/` for collisions.

---

## Task

```txt
CONTEXT:
- User Request: $ARGUMENTS
- Mode: CREATE THEME

RULES:
1. Follow create-theme skill steps (input source → gather → id → markdown → demo.tsx).
2. Demo file must export a non-empty Page[] like a normal slide module.
3. Document palette, typography, Title/Footer components, and motion in the .md for create-slide to consume.
```

---

## Output

```txt
Theme created:
- id:
- files: themes/<id>.md, themes/<id>.demo.tsx
Next: create-slide can offer this theme; preview in dev UI Themes panel
```
