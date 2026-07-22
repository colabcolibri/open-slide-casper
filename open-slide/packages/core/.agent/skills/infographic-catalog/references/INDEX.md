# Infographic catalog — index

Machine-readable index: **`catalog.json`**. Prompt bodies: **`layouts/`** (39 archetypes) and **`styles/`** (56 visual styles). Thumbnail references: **`previews/layouts/`**, **`previews/styles/`**.

**Not slide TSX patterns** — for deck skeletons see **`../pattern-library/INDEX.md`**.

| Doc | Role |
| --- | --- |
| [README.md](README.md) | What is vendored here and how to refresh `.md` / `catalog.json` |
| [prompt-assembly.md](prompt-assembly.md) | How to compose strategy + image prompts |
| [catalog.json](catalog.json) | ids, taxonomy tags, paths to `.md` + preview |

## When to read

- Before a **future** infographic generation workflow — pick `layoutId` + `styleId` from `catalog.json`, then load the matching `.md` files.
- When comparing spatial archetypes — layout preview + `layouts/<id>.md`.
- When tuning art direction — style preview + `styles/<id>.md`.

## Layout categories

`Process`, `Structure`, `Comparison`, `Metaphor`, `Data`, `Identity` — see `categories` on each layout in `catalog.json`.

## Defaults (production infographics)

| Setting | Value |
| --- | --- |
| Aspect ratio | `9:16` (catalog thumbnails are `1:1`) |
| Image size | `1K` |
| Image model | `gemini-3.1-flash-image` (when an image provider is wired) |

Agent/workflow implementation is separate from this reference pack.
