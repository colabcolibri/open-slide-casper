# Pattern library

Skeletons TSX para páginas de deck (`layouts/`) e receitas de motion (`motion/`). Leia o **[kit README](../../README.md)** para o fluxo completo (`/create-slide`, sync, famílias de referência).

| Doc | Uso |
| --- | --- |
| [INDEX.md](./INDEX.md) | Escolher `id` no scoping e no Step 6 do create-slide |
| [SCHEMA.md](./SCHEMA.md) | Frontmatter `kit-doc: pattern` ao criar ou editar entradas |
| [FORMAT-GUIDANCE.md](./FORMAT-GUIDANCE.md) | `slide` (16∶9) vs `4x5` por padrão |
| [_entry-template.md](./_entry-template.md) | Nova entrada no catálogo |

Validação: `pnpm exec vitest run packages/core/src/app/lib/pattern-library-index.test.ts` (na raiz do monorepo `open-slide/`).
