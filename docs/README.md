# open-slide — phase docs

open-slide é um **framework agent-native** para decks React em canvas 1920×1080: runtime no browser, plugin Vite, CLI de scaffold e pacotes publicados no npm.

Estas phase docs ficam na **raiz do harness Meridian** (`docs/`). O código do produto fica em [`open-slide/`](../open-slide/README.md).

| Referência | Path |
| ---------- | ---- |
| Harness / Meridian | [README.md](../README.md) na raiz do repo |
| Framework (npm monorepo) | [open-slide/README.md](../open-slide/README.md), [AGENTS.md](../open-slide/AGENTS.md) |

## Phase documents

| Doc | Status | Description |
| --- | ------ | ----------- |
| [00_scope.md](00_scope.md) | approved | Escopo, usuários, estado atual (Mode B) |
| [01_tech_stack.md](01_tech_stack.md) | approved | Stack pnpm/Turbo, React, Vite, CI |
| [02_security.md](02_security.md) | approved | Dev server, supply chain, privacidade |
| [03_user_types.md](03_user_types.md) | approved | Autores, apresentadores, visitantes |
| [04_principles.md](04_principles.md) | approved | Camadas, DoD, convenções do repo |
| [05_architecture.md](05_architecture.md) | approved | **Gate** para epics/US — estrutura do monorepo |
| [06_database.md](06_database.md) | approved | Persistência em filesystem + SQLite Meridian |
| [07_api_contracts.md](07_api_contracts.md) | approved | Endpoints `__*` do dev server e exports npm |
| [08_environments.md](08_environments.md) | approved | Local, CI, release npm, deploy estático |
| [09_design_system.md](09_design_system.md) | approved | Tokens, shadcn, canvas, inspector UI |
| [10_test_strategy.md](10_test_strategy.md) | approved | Vitest + Playwright |
| [11_decisions.md](11_decisions.md) | approved | Regras do log; entradas em SQLite |
| [12_marketing_seo.md](12_marketing_seo.md) | approved | Site `apps/web`, open-slide.dev |

Inventário transitório Mode B: [inventory/as-is.md](inventory/as-is.md).

Descoberta PO (governança docs): [discovery/product-brief.md](discovery/product-brief.md).

Arquitetura de instruções: [architecture/instruction-surfaces.md](architecture/instruction-surfaces.md).

## Delivery artifacts

| Artifact | Location | Role |
| -------- | -------- | ---- |
| Epics, versions, sprints, user stories | `.meridian/meridian.db` | Delivery canônico (gitignored) |
| Connector config | `.meridian/delivery.json` | SQLite profile |
| Decision log entries | `meridian.db` → `decisions` | `prepend-decision` only |
| Kit templates | `.agent/references/templates/` | Contratos de agente — não copiar para `docs/templates/` |

## How to work

0. Trilha de aprovação dos docs: `/audit-docs` → passes (`/security-pass`, `/architecture`, …) → **você** marca `approved` na ordem abaixo.
1. Aprovar phase docs na ordem: `00` → `01` → `02` → `03` → `04` → **`05`** → detalhes.
2. UI: `/design-pass bootstrap` em `09` após `01` draft.
3. Testes: `/test-pass bootstrap` em `10` após `01`/`08`.
4. Após **`05_architecture` approved**: `/create-epic`, `/create-version`, `/plan-sprint`, `/create-us`.
5. Por US: `/refine-us` → `/implement-us` → `/complete-us`.
6. Validar (raiz do harness):

```bash
python3 .agent/scripts/validate_meridian.py .
```

## Meridian kit

| Resource | Path |
| -------- | ---- |
| Protocol | `.agent/MERIDIAN.md` |
| Projects manifest | `.meridian/projects.json` |
| Agents help | `.agent/references/agents-help.md` |
