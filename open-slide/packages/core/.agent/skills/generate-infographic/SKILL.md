---
name: generate-infographic
description: Plans an image-based infographic from source content — selects layout and style from the infographic catalog, drafts visualDescription and final image prompt per prompt-assembly.md. Use with /generate-infographic or @infographic-author. Does not edit slides/ or themes/; image API integration is out of scope until wired.
---

# Generate infographic (plan + prompt)

Entry workflow: **`/generate-infographic`** → `.agent/workflows/generate-infographic.md`.

Produces **prompt artifacts** (layout/style ids, strategy scene text, assembled image prompt). Does **not** write under `slides/` or `themes/`.

---

## Selective reading

| File | When to read |
| ---- | ------------ |
| `infographic-catalog/SKILL.md` | Catalog lookup rules |
| `infographic-catalog/references/catalog.json` | **Mandatory** — ids and paths |
| `infographic-catalog/references/prompt-assembly.md` | **Mandatory** — pipeline order |
| `infographic-catalog/references/layouts/<id>.md` | After layout chosen |
| `infographic-catalog/references/styles/<id>.md` | After style chosen |

---

## Procedure

1. **Inputs** — source text (lesson, brief, bullets), target language, optional `aspectRatio` (default `9:16`), `detailLevel` (`summary` | `full` | `specific`), optional author `finalInstruction`.
2. **Catalog** — with the user (or from brief), pick **`layoutId`** and **`styleId`** from `catalog.json`; show preview paths when comparing options.
3. **Strategy** — read layout + style `.md` bodies; draft **`visualDescription`** (quoted label text, placement, flow). Follow layout STRUCTURE and style art direction.
4. **Assembly** — build final image prompt per `prompt-assembly.md` (orientation, layout label line, scene, overrides).
5. **Hand off** — document chosen ids, `visualDescription`, final prompt string, and note that image generation is not invoked by this skill until a provider is integrated.

Do not call external repos or sync scripts at runtime — catalog is already in the kit.
