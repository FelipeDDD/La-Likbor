# Archive e About Dark — revisão editorial

## Abrir

Servidor desta sessão: `http://127.0.0.1:4175`.

- [Archive](http://127.0.0.1:4175/archive-dark.html)
- [Ten Records That Remain](http://127.0.0.1:4175/records-ten-remain.html)
- [Media](http://127.0.0.1:4175/archive-dark.html#media)
- [About](http://127.0.0.1:4175/about-dark.html)

Para iniciar novamente: `$env:PORT='4175'; node dev-server.mjs`. Site estático, sem build, instalação de dependências ou chamadas a serviços para montar as páginas editoriais.

## Integração e limites

- A base é o commit `777f713`, tag `dark-home-shop-v1`.
- Os quatro destinos do menu são `home-dark.html`, `archive-dark.html`, `shop-dark.html`, `about-dark.html`.
- Enter archive leva ao Archive. Photography, Collections, Favorite Music e Objects levam respectivamente a `#photography`, `#collections`, `#records` e `#objects` na nova página.
- Shop pieces e View all pieces continuam levando ao Shop Dark.
- O rodapé final discreto da Home (“Personal Archive”) foi compartilhado com Shop e as páginas novas. No Shop ele substitui o antigo conjunto wordmark/subtítulo/“Shop prototype”; a nota de disponibilidade abaixo permanece. O bloco visual inferior das duas páginas não mudou.
- Não houve alterações em fotografias, logo, hero, efeitos, cards, Recent Pieces, dados, preços, filtros ou galerias. Apenas links e rodapé final foram integrados nas páginas aprovadas.
- `homepage.html`, `index.html`, versões antigas e a entrada `/` permanecem intactos.
- Sem commit, push ou publicação nesta rodada.

## Composição

Archive usa cinco seções identificadas por IDs estáveis, com índice de links, duas áreas de imagens no início, um destaque para Records, Objects e Media. São áreas editoriais, sem preço, carrinho ou controles comerciais.

Reutiliza Georgia / EB Garamond local, paleta Dark e os riscos laterais do Shop em intensidade menor. O CSS novo é isolado por `.editorial-dark`; nenhum arquivo visual aprovado foi reescrito. Não há novas texturas ou imagens geradas.

About utiliza `assets/placeholders/collections.jpg`, inteira, sem crop, filtros ou modificação do arquivo. Archive reutiliza os quatro placeholders já existentes; seu tratamento CSS leve não altera os arquivos e não é aplicado ao About.

## O que editar / conteúdo provisório

### Records

Editar `assets/archive-content.js`, array `records`. A ordem do array define o ranking. Cada objeto tem `artist`, `title`, `year`, `comment` e `source`. `year: null` omite o ano; fornecer um número apenas após confirmar o lançamento original. Os textos são inseridos com `textContent`, sem interpretar HTML.

Os dez títulos são reais; a seleção, ranking e comentários são demonstrativos e não representam Laura. Há aviso explícito no Archive e no artigo. Foram consultadas páginas das bandas/selos, indicadas em `source` e nos links de cada entrada. Os comentários são originais de demonstração, não transcrições das fontes.

Não há capas adequadas cadastradas para os dez álbuns: a lista usa composição tipográfica, sem capas inventadas, espaços falsos ou thumbnails de produto apresentados como capa oficial. Os anos ficaram omitidos neste estudo. Para finalizar: lista real, ordem, notas pessoais, anos confirmados e capas autorizadas, se desejadas.

### Media

O placeholder foi substituído pelo videoclipe real indicado no Beacons. Editar `media.title`, `media.edition`, `media.description`, `media.credits`, `media.youtubeUrl` e `media.source` no mesmo arquivo. Canal e playlist ficam nos objetos `channel` e `playlist`.

O vídeo usa um link externo e a miniatura oficial, copiada sem edição para `assets/media/illum-adora-profanation-on-command.jpg` (480 × 360, cerca de 10 KB). Não carrega iframe, thumbnail remoto ou player. O título completo do upload é “Illum Adora - Profanation on Command (censored version)”; a versão está indicada separadamente acima do título editorial.

Participação em 2021 conforme declaração da Laura no Beacons. Créditos confirmados: música de Illum Adora; upload de Folter Records. Não foram encontrados créditos verificáveis de direção/produção nem detalhes sobre o papel da Laura; esses campos não foram inventados.

### Archive e About

Textos introdutórios, notas e legendas ficam diretamente no HTML, em seções pequenas e identificadas. As imagens do Archive são os placeholders existentes de Photography, Collections, Favorite Music e Objects; não são apresentadas como novas obras, coleções comprovadas ou capas oficiais.

About contém uma introdução neutra ao projeto, sem biografia inventada. Falta a apresentação pessoal aprovada por Laura e o crédito da foto. Para finalizar o Archive, fornecer seleção definitiva de imagens, legendas, créditos e, quando relevantes, datas, locais e histórias dos objetos.

## Validação

- Playwright: Home, Shop, Archive, About e artigo em 1440 × 900, 390 × 844 e 320 × 844.
- Menu consistente, um destino ativo, links e âncoras locais válidos; navegação por Tab/Enter e skip link.
- Mobile com contexto de toque: navegação Archive → About e índice → Media.
- Zero overflow horizontal, erros de console/JavaScript ou respostas locais 4xx/5xx durante os testes.
- Todas as imagens das páginas editoriais decodificadas antes das capturas finais; dez entradas renderizadas; Media sem iframe ou URL inventada.
- Home continua com quatro Recent Pieces; Shop continua com doze produtos. Lógica de produtos/galerias não foi alterada nem revalidada extensamente.
- Auditoria de dependências: 147 arquivos locais, `missing: []`.
- `node --check` nos dois scripts novos e `git diff --check` passaram.

Teste reproduzível pelo Playwright MCP: carregar `tools/validate-editorial-dark.js` como função de `browser_run_code_unsafe`. Usa servidor em 4175. O teste antigo `tools/validate-shop-dark.js` teve apenas a expectativa do destino Collections atualizada.

## Capturas locais (ignoradas pelo Git)

| Área | Desktop | Mobile |
| --- | --- | --- |
| Archive completo | `.playwright-mcp/archive-dark-desktop.png` | `.playwright-mcp/archive-dark-mobile.png` |
| Top 10 completo | `.playwright-mcp/records-ten-remain-desktop.png` | `.playwright-mcp/records-ten-remain-mobile.png` |
| About completo | `.playwright-mcp/about-dark-desktop.png` | `.playwright-mcp/about-dark-mobile.png` |
| Media | `.playwright-mcp/archive-media-desktop.png` | `.playwright-mcp/archive-media-mobile.png` |

Capturas desktop com viewport 1440 × 900; mobile com viewport 390 × 844 e contexto touch. As capturas completas têm altura variável. Imagens e layout foram inspecionados visualmente.

## Arquivos desta rodada

Criados: `archive-dark.html`, `about-dark.html`, `records-ten-remain.html`, `assets/editorial-dark.css`, `assets/dark-site-shell.css`, `assets/archive-content.js`, `assets/archive.js`, `tools/validate-editorial-dark.js` e este documento.

Modificados: `home-dark.html`, `shop-dark.html`, `tools/validate-shop-dark.js`, `README.md`.

## Refinamento do banner e referências reais — 13/10/2026

Nesta segunda rodada, **Shop e About não foram modificados**. Seus HTMLs e o CSS do Shop mantêm os mesmos hashes SHA-256 registrados antes da edição. As alterações de navegação/rodapé mencionadas acima pertencem à primeira rodada.

### Banner e Home

- Archive: altura de 200 px no desktop, padding `20px 32px 18px`, com o mesmo alinhamento esquerdo de SHOP. Mobile: aproximadamente 184 px, padding `23px 18px`, título 56 px. Diferença inferior a 1 px em 320 px, decorrente da altura natural das linhas; não se fixa uma altura que possa cortar texto.
- Fotografia de fundo: `assets/placeholders/footer-dark.png`, já existente. Mostra somente a região direita da paisagem, com o elemento `img` ampliado proporcionalmente e ancorado à direita, fade horizontal e vertical. Nenhum rosto aparece no banner; essa imagem não se repete nas seções abaixo do Archive. Não houve novo asset de paisagem ou ornamentação.
- Introdução curta; nota sobre os placeholders fica abaixo do índice das cinco categorias. About e artigo usam suas regras anteriores.
- Home: novo `assets/homepage-archive-actions.css`, importado exclusivamente por `home-dark.html`, centraliza `.home-actions`. No desktop o grupo deslocou-se aproximadamente 17,7 px para a direita, coincidindo com o eixo do ornamento. Tamanhos dos dois botões, gap de 15 px, ornamento e estilos são idênticos aos anteriores. No mobile o grupo já estava centralizado; gap de 10 px preservado.

### Fontes verificadas

Consulta ao DOM público de [Beacons](https://beacons.ai/la.likbor), seguida de metadados oEmbed públicos do YouTube em 13/10/2026:

- [Eternal Abyss](https://www.youtube.com/playlist?list=PLGgtmW1suzvgmc_s6J6Zrb9SHENf08dQl): link direto no Beacons; oEmbed confirma título e autor “Laura Likbor”. Aparece num bloco próprio em Records, antes do Top 10 demonstrativo. A ordem não é interpretada como ranking.
- [Illum Adora — Profanation on Command](https://www.youtube.com/watch?v=k-Efz7nG5IA): link direto no Beacons, junto da declaração de participação em 2021. oEmbed e dados públicos da página do vídeo confirmam título, versão censurada, uploader Folter Records e miniatura. A página indica reprodução disponível; nenhuma proteção foi contornada.
- [Canal Laura Likbor](https://www.youtube.com/@la.likbor): confirmado pelo `author_url` da playlist e pelo oEmbed do vídeo `nCyz8iUa9zE`, incorporado na seção “LHP” do Beacons. O endereço relativo `/@la.likbor` da playlist foi confirmado como URL completa pelos metadados desse vídeo. Apenas o link do canal foi integrado; o vídeo “LHP” não foi adicionado como outra participação.

Os três destinos solicitados foram confirmados. Nenhum link permanece pendente.

### Verificação desta rodada

Playwright em 1440 × 900, mobile touch 390 × 844 e 320 × 844: alturas, padding e alinhamento comparados diretamente ao Shop; cinco categorias preservadas; três destinos externos conferidos; foco de teclado; ausência de overflow, erros JavaScript e respostas locais de erro. Archive não faz requisições externas de mídia durante o carregamento.

Na Home, uma comparação com e sem o CSS novo confirmou que só o centro do grupo mudou no desktop; dimensões dos botões, gap e caixa do ornamento permaneceram idênticos em todas as larguras. About foi preservado byte a byte. Auditoria atual: 149 dependências locais, `missing: []`. Scripts e `git diff --check` sem problemas.

### Capturas atualizadas

| Área | Desktop | Mobile |
| --- | --- | --- |
| Archive completo | `.playwright-mcp/archive-references-desktop.png` | `.playwright-mcp/archive-references-mobile.png` |
| Records / playlist | `.playwright-mcp/archive-references-records-desktop.png` | `.playwright-mcp/archive-references-records-mobile.png` |
| Media / videoclipe / canal | `.playwright-mcp/archive-references-media-desktop.png` | `.playwright-mcp/archive-references-media-mobile.png` |
| Home / botões | `.playwright-mcp/home-archive-actions-desktop.png` | `.playwright-mcp/home-archive-actions-mobile.png` |

Arquivos desta segunda rodada: `archive-dark.html`, `home-dark.html`, `assets/editorial-dark.css`, `assets/archive-content.js`, `assets/archive.js`, `assets/homepage-archive-actions.css` (novo), `assets/media/illum-adora-profanation-on-command.jpg` (novo), `tools/validate-editorial-dark.js` e este relatório. Sem commit ou push.

### Correção após revisão

O alinhamento da Home agora usa duas colunas iguais e alinha o intervalo entre os botões ao eixo do ornamento. A centralização anterior usava a largura externa do conjunto, deixando o intervalo deslocado devido às larguras diferentes dos botões. Os botões mantêm suas larguras naturais, inclusive em 320 px, sem quebra de texto ou aumento de altura. Capturas: `.playwright-mcp/home-actions-gap-centered-desktop.png` e `.playwright-mcp/home-actions-gap-centered-mobile.png`.

O link visível “Laura’s reference” foi removido de Media. A fonte Beacons permanece nos dados internos para referência futura; o link do vídeo e o canal continuam disponíveis.
