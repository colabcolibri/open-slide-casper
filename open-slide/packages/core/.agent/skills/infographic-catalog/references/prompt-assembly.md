# Infographic prompt assembly

How to compose prompts for **image-based infographics** using this kit. Load **`catalog.json`**, then **`layouts/<layoutId>.md`** and **`styles/<styleId>.md`**.

## Pipeline (target)

```txt
Source text
  → guardrail (sanitize)
  → strategy LLM
       inputs: style prompt, layout prompt, persona, detailLevel, …
       output: visualDescription
  → final image prompt shell (orientation + layout label + scene + overrides)
  → image API (aspectRatio, imageSize, optional reference images)
```

## Strategy phase

The strategy model should receive:

1. **Visual style** — body of `styles/<styleId>.md`.
2. **Layout structure** — body of `layouts/<layoutId>.md` (CONCEPTUAL CORE, VISUAL GEOMETRY, etc.).
3. **Canvas geometry** — from `aspectRatio` (default `9:16`).
4. **Detail level** — `summary` | `full` | `specific` | `addendum`.
5. Optional: persona, user highlights, reference guidance, author `finalInstruction` (highest priority).

Output: **`visualDescription`** with quoted label text for the image model.

## Image phase (final prompt)

Use a shell similar to:

```txt
Create a high-quality infographic.
ORIENTATION: {{aspectRatio}}
{{layoutReference}}

SCENE DESCRIPTION:
{{visualDescription}}
{{guidancePrompt}}
{{finalInstructionPrompt}}

INSTRUCTION:
Render this scene exactly as described…
```

- **`layoutReference`** — short human name + description (from `catalog.json` / labels), not the full STRUCTURE block (that already fed strategy).
- **`visualDescription`** — strategy output.

## Catalog thumbnails (1:1)

Maintainer previews in `previews/` use **plain neutral layout** or **fixed style demo** compositions at **1:1**. Production infographics use the user’s aspect ratio and full style modifier.

## Defaults

| Parameter | Typical production value |
| --- | --- |
| `aspectRatio` | `9:16` |
| `imageSize` | `1K` |
| `imageModelId` | `gemini-3.1-flash-image` |

Future: `workflows/generate-infographic.md` + agent/skill that loads this folder before calling an image provider.
