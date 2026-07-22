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
| **`.agent` indexers** | read workflows under `.agent/workflows/` | none |

After **`open-slide sync:kit`** or monorepo **`pnpm sync:kit:demo`**: **`.agent/`** is a local copy; **`.cursor/`**, **`.agents/`**, **`.claude/`**, **`.codex/`** symlink into it.

## Hard rules

- **`/create-slide` / `$workflow-create-slide`:** ask scoping first (topic, theme, pages, density, motion, format). **Do not** write `slides/` until the user answers — same turn = questions only.
- One deck per `slides/<kebab-case-id>/` with `index.tsx` — **CONTENT → templates → pages** (`slide-authoring/references/deck-layers.md`).
- Do not edit synced **`.agent/`** or adapters as source of truth — change **`@open-slide/core`** and re-sync.
- Do not touch `package.json` or other slides unless the user asked.

## Update kit

```bash
pnpm up @open-slide/core
pnpm sync:kit
```

(`pnpm sync:skills` is the same command.)
