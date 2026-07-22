---
title: Export pipeline (HTML, PDF, PPTX)
status: approved
version: 1.0
updated: 2026-07-21
depends_on: [05_architecture.md]
---

# Export pipeline — architecture detail

> Client-side and build-time export paths. Static **`open-slide build`** does not bundle dev `__*` APIs.

## Modes

| Mode | Trigger | Output | Runs where |
| ---- | ------- | ------ | ---------- |
| Static site | CLI `open-slide build` | Vite `dist/` (SPA + assets) | Node + Vite production build |
| Single-file HTML | UI export action | `.html` or `.zip` with inlined assets | Browser (`export-html.ts`) |
| PDF | UI export | Print pipeline via browser | Browser (`export-pdf.ts`) |
| PNG | UI export | `.png` or `.zip` of per-page images | Browser (`export-raster.ts` + `export-slide-capture.ts`) |
| JPG | UI export | `.jpg` or `.zip` of per-page images | Browser (`export-raster.ts` + `export-slide-capture.ts`) |
| PPTX | UI export | Generated deck file | Browser (`export-pptx.ts`) |

## Static build (`open-slide build`)

1. `packages/core/src/cli/build.ts` calls `createViteConfig({ mode: 'build' })`.
2. Vite production build emits consumer `outDir` (default `dist/`).
3. No Connect middleware — slide modules compiled like a normal Vite app.
4. Deploy `dist/` to any static host (see `08_environments.md`).

## HTML export (in-app)

Entry: `packages/core/src/app/lib/export-html.ts`.

1. Renders each slide page with `createRoot` off-DOM (`renderPagesToHtml`).
2. Collects bundled CSS from document stylesheets (`collectCss`).
3. Fetches referenced asset URLs, rewrites to relative paths; optional zip when assets exist.
4. Injects `DesignSystem` CSS vars via `designToCssVars` when deck defines tokens.
5. Downloads via blob — no server round-trip.

**Trust:** same-origin assets only; failed fetches skipped silently.

## PDF export

Entry: `export-pdf.ts` — uses print/CSS page sizing aligned with canvas dimensions from `sdk.ts`. Depends on browser print engine; not a server render.

## PPTX export

Entry: `export-pptx.ts` — rasterizes slide frames via shared `export-slide-capture.ts`, then assembles PPTX with `fflate`. Heavy client work; quality tied to canvas 1920×1080 defaults and `CAPTURE_PIXEL_RATIO`.

## PNG / JPG export

Entry: `export-raster.ts` — same off-DOM capture as image PPTX; single-page decks download one file (`{slideId}.png` / `.jpg`), multi-page decks download `{slideId}.zip` with `{slideId}-01.png` style names. JPG encodes at quality 0.92 after PNG capture.

## Security boundary

| Surface | Dev `__*` APIs | Export |
| ------- | -------------- | ------ |
| Production static | absent | no mutation |
| Dev server | present | export still client-only |

## Related docs

- `docs/05_architecture.md` — Flow 3 Present and export
- `docs/07_api_contracts.md` — npm exports, not export file formats
- `docs/02_security.md` — no upload of deck content to open-slide servers by default
