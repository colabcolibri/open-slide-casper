# Theme registry (how themes appear in the app)

Themes are **not** registered in SQLite, JSON manifests, or config. The **open-slide** Vite plugin discovers them from disk.

## On disk (authoring)

| File | Required | Role |
| --- | --- | --- |
| `themes/<id>.md` | **Yes** | Source of truth for palette, typography, layout, fixed components |
| `themes/<id>.demo.tsx` | Recommended | Preview in dev UI **`/themes`** (not a slide under `slides/`) |

Rules:

- **`<id>`** = kebab-case basename of the `.md` file (e.g. `ocean-glass.md` → id `ocean-glass`).
- Only **`themes/*.md` at the themes root** — no subfolders (matches `fast-glob('*.md')` in the runtime).
- Ignore `README.md` in the picker (human index only).
- **Frontmatter** (YAML) is what the UI and the agent **catalog** use:

```yaml
---
name: Human title
description: One-line pitch for gallery + picker
mode: dark   # or light — for agent hints; optional but recommended
---
```

After adding or renaming files, **dev server reload** refreshes the virtual `themes` module — no extra register step.

## Runtime (consumer)

`packages/core` **`themesPlugin`** reads each `themes/*.md`, parses **name** + **description**, attaches **body** for the theme detail view, and wires **`loadThemeDemo(id)`** when `<id>.demo.tsx` exists.

Slides link back via **`meta.theme: '<id>'`** on `SlideMeta` in `slides/<deck>/index.tsx`.

## Agent (create-slide Step 1)

**Do not read every theme `.md` end-to-end to build the picker.**

**Preferred:** from the **slide app root** (folder with `open-slide.config.ts` and `@open-slide/core` in `package.json` — e.g. `apps/demo`, not the monorepo root unless that app lives there):

```bash
pnpm themes:list
# or
pnpm exec open-slide themes list --json
# npm: npx open-slide themes list --json
```

`open-slide` is **not** a global shell command unless you installed it with `-g`. The bin lives in `node_modules/.bin/`; `pnpm dev` adds it to PATH for scripts only. Typing `open-slide` bare in zsh → `command not found` is expected outside `pnpm exec` / npm scripts.

That prints the same catalog the runtime uses: `id`, `name`, `description`, `mode`, `hasDemo`. One shell call replaces opening every `themes/*.md`.

**Fallback** (no CLI): read **only frontmatter** per file, or use `themes/README.md` if present.

Then:

1. **Pick** — `AskUserQuestion` (max 4 options): up to **3** ids best matched to the deck topic + **"no theme — design from scratch"**. Use catalog rows, not full markdown bodies.
2. **Deep read** — after the user chooses **one** id (or names one via Other), read **`themes/<id>.md` end-to-end** once. Never load all theme bodies “just in case”.

## Authoring new themes

**`/create-theme`** + skill **`create-theme`** — writes `themes/<id>.md` + `<id>.demo.tsx`. No separate register command.
