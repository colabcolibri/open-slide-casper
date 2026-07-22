---
name: workflow-generate-infographic
description: Plan an image infographic — pick catalog layout and style, draft visualDescription and final image prompt. Cursor slash command /generate-infographic.
---

# /generate-infographic — infographic plan + prompt

$ARGUMENTS

| Slash | Workflow file | Agent | Mode |
| --- | --- | --- | --- |
| **`/generate-infographic`** | `workflows/generate-infographic.md` | `infographic-author` | catalog + prompt (no slide TSX) |

---

## Critical rules

1. Use agent **`infographic-author`** (`.agent/agents/infographic-author.md`).
2. Load **`.agent/skills/generate-infographic/SKILL.md`** and follow its procedure.
3. Load **`.agent/skills/infographic-catalog/SKILL.md`** for catalog paths.
4. Read **`infographic-catalog/references/prompt-assembly.md`** before assembling the final image prompt.
5. **Write scope:** this workflow does **not** create files under `slides/` or `themes/` unless the user explicitly asks to save a prompt artifact in an agreed path. Default output is chat deliverable (ids + prompts).
6. **Out of scope:** calling an image API — document the prompt for a later integration step.

---

## Task

```txt
CONTEXT:
- User Request: $ARGUMENTS
- Mode: GENERATE INFOGRAPHIC (plan)
- Agent: infographic-author

RULES:
1. Pick layoutId + styleId from catalog.json (confirm with user when unclear).
2. Read matching layouts/<id>.md and styles/<id>.md.
3. Produce visualDescription and final image prompt per prompt-assembly.md.
4. Do not route to slide-authoring pattern-library for TSX skeletons.
```

---

## Output

```txt
Infographic plan:
- layoutId:
- styleId:
- aspectRatio:
- visualDescription: (summary)
- finalImagePrompt: (or attached block)
Next: image provider integration (future) | embed in slide as asset (user-directed)
```
