# Meridian workspace

Raiz do **Meridian Harness** neste repositório. O kit canônico fica em [`.agent/`](.agent/MERIDIAN.md); produtos vivem em subpastas declaradas em [`.meridian/projects.json`](.meridian/projects.json).

## Produtos

| Pasta | Descrição |
| ----- | --------- |
| [`open-slide/`](open-slide/README.md) | Framework `@open-slide/core` e `@open-slide/cli` (monorepo pnpm/turbo) |

## Comandos Meridian

```bash
python3 .agent/scripts/validate_meridian.py open-slide
python3 .agent/scripts/meridian_db_export.py --project open-slide --format planning
```

Instalação e fluxo: [`.agent/references/start-here.md`](.agent/references/start-here.md).

## Desenvolvimento open-slide

```bash
cd open-slide
pnpm install
pnpm dev
```

Ou, a partir da raiz: `pnpm -C open-slide dev` (se existir o wrapper na raiz).
