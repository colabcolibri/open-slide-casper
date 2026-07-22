# Create slide — scoping (Step 2)

**Hard stop:** When this step runs, **do not** create or edit anything under `slides/` in the same turn. End with questions (or a restatement + confirmation ask). Steps 3–8 happen **after** the user answers.

**Before writing any code, lock in style decisions via `AskUserQuestion`** (or the same questions in chat if that tool is unavailable — then **wait** for a reply). Only skip a question when the user or Step 1 theme already answered it. If you skip, restate the assumption and invite correction.

**Topic comes first.** If the request is thin ("make me a deck", "/create-slide" with no args, "cria um slide"), use a separate `AskUserQuestion` (or chat block) for **topic, audience, and rough outline** before aesthetic / page count. Do not guess a product pitch or storyline.

Then ask in one `AskUserQuestion` (multi-question form), or an equivalent numbered list in chat:

1. **Aesthetic direction** — 3 options tailored to *this* topic (vibe + concrete visual cue). Not a fixed preset list. Examples by topic:
   - *Rust for backend engineers* → rust-orange editorial · blueprint dev-doc · brutalist terminal
   - *Q2 roadmap for stakeholders* → calm corporate · confident editorial · data-forward dashboard
   - *Kindergarten parent night* → playful crayon · soft pastel storybook · warm photo-led
   Mark best fit "(Recommended)". (`AskUserQuestion` adds "Other" — don't duplicate.)

2. **Page count** — 3–5 (short), 6–10 (standard), 11–20 (deep dive); "Other" for custom.

3. **Text density** — minimal / light / standard / dense (drives type scale and layout).

4. **Motion** — static / subtle / rich. If animated: `<Steps>`, `SlideTransition`, morph per `slide-authoring`; CSS keyframes OK; no extra libraries.

5. **Canvas format** — `slide` (1920×1080) or `4x5` (1080×1350); set `meta.format` end-to-end (`slide-authoring`).

Follow-ups only if still unclear (brand colors, required assets).

**Done when:** user has answered (or confirmed your restatement). Then proceed to **`create-slide`** Step 3.

At **Step 4 (structure)**, list each page and the main **CONTENT** fields (title, bullets, labels) so Step 6 writes the `CONTENT` object before `Page` components — see **`slide-authoring/references/deck-layers.md`**.
