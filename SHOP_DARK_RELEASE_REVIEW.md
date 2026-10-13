# Home + Shop Dark — revisão para commit

Data: 13/10/2026. Sem commit, push, staging ou publicação.

## Páginas de revisão

- Home integrada: http://127.0.0.1:4175/home-dark.html
- Shop consolidado: http://127.0.0.1:4175/shop-dark.html

A base visual da Home é `homepage.html`, já aprovada no commit `f597be7`. `home-dark.html` é idêntica, exceto pelos seis links para o Shop. O Shop usa o banner B existente e a galeria validada, com Ritual como modo inicial.

`homepage.html`, `index.html` e o comportamento de `/` não foram substituídos. O Shop original continua com os seis produtos e a ampliação Original. Para tornar a dupla Dark a entrada principal, será necessária uma decisão posterior; nenhuma mudança de entrada foi feita nesta rodada.

## Expansão real do catálogo

Fonte pública: [laurinhya / vendedor 49274415](https://www.vinted.de/member/49274415), com 48 anúncios observados. Todos os seis novos anúncios confirmaram o mesmo vendedor em suas páginas individuais. Não havia outro acessório entre os anúncios públicos, além dos óculos já cadastrados.

| Anúncio (nome original) | Preço sem taxa Vinted | Categoria / tamanho | Fotos |
| --- | --- | --- | ---: |
| [Steelfest 2023 Hoodie Ladies Fit – Black Metal Festival Merch – Size S](https://www.vinted.de/items/10315956053-steelfest-2023-hoodie-ladies-fit-black-metal-festival-merch-size-s) | €20,00 | Garment / Ladies fit / S | 4 |
| [Asmoday - German Black Metal - Ladies Fit - Gr. S](https://www.vinted.de/items/10305779792-asmoday-german-black-metal-ladies-fit-gr-s) | €4,00 | Garment / Ladies fit / S | 5 |
| [Cult of Fire - Czech Black Metal - Ladies Fit - Gr. S](https://www.vinted.de/items/10304312065-cult-of-fire-czech-black-metal-ladies-fit-gr-s) | €10,00 | Garment / Ladies fit / S | 2 |
| [Vananidr - Damnation (Olive/Black Splatter LP)](https://www.vinted.de/items/9565241519-vananidr-damnation-oliveblack-splatter-lp) | €20,00 | Record / Olive & black splatter LP | 4 |
| [Malum – Legion LP | Black Metal Vinyl](https://www.vinted.de/items/9565030754-malum-legion-lp-black-metal-vinyl) | €18,00 | Record / Black vinyl LP | 3 |
| [Scitalis – Awakening LP White Vinyl Black Metal Vendetta Records NEW](https://www.vinted.de/items/9564734810-scitalis-awakening-lp-white-vinyl-black-metal-vendetta-records-new) | €15,00 | Record / White vinyl LP | 4 |

- 6 produtos novos: 3 Garments e 3 Records.
- 22 fotografias novas: 6 principais e 16 secundárias, na ordem dos carrosséis públicos.
- Catálogo completo: 12 produtos e 54 fotografias — 6 Garments, 5 Records e 1 Accessories.
- 22 miniaturas WebP novas, 144 × 192 px, total de 100.424 bytes. O mapa passa a conter 54 miniaturas; nenhuma foto foi inventada ou duplicada para preencher uma galeria.
- Fotos ampliadas continuam usando os arquivos completos disponibilizados pelo carrossel público, 600 × 800 px nos novos anúncios. Não se trata de miniaturas ampliadas nem de uma afirmação sobre o tamanho do upload original do vendedor.
- Os nomes completos dos anúncios foram preservados; os títulos mais longos quebram naturalmente, sem truncamento.
- Os seis produtos existentes mantêm dados e fotos. A seleção de quatro Recent Pieces da Home continua pelos IDs anteriores.

## Correções realizadas

1. Contador All calculado a partir do catálogo ativo, em vez do valor fixo 06.
2. Escopo do Shop original preservado em `assets/shop.js`: seis entradas iniciais; as páginas Dark utilizam o catálogo compartilhado completo.
3. Home de revisão aponta SHOP, SHOP PIECES, VIEW ALL PIECES, Collections e fallback para `shop-dark.html`; Home/Archive/About do Shop retornam a `home-dark.html` e suas âncoras.
4. Menu do Shop em até 360 px alinhado ao tamanho 10 px / tracking 1 px da Home aprovada. Regra isolada em `assets/shop-dark-integration.css`.
5. Auditoria de dependências aceita páginas explícitas e reconhece caminhos dinâmicos do mapa de miniaturas.
6. Estudos antigos e assets tipográficos experimentais sem uso ficaram ignorados no Git, preservados no disco.
7. Removida uma linha vazia excedente no final de `assets/products.js`, apontada por `git diff --check`.

Nenhuma alteração estética nos cards, banner, filtros, fotografia, logo, desgaste, tipografia principal ou bloco inferior.

## Validação

Playwright:
- 1440 × 900 e 1920 × 1080: 3 colunas, 4 fileiras.
- 390 × 844 e 320 × 844 com emulação mobile/touch: 2 colunas, 6 fileiras.
- Rolagem de todo o catálogo, fotografias 4:5 com `object-fit: contain`, sem overflow horizontal.
- Filtros: Garments 6, Records 5, Accessories 1, All 12; contador e estado ativo corretos.
- Seis galerias novas: imagens, miniaturas, contador, setas do teclado e botões, Original, Strong, Ritual, links, Escape e retorno de foco.
- Todas as 22 fotos novas inspecionadas a 1440 px. Nas demais resoluções: primeira, segunda e última de cada produto.
- Original sem filtro, vinheta ou textura; alternância preserva a foto selecionada.
- Links internos HTTP 200 e âncoras válidas. Links de produtos iguais às URLs verificadas dos anúncios.
- Home sem overflow nas quatro larguras, mantendo somente quatro Recent Pieces.
- Verificação pontual do Shop original após a mudança compartilhada: 6 produtos, 2 Records, contador 06 e ampliação sem filtro.
- Nenhum erro JavaScript ou resposta HTTP com erro durante os testes das páginas Dark.
- 141 dependências locais declaradas, nenhuma ausente e nenhuma ignorada.
- Sintaxe JS conferida e `git diff --check` sem erros.

Desempenho: fotografias do catálogo mantêm `loading="lazy"`; miniaturas locais usam observação de visibilidade. Em contexto mobile sem cache, a abertura da página requisitou 10 capas por causa da margem de pré-carregamento do navegador, sem baixar as 54 fotos. Ao abrir a primeira galeria nova, somente a foto secundária vizinha foi antecipada em resolução completa. A lógica aprovada de carregamento da galeria não foi modificada.

Não há problema funcional pendente identificado. As fotos permanecem hospedadas no Vinted, como no catálogo anterior, e dependem da disponibilidade pública dos anúncios.

## Arquivos propostos para o commit

Modificados:
- `.gitignore`
- `README.md`
- `assets/products.js`
- `assets/shop.js`
- `tools/audit-site-files.mjs`

Novos (incluindo o trabalho das rodadas anteriores ainda sem commit):
- `home-dark.html`
- `shop-dark.html`
- `assets/shop-dark.css`
- `assets/shop-dark-integration.css`
- `assets/product-gallery.js`
- `assets/product-gallery.css`
- `assets/product-gallery-polished.css`
- `assets/product-thumbnails.js`
- 54 WebP listados pelo mapa em `assets/product-thumbnails/`
- `tools/prepare-gallery-thumbnails.js`
- `tools/validate-shop-dark.js`
- `SHOP_DARK_RELEASE_REVIEW.md`

Não incluir: screenshots e relatórios em `.playwright-mcp/`, variantes Shop A/B/galeria anteriores, relatórios históricos, fontes/CSS tipográficos experimentais e ferramentas antigas de validação. Nenhum desses arquivos foi apagado. Os arquivos da Home aprovada já rastreados permanecem no histórico e são reutilizados.

Sugestão:
`feat: consolidate dark homepage and shop with expanded product galleries`

## Capturas

Página completa:
- `.playwright-mcp/shop-expanded-1440-full.png`
- `.playwright-mcp/shop-expanded-1920-full.png`
- `.playwright-mcp/shop-expanded-390-full.png`
- `.playwright-mcp/shop-expanded-320-full.png`

Galeria Steelfest com foto secundária:
- `.playwright-mcp/shop-expanded-gallery-1440.png`
- `.playwright-mcp/shop-expanded-gallery-1920.png`
- `.playwright-mcp/shop-expanded-gallery-390.png`
- `.playwright-mcp/shop-expanded-gallery-320.png`

Prancha sem filtros: `.playwright-mcp/catalog-expanded-new-photos.png`.
Resultados da matriz: `.playwright-mcp/catalog-expanded-validation.json`.
Dependências: `.playwright-mcp/catalog-dependency-audit.json`.

## Repetir a conferência

Servidor local: `$env:PORT='4175'; node dev-server.mjs` (PowerShell).
Auditoria: `node tools/audit-site-files.mjs home-dark.html shop-dark.html index.html`.
Playwright MCP: abrir `shop-dark.html` no viewport desejado e executar `tools/validate-shop-dark.js` com `browser_run_code_unsafe(filename)`.
A ferramenta não altera catálogo ou arquivos; gera capturas locais.
