---
title: As-is inventory
status: draft
created: 2026-07-21
updated: 2026-07-21
purpose: transitional
promoted_to: []
---

# As-is inventory

> Mapa do que já existe no monorepo **open-slide** antes do backlog Meridian forward-looking.
> Evidência vem do código em `open-slide/` (pnpm + Turbo).

## Capabilities

| Capability | Evidence | Confidence | Epic candidate | Gaps |
| ---------- | -------- | ---------- | -------------- | ---- |
| Scaffold de workspace de slides via CLI | `packages/cli`, `npx @open-slide/cli init` | high | — | Template skills sync manual via build |
| Dev server com viewer, home e hot reload | `packages/core/src/app`, `packages/core/src/cli/dev.ts` | high | EPIC-runtime | — |
| Canvas fixo 1920×1080 (e formatos alternativos via meta) | `packages/core/src/app/lib/sdk.ts`, `canvas.ts` | high | — | `meta.format` em evolução |
| Navegação entre páginas dentro do slide | `packages/core/src/app/lib/page-context.tsx`, `Step`/`Steps` | high | — | — |
| Modo apresentação fullscreen + presenter view | `packages/core/src/app/routes/presenter.tsx`, `components/present/*` | high | EPIC-present | — |
| Inspector: comentários clicáveis persistidos no TSX | `packages/core/src/vite/routes/comments.ts`, `editing/comments.ts` | high | EPIC-inspector | — |
| Edição estrutural via API dev (`/__edit`) | `packages/core/src/vite/routes/edit.ts`, `editing/edit-ops.ts` | high | — | Só dev server |
| CRUD de slides e páginas via API | `packages/core/src/vite/routes/slides.ts` | high | — | — |
| Pastas de decks + emoji + reorder | `packages/core/src/vite/routes/folders.ts`, `slides/.folders.json` | high | EPIC-organize | — |
| Gerenciador de assets por deck | `packages/core/src/vite/routes/assets.ts`, `files/assets.ts` | high | — | — |
| Busca de logos SVGL | `packages/core/src/vite/routes/svgl.ts` | high | — | Proxy externo |
| Export HTML estático e PDF | `packages/core/src/app/lib/export-html.ts`, `export-pdf.ts`, CLI build | high | EPIC-export | — |
| Export PPTX | `packages/core/src/app/lib/export-pptx.ts` | high | — | — |
| Design system por deck (tokens CSS) | `packages/core/src/app/lib/design.ts`, `vite/design-plugin.ts` | high | EPIC-design | slide-tokens WIP |
| Temas globais + galeria | `packages/core/src/vite/themes-plugin.ts`, `routes/themes` UI | high | — | — |
| Transições entre slides | `packages/core/src/app/lib/transition.ts`, `slide-transition-layer.tsx` | high | — | — |
| Morph entre elementos | `packages/core/src/app/components/morph-element.tsx` | high | — | — |
| i18n (en, ja, zh) | `packages/core/src/locale/*`, `locale-store.ts` | high | — | — |
| Slide skills (npm) | `open-slide/packages/core/skills/` | high | EPIC-agent | Shipped to consumers |
| Framework UI/motion rules | `docs/09_design_system.md`, `docs/04_principles.md` | high | — | Substitui `open-slide/.agents/` |
| Site marketing + docs (Fumadocs) | `apps/web` | high | EPIC-web | SEO pass pendente Meridian |
| Demo dogfood de decks | `apps/demo/slides/*` | high | — | Conteúdo demo, não produto |
| Testes unitários (Vitest) | `packages/**/*.test.ts`, root `vitest.config.ts` | high | — | — |
| Testes e2e Playwright | `packages/core/e2e/*` | high | — | CI em `.github/workflows/ci.yml` |
| Publicação npm `@open-slide/core` e `@open-slide/cli` | `package.json` release script, changesets | high | — | — |
| Guard de mutações HTTP no dev server | `packages/core/src/http/request-guard.ts` | high | — | Não substitui auth multi-user |

## Assumptions (needs human review)

- O produto **não** oferece contas de usuário nem hospedagem de decks na nuvem; cada workspace é local ou estático publicado pelo autor.
- `@open-slide/core` permanece em React 18 até decisão explícita de upgrade (revert recente de React 19 documentado no histórico git).
- Meridian delivery vive em `.meridian/meridian.db` na **raiz do harness**; código do produto só em `open-slide/`.

## Promotion checklist

- [ ] Product behavior → `docs/00_scope.md`
- [ ] Users / roles → `docs/03_user_types.md`
- [ ] System structure → `docs/05_architecture.md`
- [ ] Data model → `docs/06_database.md`
- [ ] APIs → `docs/07_api_contracts.md`
- [ ] Epics → SQLite após `05` approved

## Open questions

- Qual versão semver Meridian deve tratar como “v1 forward” vs baseline já publicada no npm?
- Há plano de SaaS hospedado ou o modelo permanece OSS + self-host estático?
