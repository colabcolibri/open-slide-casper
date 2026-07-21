# Create slide — scoping (Step 2)

**Before writing any code, lock in style decisions via `AskUserQuestion`.** Only skip when already answered by the user or by a theme from Step 1 (theme settles aesthetic — ask the remaining questions). If you skip, restate your assumption.

**Topic comes first.** If the request is thin ("make me a deck"), use a separate `AskUserQuestion` for topic, audience, and outline. If topic is clear, restate it in the next call.

Then ask in one `AskUserQuestion` (multi-question form):

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
