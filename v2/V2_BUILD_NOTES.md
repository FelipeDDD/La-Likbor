# La Likbør — V2 Warm Gothic recuperada

## Referência correta

Design recuperado da tag `design-reference-v1`, commit `1c94356` (Initial website prototype).

- Home: `homepage-logo-3.html`, com `assets/homepage-tests.css` e `assets/styles.css`.
- Shop: `index.html`, com `assets/styles.css` e os SVGs `corner.svg`, `scratches.svg`, `grain.svg`, `star.svg` e `atmosphere.svg`.
- A variante `homepage-refined.html` dessa mesma tag já inicia a mudança para preto. Foi descartada como referência principal Warm.
- `homepage.html` não existe nessa tag; sua versão atual incorpora a evolução Dark posterior.
- O histórico não contém uma homepage Warm mais desenvolvida. Os estudos preservados confirmam o mesmo protótipo original em `homepage-logo-3.html`.

Os arquivos históricos foram lidos com `git show`. Não houve checkout, reset, stash, alteração de tags ou modificação de arquivos da V1.

## Comparações preservadas

| Versão | Home | Shop |
| --- | --- | --- |
| Original histórico | [Abrir](http://127.0.0.1:4175/v2/reference-original/home.html) | [Abrir](http://127.0.0.1:4175/v2/reference-original/shop.html) |
| V2 anterior, derivada da Dark | [Abrir](http://127.0.0.1:4175/v2/studies/recolored/index.html) | [Abrir](http://127.0.0.1:4175/v2/studies/recolored/shop.html) |
| V2 recuperada | [Abrir](http://127.0.0.1:4175/v2/index.html) | [Abrir](http://127.0.0.1:4175/v2/shop.html) |

A V2 anterior foi preservada antes da reconstrução, incluindo suas seis páginas, CSS, adaptador e notas. Ajustaram-se somente caminhos relativos para funcionar na nova pasta.

A referência histórica mantém fotografia e logo daquela época e seus seis produtos, para comparação fiel. Seu catálogo histórico e script estão isolados em `reference-original/`; não são usados pela V2 atual. Os assets gráficos e fotografias existentes são referenciados, sem cópia ou edição.

## O que foi recuperado

`css/original-shell.css` e `css/original-home.css` vieram diretamente dos estilos históricos. Adaptaram-se caminhos de assets; os presets fotográficos históricos embutidos foram substituídos pela configuração compartilhada atual.

- Shell com 1320px máximos, margens originais e riscos SVG nas extremidades.
- Cabeçalho com navegação à esquerda, wordmark central e pequeno detalhe editorial à direita.
- Home com hero de aproximadamente 650px, coluna esquerda de logo/texto e uma fotografia à direita. Não utiliza a composição Dark de duas camadas, overlays contínuos ou sua pilha de máscaras.
- Os quatro cards voltaram à composição tipográfica original: número romano, título, descrição e fundo marrom/preto com cantos ornamentados. Os placeholders fotográficos da V2 anterior foram removidos desses cards. Seus destinos continuam funcionais.
- Shop com banner compacto gráfico do protótipo, incluindo o SVG atmosférico original, espaço negativo e título SHOP à esquerda. A fotografia de Laura do banner Dark foi retirada dessa V2.
- Cards do Shop com molduras bronze, variações originais de gradiente, cantos e separação entre foto e dados. Área fotográfica quadrada do protótipo, com `contain`, sem cortar os produtos.
- Botões, divisores, gradientes e hierarquia serifada Georgia recuperados. Alguns textos pequenos recebem aumento seletivo para preservar legibilidade.
- Recent Pieces foi integrado ao vocabulário bronze do protótipo, pois não existia na versão histórica. Mantém quatro peças reais, imagens inteiras em 4:5 e acesso à galeria completa no Shop.

Não foi criado nenhum novo asset ou ornamento. O efeito da V2 não é mais obtido recolorindo os componentes Dark.

## Funcionalidades atuais reutilizadas

Os dados e a lógica atuais continuam referenciados na V1, sem alterações:

- `assets/products.js`: 12 produtos e 54 fotografias reais.
- `assets/product-thumbnails.js`, `assets/shop.js`, `assets/product-gallery.js`: catálogo, categorias, galerias, miniaturas, setas, foco, Escape e Vinted.
- Recent Pieces e seu adaptador de tratamento compartilhado.
- `assets/photography-content.js`, `assets/photography.js`: 53 fotos pessoais em nove galerias, álbuns, subálbuns, capa Portraits, legendas e fontes.
- `assets/archive-content.js`, `assets/archive.js`: Records demonstrativo e destinos reais de playlist, vídeo e canal.

A classe `shop-dark` permanece no Shop apenas como opt-in funcional do script para os 12 produtos e para o CSS da galeria. Nenhum `shop-dark.css` é importado. A galeria reutiliza suas regras funcionais, com superfície bronze/preto ajustada no CSS V2.

`<base href="../">` resolve assets compartilhados; todos os links internos apontam para `v2/`. `js/context.js` mantém o redirecionamento dos cards Recent Pieces para o produto correto no Shop V2.

Original continua sem filtro, vinheta ou textura. Photography preserva cores originais. Styled utiliza os presets compartilhados, com ajustes somente no contexto Warm:

| Preset | Saturação | Brilho | Sépia |
| --- | ---: | ---: | ---: |
| Soft | .82 | .90 | .10 |
| Strong | .64 | .78 | .22 |
| Ritual | .40 | .74 | .22 |

Nenhum arquivo de imagem, preço, descrição, link externo ou dados pessoais foi modificado.

## Páginas internas e panorama

Archive, Photography, About e Records preservam o conteúdo funcional, mas recebem o shell original e composições inspiradas nele: banners gráficos, painéis bronze com cantos existentes, numeração em itálico e blocos de leitura em Georgia. Archive possui cinco seções; Media mantém os links reais e a miniatura cadastrada. About conserva a fotografia e Elsewhere.

O panorama `assets/v2/la-likbor-v2-footer.webp` (2048 × 682px) permanece intacto e fecha a Home dentro da moldura original. Desktop: imagem panorâmica, texto na esquerda escura e gradiente localizado. Mobile: texto acima, imagem inteira abaixo, preservando a lua e a mulher. O rodapé funcional fica separado, com Back to Top.

## Endereços e capturas finais

| Página | Endereço | Desktop completo | Mobile completo |
| --- | --- | --- | --- |
| Home | [Abrir](http://127.0.0.1:4175/v2/index.html) | [PNG](../.playwright-mcp/v2-recovered-index-desktop-full.png) | [PNG](../.playwright-mcp/v2-recovered-index-mobile-full.png) |
| Shop | [Abrir](http://127.0.0.1:4175/v2/shop.html) | [PNG](../.playwright-mcp/v2-recovered-shop-desktop-full.png) | [PNG](../.playwright-mcp/v2-recovered-shop-mobile-full.png) |
| Archive | [Abrir](http://127.0.0.1:4175/v2/archive.html) | [PNG](../.playwright-mcp/v2-recovered-archive-desktop-full.png) | [PNG](../.playwright-mcp/v2-recovered-archive-mobile-full.png) |
| Photography | [Abrir](http://127.0.0.1:4175/v2/photography.html) | [PNG](../.playwright-mcp/v2-recovered-photography-desktop-full.png) | [PNG](../.playwright-mcp/v2-recovered-photography-mobile-full.png) |
| About | [Abrir](http://127.0.0.1:4175/v2/about.html) | [PNG](../.playwright-mcp/v2-recovered-about-desktop-full.png) | [PNG](../.playwright-mcp/v2-recovered-about-mobile-full.png) |
| Records | [Abrir](http://127.0.0.1:4175/v2/records-ten-remain.html) | [PNG](../.playwright-mcp/v2-recovered-records-ten-remain-desktop-full.png) | [PNG](../.playwright-mcp/v2-recovered-records-ten-remain-mobile-full.png) |

Referências: [Home antiga](../.playwright-mcp/warm-old-home.png), [Shop antigo](../.playwright-mcp/warm-old-shop.png), [V2 anterior / Home](../.playwright-mcp/v2-before-home.png), [V2 anterior / Shop](../.playwright-mcp/v2-before-shop.png).

Comparações lado a lado: [Home, três versões](../.playwright-mcp/warm-recovery-home-comparison.png), [Shop, três versões](../.playwright-mcp/warm-recovery-shop-comparison.png).

Detalhes: [Hero desktop](../.playwright-mcp/v2-recovered-hero-desktop.png), [panorama desktop](../.playwright-mcp/v2-recovered-panorama-desktop.png), [panorama mobile](../.playwright-mcp/v2-recovered-panorama-mobile.png), [galeria de produto desktop](../.playwright-mcp/v2-recovered-product-gallery-1440.png), [mobile](../.playwright-mcp/v2-recovered-product-gallery-390.png).

As capturas ficam na pasta ignorada `.playwright-mcp/`, fora de qualquer staging.

## Validação

Ferramentas em `v2/tools/validate-layout.js` e `validate-galleries.js`, executadas via Playwright MCP. Relatórios temporários na pasta de capturas.

Layout: 30 combinações (seis páginas × 1920/1440/768/390/320px), 38 destinos locais/âncoras, alinhamento do grupo de CTAs, panorama inteiro no mobile, categorias, contagens, navegação, Back to Top e reduced motion. Sem overflow, erros JavaScript ou recursos ausentes.

Na recuperação, corrigiram-se caminhos relativos de `grain.svg` e a referência interna do filtro SVG `worn-ink`; não foi necessário alterar os assets.

Galerias: os 12 produtos e suas 54 fotografias, nove galerias pessoais e suas 53 fotografias passaram. Conferidos ordem/fontes, miniaturas, contadores, teclado, troca de subálbum, Escape, retorno de foco, Styled/Original e intensidades, nas cinco larguras. Recent Pieces abriu a galeria completa correta. Nenhum erro ou requisição com falha.

Auditoria final: 201 dependências locais da versão recuperada, nenhuma ausente; nenhum arquivo rastreado da V1 alterado; tags intactas. `node --check` dos scripts novos e `git diff --check` passaram. A V2 anterior e as referências históricas também carregaram sem recursos locais ausentes.

## Arquivos e reprodução

Alterados apenas os seis HTMLs V2, seu tema, notas e validadores. Novos: `css/original-shell.css`, `css/original-home.css`, `reference-original/`, `studies/recolored/`, `tools/recover-original.mjs` e `tools/build-recovered.mjs`.

Os scripts de recuperação leem arquivos históricos sem modificar o Git e escrevem somente dentro de `v2/`. `recover-original.mjs` preserva a primeira cópia da V2 anterior; não sobrescreve esse estudo. `build-recovered.mjs` recompõe os HTMLs atuais a partir da referência e dessa cópia funcional.

Servidor local, na raiz, em PowerShell:

```powershell
$env:PORT = '4175'
node dev-server.mjs
```

Auditoria local:

```powershell
node v2/tools/audit-v2.mjs
git diff --check
```

## Pendências e segurança

O Top 10 e textos provisórios editoriais continuam identificados como demonstração. A referência Warm antiga era um protótipo; novas páginas e Recent Pieces são extensões funcionais desse vocabulário, não reproduções históricas literais. A escolha entre os cards tipográficos recuperados e futuros cards fotográficos Warm ainda pode ser revisada, sem alterar a Dark.

Imagens de produtos continuam dependendo dos URLs Vinted existentes. Nada foi regenerado ou baixado novamente.

V1 permanece no commit `1536b6e709f86f95aaafe6c8e58be9b237d2c626`, tag `dark-site-v1`; `dark-home-shop-v1` permanece em `777f7135dd3b17f77c375f634efcf3247f7d09b3`. A lista dos 133 arquivos do checkpoint está em [V1_COMMIT_FILES.txt](V1_COMMIT_FILES.txt).

Sem commit, tag, push ou publicação nesta rodada. Entrada principal inalterada.

## Estudo inicial de cinco footers (histórico)

Na Home V2, o seletor “Testar footer” acima do fechamento permite escolher diretamente ou usar as setas anterior/próximo, com navegação circular e teclado:

1. Panorama mar/lua atual: `assets/v2/la-likbor-v2-footer.webp`.
2. `assets/v2/Imagem ChatGPT 13_10_2026, 20_12_45-1.png` — Of a Darker World.
3. `assets/v2/Imagem ChatGPT 13_10_2026, 20_12_46-2.png` — Some Things Stay With Us.
4. `assets/v2/Imagem ChatGPT 13_10_2026, 20_12_49-3.png` — A Darker World.
5. Painel marrom original `.home-about`, com `grain.svg`, `atmosphere.svg`, moldura e `star.svg` existentes.

Os três PNGs novos já contêm títulos, descrições e bordas: são exibidos inteiros, sem recorte, filtro, texto HTML por cima ou moldura duplicada. Seus textos tornam-se menores no mobile por estarem embutidos na imagem; neste teste preservou-se a arte integral. As opções 1 e 5 mantêm o texto HTML aprovado. O panorama atual continua sendo o padrão ao recarregar, sem gravar preferências.

Adicionados `v2/css/footer-study.css`, `v2/js/footer-study.js` e `v2/tools/validate-footer-study.js`; atualizado somente o HTML da Home e seu script de reconstrução para preservar o estudo. Nenhuma outra página ou imagem foi alterada.

Playwright: as cinco opções passaram em 1440, 390 e 320px, incluindo carregamento, proporções, navegação circular, teclado, troca rápida e ausência de overflow/erros. Altura do hero permaneceu igual. Dez capturas: `.playwright-mcp/v2-footer-option-{1–5}-{1440|390}.png`.

## Footers escolhidos e estudo da lua no Shop

- `v2/index.html`: voltou ao panorama `assets/v2/la-likbor-v2-footer.webp`, com texto HTML e sem controles de teste ou script do seletor.
- `v2/photography.html`: fechamento Of a Darker World depois das quatro categorias, usando o PNG `Imagem ChatGPT 13_10_2026, 20_12_45-1.png` inteiro. `v2/css/footer-panels.css` mantém o tratamento aprovado: `saturate(.72) hue-rotate(5deg) brightness(.92)`. As fotografias pessoais continuam sem filtros.
- O seletor anterior foi preservado em `v2/studies/footer/index.html`; seu teste passou a apontar para essa página.
- `v2/shop.html`: `assets/v2/lua-crescente.png` como background à direita do banner. O seletor e setas abaixo comparam Dourado suave (padrão), Gravura fina, Atmosfera discreta e Bronze quente. Os presets usam somente CSS; não afinam literalmente o desenho, mas reduzem seu peso visual com contraste, saturação, opacidade e fades. No mobile o enquadramento traz a lua inteira para dentro do banner e reduz a intensidade.
- Implementação do estudo: `v2/css/shop-moon-study.css` e `v2/js/shop-moon-study.js`. Os tratamentos não interferem nos filtros de fotografias do catálogo.
- `v2/tools/build-recovered.mjs` preserva os fechamentos escolhidos e o estudo do banner em uma reconstrução futura.

Playwright: Home e Photography conferidas em 1440×900 e 390×844; quatro opções do Shop em ambas, mais verificação a 320 px, teclado, navegação circular, filtro Records e Original. Sem overflow ou erros JavaScript observados. Auditoria local sem dependências ausentes nem mudanças na V1.

Capturas em `.playwright-mcp/`: `v2-home-sea-footer-{1440|390}.png`, `v2-photography-footer-{1440|390}.png` e `v2-shop-moon-{soft|ink|mist|warm}-{1440|390}.png`.

## Suavização da base do banner e apresentação compacta

Em `shop-moon-study.css`, a borda inferior mantém seu espaço de 1px, mas é transparente; um gradiente de 1px desenha a linha com intensidade baixa e pontas transparentes. O fundo recebe um fade vertical nos últimos 42% e a imagem um fade progressivo na base. A lua, o texto e a geometria desktop permanecem iguais; os controles experimentais continuam ativos.

Até 700px, o cabeçalho do Shop usa iluminação radial discreta no lugar do PNG lunar; o seletor continua presente e varia sutilmente a tonalidade dessa iluminação. Os fechamentos da Home e Photography também usam texto HTML e fundo iluminado, sem panoramas estáticos. Photography reutiliza literalmente o texto da arte no `figcaption`, exibido apenas no mobile. Os desktops mantêm suas imagens.

Somente V2: CSS do estudo lunar, `footer-panels.css`, HTML de Home/Photography e preservação no script de reconstrução. Playwright conferiu 1440, 390 e 320px sem overflow nem erros JavaScript; em 1440/390 a geometria do banner, dos filtros e da grid coincidiu com a captura anterior. Auditoria sem alterações na V1 nem dependências ausentes.

Comparação: `v2/studies/shop-transition/index.html` (artefato estático de revisão) e `.playwright-mcp/v2-shop-transition-comparison.png`. Capturas individuais: `v2-shop-transition-{before|after}-{1440|390}.png` em `.playwright-mcp/`. Sem commit ou push.

Refinamento seguinte: o fade inferior ficou menos intenso (24% da altura, com alpha máximo .5 no fundo), devolvendo presença ao interior marrom. A superfície do banner e a imagem lunar agora se tornam transparentes nos 32px superiores, revelando o próprio fundo da página para desfazer a divisão horizontal. Textos não recebem máscara. Capturas: `.playwright-mcp/v2-shop-top-blend-{before|after}.png`. Dimensões do banner e quatro seleções verificadas; apresentação mobile limpa mantida.

Integração com as molduras: acima de 700px, o fundo do banner se estende pelo padding lateral de 32px (24px no tablet) e compartilha o contexto de camadas da página. Os riscos já existentes passam à frente da superfície e da lua; não foram duplicados nem aumentados. O grão existente dá continuidade à superfície, com fade lateral na extensão. Textos, arte e dimensões permanecem nas posições anteriores. Capturas: `.playwright-mcp/v2-shop-frame-blend-{desktop|mobile}.png`; seletor e ausência de overflow conferidos em 1440, 980 e 390px.
