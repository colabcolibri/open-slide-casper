# Create theme — input sources (Steps 1–2)

## Step 1 — Identify the input source

A theme can be derived from any combination of three input shapes:

- **Image references** — paths or URLs to slide screenshots, mood-board images, brand assets.
- **Free-text description** — prose describing the desired palette, fonts, feel.
- **An existing slide** — `slides/<id>/index.tsx` whose visual identity should be lifted out into a reusable theme.

If the user's original message already specifies the inputs unambiguously, skip the question and proceed. Otherwise call `AskUserQuestion` (multi-select) so they can pick one or more sources, and ask follow-ups (paths, slide id, prose) only as needed.

## Step 2 — Gather raw inputs

- **Images**: read each path with the `Read` tool (it accepts images). Note dominant colors as hex, type weight/style, layout rhythm, decorative motifs, and any recurring chrome (header bar, footer line, page numbers).
- **Text**: extract explicit tokens (hex codes, font names, motion verbs) and implicit tone words ("editorial", "playful", "brutalist"). Resolve vague language into concrete decisions before writing.
- **Existing slide**: read `slides/<id>/index.tsx` and pull:
  - The `design.palette` object (or a legacy top-of-file `palette` const) → Palette section.
  - `design.fonts` / font constants and any `font-size` patterns → Typography section.
  - Padding / alignment patterns → Layout section.
  - Recurring components (TrafficLights, Eyebrow, Footer-style helpers, WindowShell, …) → Fixed components section.
  - `@keyframes` blocks and the shared `styles` string → Motion section.
  - The aesthetic feel implied by the design → Aesthetic paragraph.

When inputs disagree (e.g. images use blue but the description says green), ask the user which to honor.
