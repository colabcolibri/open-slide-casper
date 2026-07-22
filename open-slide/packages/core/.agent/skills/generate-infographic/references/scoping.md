# Generate infographic — scoping (Step 2)

**Hard stop:** When this step runs, **do not** draft `visualDescription` or the final image prompt in the same turn. End with questions (or a restatement + confirmation ask). Steps 3–5 happen **after** the user answers.

**Before composing prompts, lock decisions via `AskUserQuestion`** (or the same questions in chat if that tool is unavailable — then **wait** for a reply). Only skip a question when the user or Step 1 already answered it. If you skip, restate the assumption and invite correction.

**Source content comes first.** If the request is thin (`/generate-infographic` with no args, “faz um infográfico”), ask for **source text or outline**, **audience**, and **language** before layout/style.

Then ask in one `AskUserQuestion` (multi-question form), or an equivalent numbered list in chat:

1. **Content density** — how much text on the image:
   - **summary** — headlines, key stats, minimal copy (default)
   - **full** — rich editorial; tighten phrasing but keep meaning
   - **specific** — user-picked highlights / literal phrases must appear
   - Mark best fit "(Recommended)" from the brief.

2. **Canvas proportion** — **mandatory:** offer **all 14** ratios from **`infographic-catalog/references/aspect-ratios.md`** (or `aspect-ratios.json`). Present as selectable options with **ratio id + label + hint** (same set as the product picker: `1:1`, `9:16`, `4:5`, `2:3`, `3:4`, `1:4`, `1:8`, `16:9`, `21:9`, `3:2`, `4:3`, `5:4`, `4:1`, `8:1`). Default suggestion: **`4:5`** unless the brief clearly needs stories (`9:16`) or apresentação (`16:9`). Do not invent ratios outside this list.

3. **Output resolution (optional)** — if relevant: `512` | `1K` (default) | `2K` | `4K` per **`aspect-ratios.md`** § Resolução.

4. **Layout archetype** — pick from **`infographic-catalog/references/layouts-by-category.md`** (or 3 options with id + `description` from `catalog.json`). Use `previews/layouts/` when comparing.

5. **Visual style** — pick from **`catalog.json`** `styles` (filter by `vibe` / `format` if helpful). Show 3 tailored options; `previews/styles/`.

6. **Optional overrides** — reference images + guidance, or author **priority** (`finalInstruction`).

Follow-ups only if still unclear (must-include quotes, forbidden topics, brand colors).

**Done when:** user has answered (or confirmed your restatement). Then proceed to **`generate-infographic`** Step 3.

At **Step 3**, restate `layoutId`, `styleId`, `detailLevel`, `aspectRatio`, and `outputSize` (if set) before reading the `.md` prompt files.
