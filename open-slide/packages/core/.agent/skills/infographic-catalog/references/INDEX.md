# Infographic catalog — index

Machine-readable index: **`catalog.json`**. Prompt bodies: **`layouts/`** (**39** archetypes) and **`styles/`** (**56** visual styles). Thumbnails: **`previews/layouts/`**, **`previews/styles/`**.

**Not slide TSX** — deck skeletons: **`slide-authoring`** → **`pattern-library/INDEX.md`**.

| Doc | Role |
| --- | --- |
| [aspect-ratios.md](aspect-ratios.md) | **14** canvas ratios + 4 output sizes (scoping) |
| [aspect-ratios.json](aspect-ratios.json) | Same list, machine-readable |
| [layouts-by-category.md](layouts-by-category.md) | All layout ids grouped by taxonomy |
| [README.md](README.md) | Maintainer refresh of `.md` / `catalog.json` |
| [prompt-assembly.md](prompt-assembly.md) | Prompt composition order |
| [catalog.json](catalog.json) | ids, tags, paths |

## Layout taxonomy

`Process`, `Structure`, `Comparison`, `Metaphor`, `Data`, `Identity` — full tables in **`layouts-by-category.md`**.

## Styles

**56** ids — filter in **`catalog.json`** by `vibe` and `format`; one **`styles/<id>.md`** per id.

## When to read

- **`/generate-infographic`** scoping — layouts-by-category + style options from `catalog.json`.
- Composing prompts — layout + style `.md` + **`prompt-assembly.md`**.
