---
title: Principles
status: approved
version: 1.0
updated: 2026-07-21
depends_on: [00_scope.md, 01_tech_stack.md]
blocks: [05_architecture.md]
---

# 04 — Principles

> Convenções do monorepo npm + regras React/performance para **framework** (`open-slide/packages/*`, `open-slide/apps/web`).  
> UI, shadcn e motion: **`09_design_system.md`**. Slides TSX: **`open-slide/packages/core/.agent/`** — protocolo **`SLIDE-KIT.md`**. Framework: **`docs/`** na raiz do repositório.

## Product principles

1. **Agent-native:** Inspector + comentários no código; slides via skills publicadas, não GUI opaca.
2. **Source is TSX:** Decks são React; export é projeção do source.
3. **Fixed canvas:** 1920×1080 (ou `meta.format`); scale é do runtime.
4. **Static-first deploy:** Build estático sem Node em produção.
5. **Small core bundle:** Toda dep em `@open-slide/core` é custo para usuários npm.

## Engineering principles

| Principle | Rule | Evidence |
| --------- | ---- | -------- |
| Single responsibility | Rotas Vite por domínio em `vite/routes/` | `api-plugin.ts` |
| Layering | `editing/*` ← routes ← React UI | imports |
| No comments by default | Só WHY não óbvio | `AGENTS.md` |
| Biome before commit | `pnpm check` | CI |
| Changesets | `packages/core`, `packages/cli` | `.changeset/` |
| shadcn ui | Regenerar `components/ui`; compor ao lado | `09_design_system.md` |
| Tests | Vitest + Playwright | `10_test_strategy.md` |

## React performance (framework code)

Prioridade ao implementar ou refatorar UI/dados:

### Critical

- **Sem waterfalls:** `Promise.all` para trabalho independente; não `await` sequencial desnecessário.
- **Bundle:** import direto — evitar barrel files pesados (`lucide-react`, etc.); paths analisáveis para Vite/Next.
- **Defer:** não carregar lib pesada no path crítico se feature é opcional.

### High (apps/web / SSR)

- Não compartilhar estado mutável de request em module scope.
- Paralelizar fetches independentes em rotas/layouts.
- Serializar só campos que o client usa (RSC boundaries).

### Medium (runtime React)

- Derivar estado no render — não `useEffect` para espelhar props.
- Não definir componentes dentro de componentes (remount).
- Eventos de usuário no handler, não “estado + effect”.
- `useMemo`/`memo` só onde render caro — não em expressão trivial.
- Listas longas: considerar `content-visibility` (ver US específica).

Violations should be caught in review against this section before merge.

## React composition

Ver **`09_design_system.md` § React composition** — compound components, providers, sem boolean props.

## Instruction surfaces (where to read)

| Task | Read |
| ---- | ---- |
| Shell UI, forms, shadcn | `docs/09_design_system.md` |
| Motion / gestures | `docs/09_design_system.md` § Motion |
| React perf | This doc § React performance |
| Slide pages / demo decks | `open-slide/packages/core/.agent/skills/slide-authoring/` |
| New deck workflow | **`/create-slide`** → `open-slide/packages/core/.agent/workflows/create-slide.md` → skill `create-slide` |
| Slide kit routing | `open-slide/packages/core/.agent/skills/slide-routing/` |
| Backlog / US | Meridian `docs/`, `.agent/` |

**Não** manter cópia paralela de regras em `open-slide/.agents/` — removido; fonte única = phase docs + skills npm de slide.

## Definition of Done (framework changes)

- [ ] `pnpm check`, `pnpm typecheck`, `pnpm test` in `open-slide/`
- [ ] Changeset if `packages/core` or `packages/cli` changed
- [ ] UI/motion aligned with `09` when touching components
- [ ] US `Record` when closing Meridian stories

## Error handling

- Dev APIs: JSON `{ error }` + status (`routes/context.ts`).
- UI: sonner onde aplicável.
- CLI: exit codes via Commander.

## Naming and structure

- Scope `@open-slide/*`
- Slides: `slides/<kebab-id>/index.tsx`
- Dev APIs: prefix `/__`

## Gate

Human review before `approved`.
