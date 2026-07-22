---
name: workflow-list-infographic-styles
description: List all infographic visual styles (56 ids) from the vendored catalog — for humans and agents choosing a styleId. Cursor slash command /list-infographic-styles.
---

# /list-infographic-styles — visual style catalog inventory

$ARGUMENTS

| Slash | Workflow | Agent | Mode |
| --- | --- | --- | --- |
| **`/list-infographic-styles`** | `workflows/list-infographic-styles.md` | `infographic-author` | read-only list |

---

## Critical rules

1. Agent **`infographic-author`** — catalog browse only; do not author slides/themes.
2. Load **`infographic-catalog/SKILL.md`**; follow **`references/list-catalog.md`** (styles section).
3. Read **`infographic-catalog/references/catalog.json`** (`styles` array).
4. Optional **`$ARGUMENTS`**: filter by `vibe` or `format` tag (e.g. `Retro`, `3D`, `Linear`).
5. **No** prompt drafting, **no** scoping interview.
6. Default output: **chat** (markdown table). Sort by `name` or group by first `vibe` tag when it helps scanning.

---

## Task

```txt
List every visual style in the infographic catalog.
- If $ARGUMENTS names a vibe or format tag, filter styles that include it.
- Table columns: id | name | vibe | format | description
- Count: expect 56 total when unfiltered
- Point to previews/ and styles/<id>.md for follow-up
```

---

## Related

- Layouts: **`/list-infographic-layouts`**
- Plan + prompt: **`/generate-infographic`**
