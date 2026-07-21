# open-slide — slide workspace

You author **slides** here (`slides/<id>/index.tsx`, `themes/`). Kit protocol: **`.agent/SLIDE-KIT.md`**.

## How to invoke (workflows, not raw skills)

```txt
YOU  →  /create-slide  or  $workflow-create-slide     (workflow)
         ↓
Agent (@slide-author, @theme-author)
         ↓
Skill (create-slide, slide-authoring, …)
         ↓
slides/, themes/
```

| IDE | You invoke | Adapter |
| --- | --- | --- |
| **Cursor** | `/create-slide`, `/apply-comments`, `/create-theme` | `.cursor/commands/` → `.agent/workflows/` |
| **Claude Code** | same slash commands | `.claude/commands/` → `.agent/workflows/` |
| **Codex** | `$workflow-create-slide`, `$workflow-apply-comments`, `$workflow-create-theme` | `.agents/skills/workflow-*/SKILL.md` → `.agent/workflows/` |
| **`.agent` indexers** | read `.agent/workflows/` | none |

Run **`pnpm sync:kit`** after upgrading **`@open-slide/core`**.

## Hard rules

- Put your slide under `slides/<kebab-case-id>/` with entry `slides/<id>/index.tsx`.
- Put slide-specific assets under `slides/<id>/assets/`; shared assets under `assets/` (`@assets/...`).
- Do **not** touch `package.json`, `open-slide.config.ts`, or other slides.
- Do not add dependencies. Use only `react` and standard web APIs.
- Do not edit synced **`.agent/`** or adapters — pull kit updates via **`pnpm sync:kit`**.

## Which skill to use

- **New deck** — `$workflow-create-slide` / `/create-slide` → **`create-slide`**, **`slide-authoring`**
- **Inspector comments** — `$workflow-apply-comments` / **`apply-comments`**
- **Theme** — `$workflow-create-theme` / **`create-theme`**
- **“This page”** — **`current-slide`**
- **Other TSX edits** — **`slide-authoring`**
