---
name: workflow-list-infographic-layouts
description: List all infographic layout archetypes (39 ids) from the vendored catalog — for humans and agents choosing a layoutId. Cursor slash command /list-infographic-layouts.
---

# /list-infographic-layouts — layout catalog inventory

$ARGUMENTS

| Slash | Workflow | Agent | Mode |
| --- | --- | --- | --- |
| **`/list-infographic-layouts`** | `workflows/list-infographic-layouts.md` | `infographic-author` | read-only list |

---

## Critical rules

1. Agent **`infographic-author`** — catalog browse only; do not author slides/themes.
2. Load **`infographic-catalog/SKILL.md`**; follow **`references/list-catalog.md`** (layouts section).
3. Read **`infographic-catalog/references/catalog.json`** (`layouts`) and **`layouts-by-category.md`** for grouping context.
4. Optional **`$ARGUMENTS`**: filter by taxonomy category (e.g. `Process`, `Metaphor`). Case-insensitive.
5. **No** prompt drafting, **no** scoping interview — this is a directory listing.
6. Default output: **chat** (markdown table). Do not write files unless the user asks.

---

## Task

```txt
List every layout archetype in the infographic catalog.
- If $ARGUMENTS names a category, filter layouts whose categories include it.
- Table columns: id | name | categories | description
- Count: expect 39 total when unfiltered
- Point to previews/ and layouts/<id>.md for follow-up
```

---

## Related

- Visual styles: **`/list-infographic-styles`**
- Plan + prompt: **`/generate-infographic`**
