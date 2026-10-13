# V2 — detalhes e legibilidade

Somente V2. Sem alterações na V1, imagens, catálogo, filtros, dimensões das fotografias, logo ou fechamento ilustrado desktop. Sem commit ou push.

## Limpeza de conteúdo

- Home: removido o bloco decorativo `A darker world remains.` e seu `star.svg` à direita da personagem.
- About: removidos `Of a darker world` acima da apresentação e `Provisional project introduction =)`.
- Archive: removidos o aviso geral `Editorial preview...` e a nota `Provisional section text...`; legendas técnicas de Collections e Objects passaram a `01 / Collections.` e `01 / Objects.`. Conteúdo editorial mantido.
- Shop: o aviso longo sobre estudo, preços do protótipo e origem técnica das imagens foi substituído por `Current prices and availability: view each listing on Vinted.`.
- As notas do Top 10 continuam identificando-o como demonstrativo. Removê-las atribuiria indevidamente a lista à Laura. Notas de fotografia Original e erros de carregamento foram mantidos por serem úteis ao visitante.

## Cabeçalhos

About e Archive mantêm altura e padding. O SVG existente `assets/corner.svg` aparece em dois cantos com tamanhos/opacidades diferentes; filetes de 1px possuem transparência variável. A iluminação usa os mesmos tons Warm. A camada atmosférica existente ficou menos dominante, de .75 para .4, sem introdução de novas imagens ou símbolos.

## Escala de leitura — mesma família Georgia

| Elemento | Antes desktop / mobile | Agora desktop / mobile |
| --- | --- | --- |
| Descrições dos quatro cards Home | 12 / 11 px | 14 / 13 px |
| Títulos dos cards Home e Recent Pieces | 14 / 12 px | 14 / 14 px |
| Metadados Recent Pieces | 13 / 11 px | 14 / 13 px |
| View all pieces | 11 / 9 px | 13 / 13 px |
| Metadados Shop | 13 / 13 px | 14 / 14 px |
| View on Vinted nos cards | 10 / 10 px | 13 / 13 px |
| Legendas, notas editoriais e créditos Media | 11 / 11 px | 13 / 13 px |
| Introdução Archive | 13 / 13 px | 14 / 14 px |
| Links secundários | 11 / 11 px | 13 / 13 px |
| Back to top | 10 / 10 px | 13 / 13 px |
| Linha de rodapé compartilhado | 9 / 9 px | 13 / 13 px |
| Aviso de preços/disponibilidade Shop | 10 / 9 px | 13 / 13 px |
| Descrição do bloco inferior Shop | 12 / 12 px | 14 / 14 px |
| Nota e contador da galeria de produtos | 12 / 12 px | 13 / 13 px |
| Link externo da galeria de produtos | 11 / 11 px | 13 / 13 px |
| Modo / intensidade dentro da galeria | 10–11 / 10–11 px | 13 / 13 px |
| Contagem de fotos Photography | 11 / 10 px | 13 / 13 px |
| Fonte e legenda na galeria Photography | 11–12 / 11–12 px | 13 / 13 px |

Textos que já estavam maiores (apresentação About, textos editoriais, títulos, preços desktop) foram preservados. Kicker, números e ornamentos pequenos continuam em sua escala decorativa. Entrelinhas dos textos auxiliares ficam entre 1.5 e 1.75; tracking excessivo foi reduzido nos links, no rodapé e nos metadados. No mobile a quebra manual de desktop do texto inferior Shop fica oculta, evitando uma linha isolada com `carry`.

## Arquivos

- `v2/index.html`, `v2/about.html`, `v2/archive.html`, `v2/shop.html`: remoções e detalhes de cabeçalho.
- `v2/css/warm-gothic.css`: tipografia V2 e decoração restrita a About/Archive.
- `v2/tools/build-recovered.mjs`: preservação dessa limpeza em futuras reconstruções; não foi executada reconstrução de páginas nesta rodada.
- Este relatório.

## Validação e capturas

Playwright: Home, About, Archive, Shop, Photography e Records em 1440×900, 390×844 e 320px. Sem overflow horizontal ou erros JavaScript observados. Galerias de produto e Photography abertas em todas as larguras, textos de 13px verificados e fechamento com Escape funcionando. Auditoria V2 sem dependências ausentes e sem alterações rastreadas na V1. `git diff --check` e sintaxe do script de reconstrução sem erros.

Comparação local: `.playwright-mcp/v2-polish-comparison.html`. Capturas lado a lado desktop/mobile: `v2-polish-compare-{index|about|archive|shop|shop-footer}.png`, todas em `.playwright-mcp/`. Os arquivos individuais seguem `v2-polish-{página}-{before|after}-{1440|390}.png`.

O antes desktop do About foi recapturado com o texto e estilos anteriores restaurados apenas no navegador, aguardando o retrato carregar; a primeira captura havia mostrado a imagem ainda vazia. Os arquivos do site mantiveram a versão refinada durante essa captura.
