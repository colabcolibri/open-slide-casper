# Infographic catalog (slide kit)

Everything agents need for **infographic layout archetypes** and **visual styles** lives in this folder and ships with `@open-slide/core` (`.agent/`).

| Path | Contents |
| --- | --- |
| `catalog.json` | ids, labels, categories/tags, paths to prompts and previews |
| `layouts-by-category.md` | Layout ids grouped by taxonomy (**generated** with the build script) |
| `layouts/*.md` | Full layout prompt (`promptInstruction` equivalent) |
| `styles/*.md` | Full style prompt (`promptModifier` equivalent) |
| `previews/layouts/*.webp` | Layout thumbnail references |
| `previews/styles/*.webp` | Style thumbnail references |
| `snapshot/` | Vendored TS/JSON used only to regenerate `.md`, `catalog.json`, and `layouts-by-category.md` (maintainers) |

## Refreshing prompts after editing snapshot

If you replace files under `snapshot/`:

```bash
node scripts/build-infographic-catalog.mjs
```

(from the `open-slide/` monorepo root). Previews are normal files — update `previews/` directly (copy or export) when thumbnails change.

## Runtime

Authors and agents **only read this directory**. No external repo or sync step is required in consumer projects.
