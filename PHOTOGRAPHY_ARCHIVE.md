# Photography / Archive — seleção real do Instagram

Revisão local: <http://127.0.0.1:4175/photography-dark.html>. O Archive permanece como índice de capas em <http://127.0.0.1:4175/archive-dark.html>.

Atualização: `assets/archive/photography/portraits/Retrato gótico.png` foi adicionado como primeira foto e capa de Portraits, sem alteração do PNG. Foi criada somente uma miniatura JPEG proporcional de 458 × 480 px em `portraits/thumbnails/retrato-gotico.jpg`. Agora são **53 imagens**, sendo nove em Portraits. O arquivo fornecido usa `source: 'provided-file'`, sem atribuir link de Instagram, legenda, data ou localização inexistentes; os 52 registros anteriores permanecem intactos.

## Resultado da recuperação

Os 18 posts indicados estavam acessíveis publicamente sem login. Foram baixadas **52 fotografias**, exatamente nos índices solicitados e na ordem fornecida. Nenhum link ou download falhou; não há fotografias pendentes desta seleção.

As URLs foram obtidas dos dados que o Instagram já entrega no HTML público de cada post, associando o código exato da publicação e o índice do carrossel. Não foram utilizados endpoints privados, login, proxies ou contorno de bloqueios. Foram conservados os bytes das maiores versões de imagem fornecidas nesses dados — versões servidas pelo Instagram, não os arquivos originais de câmera.

As 52 miniaturas têm no máximo 480 px no lado maior, JPEG qualidade 84%, com redimensionamento proporcional, sem recorte ou tratamento de cor. As fotografias maiores não foram recomprimidas, editadas ou filtradas. Os arquivos estão locais, portanto não dependem das URLs temporárias do CDN.

| Categoria / galeria | Post | Índices originais selecionados | Fotos |
| --- | --- | --- | ---: |
| Places / 2025 — Between places | `DS7-vvTCCct` | 2, 4, 6, 7, 8, 9, 14, 18, 20 | 9 |
| Places / Mount Ijen | `DBE3G3lt79k` | 1, 2, 4, 6 | 4 |
| Places / London & Stonehenge | `DCpWxuuIOHJ` | 1, 2, 3, 6 | 4 |
| Places / Schrecksee | `C_Yh0BvNZdZ` | 1, 2, 3, 4 | 4 |
| Music / Night I | `CtrxmWltRoH` | 1, 2, 4, 6, 9, 10 | 6 |
| Music / Steelfest — Gathering | `CsjtGxpN2XQ` | 1, 2, 3, 5, 9 | 5 |
| Music / Steelfest — Live photographs | `CsmRZpUtl2x` | 1, 2, 4, 6 | 4 |
| Portraits / galeria única | `DB7CaE7IAMZ`, `Cs1psouNfKn`, `CrqRJ0QShmH`, `Cb0FUKMKNWs`, `CtM0PMCNsM6`, `CxEC4CetFf4` | 1 em cada um dos cinco primeiros; 1, 2, 3 no último | 8 |
| Fragments / galeria única | `C1VF0lvN6bV`, `Cl4QnVlqYMV`, `CIWWQrsAnMj`, `CVDdUS3IhwT`, `CWizEV2oHgN` | 1, 2, 3; 1, 2; 1; 1; 1 | 8 |

Os nomes dos subálbuns são editoriais, baseados nas legendas ou localização verificadas; não são títulos oficiais das publicações. **Night I** é o único nome de subálbum provisório: a publicação não identifica claramente o evento. “2025” no primeiro post é uma retrospectiva anual, não uma localização geográfica. Os dois últimos posts de Fragments são de **@evoke.shop**, mantendo sua atribuição correta. Datas armazenadas referem-se à publicação, sem presumir quando uma viagem ou evento aconteceu. Nenhuma data ou localização foi acrescentada às fotos por inferência.

## Estrutura e edição

- `assets/photography-content.js`: única configuração editável de categorias, subálbuns, fotos e procedência. `posts` conserva as legendas reais; `albums` determina a ordem das galerias e das fotografias.
- `assets/archive/photography/<categoria>/<código-do-post>/<índice>.<extensão>`: fotografia completa fornecida pelo Instagram.
- `assets/archive/photography/<categoria>/<código-do-post>/thumbnails/<índice>.jpg`: miniatura proporcional.
- `assets/photography.js` e `assets/photography.css`: apresentação e galeria sem filtros.

Para renomear ou reordenar, edite `title` ou a ordem de `albums` / `photos`. Para remover uma foto da galeria, retire somente sua entrada de `photos`; preserve os arquivos se quiser manter uma comparação. Para inserir uma foto manualmente, copie o arquivo real, prepare uma miniatura proporcional e acrescente os caminhos `src` e `thumbnail`, dimensões, `postCode`, `postIndex` e texto alternativo. Cadastre a fonte real em `posts`; `caption`, `location` e `publishedAt` podem ficar vazios quando não houver dados verificáveis. Nunca reutilize uma imagem para simular outra foto ausente.

## Apresentação e interação

A capa Photography no Archive foi restaurada à composição compacta original, ao lado de Collections. Abre `photography-dark.html`; as categorias e o modal não são mais carregados no Archive. Collections, Records, Objects e Media não foram alterados nesta reorganização.

Na página própria, Places & Travels e Music & Nights são listas expansíveis nativas; ambas começam fechadas. As quatro categorias apresentam uma prévia com a primeira fotografia selecionada, usando as miniaturas existentes. Os títulos dos menus foram ampliados de 23 para 29 px no desktop e de 22 para 26 px no mobile; as prévias usam 76 × 92 px e 64 × 80 px, respectivamente. Portraits e Fragments abrem diretamente suas galerias únicas. O índice superior abre a lista escolhida ou a galeria única correspondente. Um link discreto “← Back to Archive” retorna à capa original. O card Photography da Home aponta diretamente à nova página; os demais destinos da Home foram preservados.

As prévias e imagens ampliadas usam `object-fit: contain`, cores recebidas do Instagram, sem filtros, máscaras ou vinhetas. Os mesmos dados, arquivos, legendas, fontes e lightbox foram reutilizados, sem duplicar o catálogo de fotografias.

O modal segue os padrões de interação da galeria de produtos: setas anteriores/próximas, teclado, miniaturas, indicador, limites consistentes, Escape/Close, cabeçalho sticky, bloqueio da rolagem de fundo e retorno do foco. A faixa mantém a miniatura selecionada visível. Somente a imagem atual e uma vizinha são carregadas em tamanho grande; miniaturas são carregadas conforme entram na faixa. A lógica fica isolada porque a galeria comercial é acoplada aos controles Styled/Original, preços e produtos, que não foram modificados.

Cada foto apresenta o link do post correto com seu `img_index` original. A legenda real fica num disclosure opcional, sem textos inventados. Sem JavaScript há acesso direto ao perfil real do Instagram.

## Extras autorizados

“↑ BACK TO TOP” foi incluído à esquerda do rodapé compartilhado em Home, Archive, Shop, About e artigo Records. Usa âncora nativa e o smooth scroll existente; com `prefers-reduced-motion: reduce`, a rolagem é imediata. Em telas pequenas o texto central fica numa segunda linha para evitar sobreposição.

About recebeu somente uma seção Elsewhere após sua composição existente. Foram usados os links reais do [Beacons de Laura](https://beacons.ai/la.likbor): [Instagram](https://instagram.com/la.likbor), [Facebook](https://www.facebook.com/laura.ciornavei/), [TikTok](https://tiktok.com/@la.likbor), [Bandcamp](https://bandcamp.com/likbor91) e o [canal YouTube já verificado](https://www.youtube.com/@la.likbor). Fotografia, texto e edição pessoal do About foram preservados.

## Validação e capturas

- Playwright: 52/52 fotografias completas carregadas com as dimensões cadastradas; seleção e ordem conferidas para os 18 posts.
- Nove galerias verificadas em 1440 × 900, 390 × 844 e 320 px: setas, teclado, miniaturas, contador, limites, foco, Escape/Close, Close sticky e scroll lock.
- Nenhum erro JavaScript, recurso local ausente ou overflow horizontal. Verificação dos links locais nas cinco páginas Dark e das referências de mídia já existentes.
- Checksums SHA-256 dos 52 arquivos completos conferidos; auditoria inclui os 104 assets novos.
- Capturas finais também feitas em contextos novos de desktop e mobile com touch, e inspecionadas visualmente.

Capturas atuais da organização em `.playwright-mcp/` (fora do Git):

- `archive-restored-desktop.png` / `archive-restored-mobile.png` — Archive restaurado, viewports 1440 × 900 e 390 × 844.
- `archive-restored-desktop-full.png` / `archive-restored-mobile-full.png` — todas as capas e seções do Archive.
- `photography-page-desktop.png` / `photography-page-mobile.png` — página própria Photography.
- `photography-page-desktop-full.png` / `photography-page-mobile-full.png` — página própria completa.

Capturas anteriores da extração, também disponíveis para comparação:

- `photography-archive-desktop.png` — viewport desktop 1440 × 900.
- `photography-archive-mobile.png` — viewport mobile 390 × 844.
- `photography-section-desktop.png` / `photography-section-mobile.png` — Photography inteira.
- `photography-album-desktop.png` / `photography-album-mobile.png` — Mount Ijen aberto.
- `photography-archive-desktop-full.png` / `photography-archive-mobile-full.png` — Archive completo.
- `photography-import-contact-sheet.png` — contato das 52 seleções, identificado por post e índice.
- `photography-elsewhere-desktop.png` / `photography-elsewhere-mobile.png` — seção Elsewhere.

## Arquivos desta rodada

Criados: `assets/photography-content.js`, `assets/photography.js`, `assets/photography.css`, 52 fotos e 52 miniaturas em `assets/archive/photography/`, `tools/validate-photography-dark.js` e este relatório.

Atualizados: `archive-dark.html` (Photography), `about-dark.html` (Elsewhere e rodapé), `assets/dark-site-shell.css`, `home-dark.html`, `shop-dark.html`, `records-ten-remain.html` (âncora e link no rodapé), `tools/audit-site-files.mjs`, `tools/validate-editorial-dark.js` e README.

Home e Shop receberam apenas o extra de rodapé nesta rodada. Hero, catálogo, filtros, galerias comerciais, preços, fotografias e versões anteriores permanecem intactos. Nenhum commit ou push.

Reorganização posterior: criado `photography-dark.html`; atualizados `archive-dark.html`, o link Photography em `home-dark.html`, estilos e navegação em `assets/photography.css` / `assets/photography.js`, os dois validadores editoriais/Photography, README e este relatório. Nenhum asset ou dado fotográfico foi modificado. As 52 imagens e as nove galerias foram verificadas novamente em 1440, 390 e 320 px; a navegação capa → página → galeria e o retorno ao Archive passaram também em contexto mobile com touch. Sem commit ou push.
