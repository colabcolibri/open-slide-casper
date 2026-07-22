---
name: workflow-generate-infographic
description: Plan an image infographic after scoping — catalog layout and style, then visualDescription and final image prompt. Cursor slash command /generate-infographic.
---

# /generate-infographic — infographic plan + prompt

$ARGUMENTS

| Slash | Workflow file | Agent | Mode |
| --- | --- | --- | --- |
| **`/generate-infographic`** | `workflows/generate-infographic.md` | `infographic-author` | scoping + catalog + prompt (no slide TSX) |

---

## Critical rules

1. Use agent **`infographic-author`** (`.agent/agents/infographic-author.md`).
2. Load **`.agent/skills/generate-infographic/SKILL.md`** — follow Steps 1–5 **in order**.
3. **Scoping gate (P0):** Do **not** draft `visualDescription` or the final image prompt until Step 2 is done — user answered scoping (or you documented explicit skips with assumptions). Thin `$ARGUMENTS` is **not** enough to skip questions.
4. **Same turn after `/generate-infographic`:** Steps 1–2 only — intake + **`AskUserQuestion`** / chat questions. **Stop** when questions are out; resume Steps 3–5 only after the user replies.
5. Read **`infographic-catalog/references/aspect-ratios.md`** for canvas size options and **`layouts-by-category.md`** + **`catalog.json`** for layout/style.
6. Read **`infographic-catalog/references/prompt-assembly.md`** before Step 5 assembly.
7. **Write scope:** default output is chat deliverable. No `slides/` or `themes/` unless the user explicitly asks to save an artifact.
8. **Do not** name or assume a specific image backend vendor in user-facing copy.

If **`AskUserQuestion`** is unavailable, ask the same scoping items **in chat** and **wait**.

---

## Task

```txt
CONTEXT:
- User Request: $ARGUMENTS
- Mode: GENERATE INFOGRAPHIC (phase A discovery or phase B prompts)
- Agent: infographic-author

PHASE A — discovery (required when scoping not already answered):
1. Read generate-infographic SKILL.md Step 1–2 and references/scoping.md.
2. Ask source text / audience / language if the request is thin.
3. Ask scoping per `scoping.md`: density, **all 14** canvas ratios (`aspect-ratios.md`), optional output size, layout, style, overrides.
4. End turn with questions only — no prompt drafts.

PHASE B — build (only after user answers Phase A):
5. Read layouts/<id>.md and styles/<id>.md; draft visualDescription.
6. Assemble final image prompt per prompt-assembly.md; hand off in chat.
```

---

## Output

```txt
Infographic plan:
- layoutId:
- styleId:
- detailLevel:
- aspectRatio:
- visualDescription: (summary)
- finalImagePrompt: (block)
```
