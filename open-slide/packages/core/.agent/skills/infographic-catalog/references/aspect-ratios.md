# Formatos de canvas (proporção e resolução)

Lista fechada para **`/generate-infographic`** scoping. Índice machine-readable: **`aspect-ratios.json`**.

## Proporção (`aspectRatio`) — 14 opções

Use **exatamente** o valor `id` na coluna **Ratio** (ex.: `4:5`, não “4x5”).

| Ratio | Rótulo | Quando usar |
| --- | --- | --- |
| `1:1` | Quadrado | Ícones e capas |
| `9:16` | Stories | Reels, TikTok, celular |
| `4:5` | Feed retrato | Instagram e Facebook (**default sugerido** se o usuário não escolher) |
| `2:3` | Foto retrato | Proporção clássica |
| `3:4` | Retrato alto | Documentos verticais |
| `1:4` | Vertical longo | Rolagem infográfica |
| `1:8` | Vertical extra | Conteúdo extenso |
| `16:9` | Apresentação | Slides e YouTube |
| `21:9` | Ultrawide | Cinema e hero |
| `3:2` | Foto paisagem | Proporção clássica |
| `4:3` | Slide 4:3 | Projetor tradicional |
| `5:4` | Monitor | Tela desktop |
| `4:1` | Banner | Faixa horizontal |
| `8:1` | Faixa larga | Header web |

**Thumbnails do catálogo** (`previews/`) são sempre **`1:1`** — só referência visual de layout/estilo, não o formato do infográfico final.

## Resolução de saída (`outputSize`) — 4 opções

Opcional no scoping se o produto expuser resolução; default **`1K`**.

| id | Rótulo | Nota |
| --- | --- | --- |
| `512` | Rascunho | Prévia rápida |
| `1K` | Padrão | Uso geral |
| `2K` | Alta | Mais detalhe |
| `4K` | Máxima | Export grande |

Nem todo backend de imagem aceita todos os tamanhos — validar na integração do produto.

## Atalhos legados (não substituem a tabela)

| Alias | Ratio |
| --- | --- |
| Story | `9:16` |
| Post | `4:5` |
| Slide | `16:9` |
| Wide | `21:9` |
