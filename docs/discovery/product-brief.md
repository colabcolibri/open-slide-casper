---
title: Product brief
status: ready for scope
updated: 2026-07-21
governance_progress: phase-docs-approved-2026-07-21
---

# Product brief

## Problem

O harness Meridian na raiz do repositório **open-slide** tem phase docs **`00`–`12` approved** (2026-07-21), detalhes em `docs/architecture/`, inventário Mode B approved. O SQLite ainda precisa de **versions/epics/US** forward-looking (há US-0001 draft no board).

**Quem sentia o gap:** mantenedor(s) e agentes — **gate `05` liberado** para `/create-epic`, `/create-version`, `/create-us`.

**Antes:** documentação inicial preenchida a partir do código existente, tudo marcado `draft`, checklist de promoção do inventário inteiro em aberto.

**Depois (objetivo deste trabalho):** cadeia de docs revisada, passes aplicados onde obrigatório, decisões abertas resolvidas ou registradas, humano marca `approved` na ordem Meridian — liberando epics/US forward-looking sem contradizer o produto já publicado no npm.

## Vision / outcome

Phase docs passam a ser **contrato executável** para agentes: escopo e arquitetura aprovados, segurança e testes alinhados ao repo real, backlog SQLite populado só depois do gate `05`. O time deixa de “ter docs escritos” e passa a “ter governança ativa”.

## Users and jobs

| User type | Job to be done | Notes |
| --------- | -------------- | ----- |
| Manager / maintainer (primary) | Decidir TBDs, aprovar docs na ordem, autorizar version v0 “already shipped” | evidence — dono das open questions em `00_scope` |
| Framework contributor | Implementar US com `ready: true` sem ambiguidade de camadas/princípios | blocked até `05` approved |
| Agentes Meridian (Cursor/Codex) | Seguir phase docs + skills sem inventar escopo | assumption — dependem de status `approved` nos gates |
| PO (processo) | Garantir `00`/`03` coerentes antes de backlog | este brief |

## Value

- **Vs status quo (só README + AGENTS):** rastreabilidade decisão→doc→US, validação automatizada, board planning.
- **Vs aprovar tudo de uma vez:** ordem `00→…→05` reduz contradições; `/audit-docs` antes do bloco final de aprovações.

## In scope (candidates) — trabalho de governança Meridian

1. Fechar checklist de promoção em `docs/inventory/as-is.md` (comportamento já refletido ou merge explícito nos phase docs).
2. Executar `/audit-docs` (relatório; opcional `apply` só em `draft`).
3. Aprovar humanamente phase docs na ordem documentada em `docs/README.md`, com workflows de deepen onde o gate pede:
   - `00_scope` → `01_tech_stack` → `02_security` (`/security-pass bootstrap` → `full`; `/privacy-pass` se analytics confirmado no site)
   - `03_user_types` (alinhado a `02`)
   - `04_principles`
   - **`05_architecture`** + `architecture/*.md` (`/architecture`)
   - `06_database`, `07_api_contracts`, `08_environments`
   - `09_design_system` (`/design-pass bootstrap`+)
   - `10_test_strategy` (`/test-pass bootstrap` → `full`, `/test-review`)
   - `11_decisions` (entradas reais via `prepend-decision`, não só stub)
   - `12_marketing_seo` (`/seo-pass full` — hoje vários campos TBD)
4. Registrar decisões materiais com `/update-decisions-log` ao fechar TBDs (semver baseline, LGPD site vs framework, listen address do dev server, version Meridian v0).
5. Após `05` approved: `/create-version`, `/create-epic`, `/plan-sprint`, `/create-us` (produto forward-looking).

## Out of scope (candidates)

- Reescrever o runtime open-slide ou publicar release npm só para “fechar doc”.
- Criar US ou implementar código de produto **antes** de `05_architecture` approved (regra P0 Meridian).
- Substituir `00_scope.md` por este brief — brief é histórico PO; contrato continua sendo `00` após promote/approve.
- Duplicar kit Meridian (`.agent/`) dentro de `docs/` — templates ficam no kit.
- Migrar ou resetar `.meridian/meridian.db` além do uso normal de delivery CLI.

## Constraints

- Aprovação `status: approved` é **somente humana** — agentes não promovem draft→approved.
- Código do produto vive em `open-slide/`; phase docs na **raiz** do harness (`docs/`).
- Validator: `python3 .agent/scripts/validate_meridian.py .` (já passa — não substitui review de conteúdo).
- Inventário `docs/inventory/as-is.md` é transitório (`purpose: transitional`); arquivar ou marcar promoted quando checklist zerar.

## Assumptions

| Assumption | Label |
| ---------- | ----- |
| Conteúdo atual dos phase docs é ~80% correto vs código (Mode B recente) | evidence parcial — inventário + paths citados |
| Não haverá SaaS/multi-user auth no escopo forward | alinhado a `00_scope` out of scope |
| Version Meridian “v0 shipped” será desejável para epics já existentes no npm | `(assumption)` — open question #1 em `00_scope` |
| Analytics do site `apps/web` ainda TBD para LGPD/GDPR | `(assumption)` — bloqueia fechamento pleno de `02` e `12` |

## Epic candidates (names only — produto, após gate 05)

Derivados do inventário; **não criar EPIC files até docs aprovados:**

- EPIC-runtime — viewer, dev server, canvas
- EPIC-present — present mode / presenter view
- EPIC-inspector — comentários + loop agente
- EPIC-organize — pastas e ordenação de decks
- EPIC-export — HTML/PDF/PPTX
- EPIC-design — tokens / slide-tokens WIP
- EPIC-agent — skills npm para consumidores
- EPIC-web — site marketing + docs Fumadocs

## Epic candidates (names only — governança docs, imediato)

- Doc approval wave (sequência 00–12)
- Inventory promotion closure
- Meridian decision log bootstrap
- Architecture detail completion (export pipeline depth — gap #2 em `05`)

## Evidence (existing codebase)

| Artifact | Estado | Evidência |
| -------- | ------ | --------- |
| Phase docs 00–12 | `status: approved` | `docs/README.md` |
| Architecture details | draft | `docs/architecture/vite-dev-api.md`, `instruction-surfaces.md` |
| Inventário Mode B | draft, checklist aberto | `docs/inventory/as-is.md` L52–59 |
| Validação estrutural | pass | `validate_meridian.py .` exit 0 |
| Backlog SQLite | vazio | `meridian_db_export --format planning` → epics/us/sprints [] |
| Produto npm | funcional | linhas em `docs/inventory/as-is.md` Capabilities |
| TBDs explícitos | abertos | `02_security` analytics/compliance; `12_marketing_seo` SEO table; `00_scope` Q1–Q2 |

### Mapa — o que falta por doc para sair de `draft`

Ordem recomendada de **trabalho agente + review humano** (não pular gates de dependência):

| Doc | Situação atual | Falta principal antes de `approved` |
| --- | -------------- | ------------------------------------- |
| `docs/discovery/product-brief.md` | **criado neste /discover** | Manager revisar; opcional promote → `00`/`03` |
| `00_scope` | preenchido Mode B | Resolver Q1 (version v0 Meridian), Q2 (LGPD escopo); human approve |
| `01_tech_stack` | draft | Depth checklist kit; human approve antes security bootstrap |
| `02_security` | draft, TBDs | `/security-pass full`; owners em gaps; LGPD/GDPR N/A ou preenchido |
| `03_user_types` | draft | PO confirma personas; cross-check `02` auth |
| `04_principles` | draft | DoD checklist operacional; layers ↔ `05` |
| `05_architecture` | draft, **gate backlog** | `/architecture`; aprovar detail files; human approve |
| `06_database` | draft | Confirmar FS + SQLite Meridian vs deploy |
| `07_api_contracts` | draft | Spot-check rotas `__*` vs código; planned vs impl |
| `08_environments` | draft | Confirmar CI/local vs `.github/workflows` |
| `09_design_system` | draft | `/design-pass` + checklist design-system |
| `10_test_strategy` | draft | `/test-pass` full + `/test-review` |
| `11_decisions` | draft stub | Primeiras entradas reais no SQLite via CLI |
| `12_marketing_seo` | draft, TBDs | `/seo-pass full`; preencher sitemap/CWV/canonical |
| `inventory/as-is` | draft | Marcar promoted_to / arquivar após merge nos phase docs |

## Open questions

1. **Version Meridian v0:** criar version listando capacidades já shipped no npm, ou só forward desde semver atual? (espelha `00_scope` Q1)
2. **LGPD/GDPR:** escopo só `apps/web` ou também framework em workspaces de terceiros? (espelha Q2)
3. **Dev server bind:** default `0.0.0.0` vs localhost — aceitar risco documentado ou mudar default? (`02_security` gap #1)
4. **Este brief:** promover trechos para `00_scope`/`03_user_types` ou manter brief só como trilha de governança?

## Promotion notes

Quando manager pedir `/discover promote` **e** confirmar:

- Copiar Problem/Vision condensados para `00_scope` apenas se refinarem texto existente (evitar duplicação).
- Tabela Users → revisar `03_user_types` profiles.
- **Não** alterar `status: approved` via promote — promote deixa docs em `draft` até humano aprovar.

Trilha típica pós-brief:

```txt
/audit-docs          → gaps priorizados
/security-pass …     → fechar 02
/architecture        → fechar 05 + details
/design-pass …       → 09
/test-pass …         → 10
/seo-pass …          → 12
[human approve chain 00→12]
/create-version → /create-epic → /plan-sprint
```
