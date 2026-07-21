---
name: workflow-create-theme
description: Create or extract a reusable theme under themes/ (<id>.md + <id>.demo.tsx). Cursor slash command /create-theme.
---

# /create-theme — theme bundle

$ARGUMENTS

| Slash | Workflow file | Agent | Mode |
| --- | --- | --- | --- |
| **`/create-theme`** | `workflows/create-theme.md` | `theme-author` | theme bundle in `themes/` |

---

## Critical rules

1. Use agent **`theme-author`** (`.agent/agents/theme-author.md`).
2. Load **`.agent/skills/create-theme/SKILL.md`** and follow its procedure.
3. Read **`.agent/skills/create-theme/references/theme-md-template.md`** before writing `.md`.
4. Read **`.agent/skills/slide-authoring/SKILL.md`** for canvas and type-scale defaults before overriding in the theme.
5. **Write scope:** only `themes/<id>.md` and `themes/<id>.demo.tsx`. Never real slides under `slides/`.
6. Theme id: kebab-case; check `themes/` for collisions.

---

## Task

```txt
CONTEXT:
- User Request: $ARGUMENTS
- Mode: CREATE THEME
- Agent: theme-author

RULES:
1. Follow create-theme skill steps (input source → gather → id → markdown → demo.tsx).
2. Demo file must export a non-empty Page[] like a normal slide module.
3. Document palette, typography, Title/Footer components, and motion in the .md for /create-slide to consume.
```

---

## Output

```txt
Theme created:
- id:
- files: themes/<id>.md, themes/<id>.demo.tsx
Next: /create-slide can offer this theme; preview in dev UI Themes panel
```
