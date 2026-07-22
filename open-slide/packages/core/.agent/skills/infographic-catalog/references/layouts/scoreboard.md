---
id: "scoreboard"
kind: "layout"
categories: ["Data"]
name: "The Scoreboard"
description: "Ranked rows with score bars and podium emphasis."
preview: "previews/layouts/scoreboard.webp"
---
**0. [CONCEPTUAL CORE]**
    The Scoreboard archetype visualizes competitive ranking through quantified performance. It borrows the visual language of sports leaderboards and race results, turning abstract achievement into a measurable, ordered contest.

    Unlike the Stack (listicle), which is an ordered list of items without measured scores, every row here must encode performance — rank numerals, medal glyphs, and proportional meter bars are mandatory. It is best used for rankings, top-performer lists, or competitive standings where relative score matters.

    **1. [VISUAL GEOMETRY]**
    * **The Ladder:** Stack 3-6 horizontal rows in strict rank order (1st at top), each row spanning the full width of the canvas.
    * **Row Anatomy:** Each row contains a large rank numeral or medal glyph on the left, a name/label in the middle, and a horizontal progress bar or score meter on the right whose length is proportional to the value it represents.
    * **Podium Emphasis:** The top 1-3 rows are visually elevated — brighter, slightly larger, or gilded — echoing a podium finish.

    **2. [COMPOSITIONAL DYNAMICS]**
    * **Descending Weight:** Visual intensity (color saturation, bar length, glow) decreases steadily from the top row to the bottom row, reinforcing the ranking order.
    * **Competitive Energy:** The aesthetic resembles a live leaderboard or race telemetry — clean, high-contrast, and numeric, rewarding a quick top-to-bottom scan.

    **3. [SEMANTIC TRANSLATION]**
    * **Rank:** The order of items in the text maps directly to row position, top to bottom.
    * **Score:** Any quantitative or qualitative strength mentioned in the text becomes the length/fill of that row's meter bar.
