# Infographic prompt assembly

How to compose prompts for **image-based infographics** using this kit. Load **`catalog.json`**, then **`layouts/<layoutId>.md`** and **`styles/<styleId>.md`**.

## Pipeline

```txt
Source text
  → sanitize / guard content
  → strategy (text)
       inputs: style prompt, layout prompt, detailLevel, aspectRatio, …
       output: visualDescription
  → final image prompt (orientation + layout label + scene + overrides)
  → image generation step (product integration — not specified in this kit)
```

## Strategy phase

The strategy step should receive:

1. **Visual style** — body of `styles/<styleId>.md`.
2. **Layout structure** — body of `layouts/<layoutId>.md` (CONCEPTUAL CORE, VISUAL GEOMETRY, etc.).
3. **Canvas geometry** — from `aspectRatio` (default `9:16` portrait).
4. **Detail level** — `summary` | `full` | `specific` | `addendum`.
5. Optional: tone/persona, user highlights, reference guidance, author `finalInstruction` (highest priority).

Output: **`visualDescription`** with quoted label text for rendering on the image.

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

- **`layoutReference`** — short human name + description (from `catalog.json`), not the full STRUCTURE block (that already fed strategy).
- **`visualDescription`** — strategy output.

## Catalog thumbnails

Maintainer previews in `previews/` use **plain neutral layout** or **fixed style demo** at **1:1**. Production pieces use the user’s chosen aspect ratio and full style modifier.

## Typical parameters (from scoping)

| Parameter | Default |
| --- | --- |
| `aspectRatio` | `4:5` (see `aspect-ratios.json`; 14 allowed values) |
| `detailLevel` | `summary` |

Do not assume a specific image backend in this document — only prompt shape and catalog content. Allowed ratios and sizes: **`aspect-ratios.md`**.
