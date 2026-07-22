# Fork local-only (sem npm)

Este repositório (**colabcolibri/open-slide-casper**) **não publica** `@open-slide/core` nem `@open-slide/cli` no npm.

| O quê | Neste fork |
| --- | --- |
| `pnpm release` / Changesets | **Não usar** — workflow de release desligado |
| Versão no `package.json` do core/cli | Referência histórica; não é “versão publicada” daqui |
| Consumo do framework | `workspace:*` no monorepo, `pnpm build:core`, `pnpm dev:demo` |
| Novo workspace de slides | `pnpm init:slides` (CLI local, sem `npx`) |
| Publicação oficial open-slide | Continua em [1weiho/open-slide](https://github.com/1weiho/open-slide) — só relevante se você fizer merge upstream |

**Fluxo diário:** editar `open-slide/packages/core` → `pnpm build:core` (ou `pnpm dev:demo`) → `pnpm sync:kit:demo` para agentes.

Não criar arquivos em `.changeset/` neste fork, a menos que você esteja preparando um PR explícito para o upstream.
