# Meridian workspace

Raiz do **Meridian Harness** neste repositório. O kit canônico fica em [`.agent/`](.agent/MERIDIAN.md); produtos vivem em subpastas declaradas em [`.meridian/projects.json`](.meridian/projects.json).

## Produtos

| Pasta | Descrição |
| ----- | --------- |
| [`open-slide/`](open-slide/README.md) | Framework `@open-slide/core` e `@open-slide/cli` (monorepo pnpm/turbo) |

## Comandos Meridian

Phase docs e delivery ficam na **raiz do harness** (`docs/`, `.meridian/`), não dentro de `open-slide/`.

Após clone (ou upgrade do kit em `.agent/`), regenere adapters locais — **não versionados** no Git:

```bash
./.agent/scripts/sync_cursor_kit.sh
```

Isso cria `.cursor/`, `.claude/`, `.codex/`, `.agents/skills/` e o symlink `AGENTS.md` apontando para `.agent/`. Cursor/Claude/Codex usam essas pastas; a fonte canônica continua em `.agent/`.

```bash
python3 .agent/scripts/validate_meridian.py .
python3 .agent/scripts/meridian_db_export.py --project open-slide --format planning
```

Documentação do produto: [docs/README.md](docs/README.md).

Instalação e fluxo: [`.agent/references/start-here.md`](.agent/references/start-here.md).

## Desenvolvimento open-slide

```bash
cd open-slide
pnpm install
pnpm dev
```

Ou, a partir da raiz: `pnpm -C open-slide dev` (se existir o wrapper na raiz).
