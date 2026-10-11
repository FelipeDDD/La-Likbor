# Homepage Dark — depuração visual do desgaste

Este teste expõe o pipeline atual; não propõe um novo tratamento estético.

- Forte: http://127.0.0.1:4173/homepage-dark-wear-debug-strong.html
- Moderada: http://127.0.0.1:4173/homepage-dark-wear-debug-moderate.html
- Estética atual preservada: http://127.0.0.1:4173/homepage-dark-micro-wear.html

Se necessário, execute `node dev-server.mjs`. O servidor usa a porta 4173 e a raiz continua sendo o Shop.

## Recortes e identificação

| Grupo | IDs | Recortes | Cor de debug | Opacidade forte | Opacidade moderada |
| --- | --- | ---: | --- | ---: | ---: |
| Bordas principais, complementos | B01–B12 | 12 | Vermelho `#f28a8a` | 100% | 85% |
| Invasões para dentro | I01–I03 | 3 | Azul `#76bbf2` | 100% | 85% |
| Detalhes próximos ao logo | L01–L16 | 16 | Cinza claro `#e5e5e5` | 100% | 85% |
| **Total de recortes atuais** | | **31** | | | |

Não foram acrescentados recortes. Os 31 atributos `style`, classes, arquivos de origem, coordenadas do background, ângulos, posições desktop/mobile e dimensões de seleção foram copiados integralmente da versão atual. O JavaScript apenas desenha as anotações e preenche o inventário; não gera nem move artefatos.

A base vertical original permanece independente: uma extração ampla no desktop e duas faixas no mobile, além dos 31 complementos. Essa base não recebe amplificação ou coloração de debug e mantém 76% de opacidade desktop / 70% mobile, assim como suas máscaras anteriores.

Os mesmos dois PNGs fornecem os 31 complementos:

- `assets/bordas/reference-extraction/la_likbor_riscos_esquerda.png`
- `assets/bordas/reference-extraction/la_likbor_riscos_direita.png`

O inventário confirma **zero janelas idênticas** pela chave arquivo + x/y da origem + largura/altura. Os dois arquivos são reutilizados, selecionando trechos diferentes. Não há repetição automática, espelhamento ou geração aleatória. Zero janelas idênticas não significa que nenhum pixel de origem possa aparecer em seleções parcialmente sobrepostas.

## Parâmetros exatos

| Parâmetro | Forte | Moderada |
| --- | --- | --- |
| Escala uniforme de todos os recortes e média por grupo | **1,50×** | **1,20×** |
| Opacidade CSS da textura de cada recorte | **1,00** | **0,85** |
| Amplificação adicional do alpha visível | **8×** | **4×** |
| Blend dos três grupos | **normal** | **normal** |
| Máscara local dos recortes | **nenhuma** | **fade de 1 px em cada extremidade horizontal/vertical, com interseção** |
| Máscaras dos containers complementares | **nenhuma** | **nenhuma** |
| Clipping do perímetro | **`overflow: clip`, preservado** | **`overflow: clip`, preservado** |
| Ordem dos complementos | **z-index 5** | **z-index 5** |

A escala usa `rotate(ângulo original) scale(fator)` com origem no centro da janela. O background e suas coordenadas continuam em 68 × 535 dentro de cada janela; o transform amplia uniformemente o mesmo conteúdo, sem selecionar outra área do PNG. A posição de layout da janela não muda, mas sua área visual cresce em torno do centro.

As 27 janelas de grãos medem originalmente 18 × 28: tornam-se 27 × 42 na forte e 21,6 × 33,6 na moderada, antes da rotação. As quatro janelas de risco curto originalmente medem 9 × 17, 10 × 15, 9 × 21 e 9 × 16. Seus tamanhos ampliados aparecem individualmente na tabela da página.

## Por que amplificar também o alpha

Opacidade CSS em 100% não remove a transparência que já existe nos PNGs. O debug usa filtros SVG inline somente no pseudo-elemento que apresenta cada recorte. A sequência é: luminância para alpha, composição com a transparência da origem, amplificação com `feFuncA slope=8` ou `4` e coloração pelo grupo. Isso expõe os pixels existentes, sem desenhar marcas ou alterar arquivos.

As máscaras locais anteriores de 3/4 px são removidas ou reduzidas para 1 px. As máscaras dos containers complementares são retiradas: o campo focal antes diminuía a intensidade à direita no desktop e entre 160–222 px de altura no mobile. A camada de debug sobe acima do texto/lettering para permitir a inspeção; a mudança de ordem vale apenas para os complementos de depuração.

## Como inspecionar

As caixas coloridas mostram as janelas de seleção ampliadas e rotacionadas. Os IDs são rótulos não rotacionados. O preenchimento da caixa é transparente: os pontos dentro dela são o conteúdo real do PNG amplificado, não uma textura nova.

Abra o painel **Debug** para acessar:

- Origem E/D e x/y em pixels do arquivo original.
- Dimensões visuais da janela ampliada, antes da rotação.
- Posição do canto da caixa rotacionada no viewport; atualizada no resize/scroll.
- Identificação de repetição exata de janela.
- Coluna **Limite**, quando a caixa cruza o container ou o viewport. É uma checagem dos limites da caixa, não uma medida de quantos grãos estão visíveis.
- Controle **Caixas e IDs**: desligue para confirmar o conteúdo real sem as anotações.
- Controle **Cores de debug**: desligue para usar as cores do arquivo com o alpha amplificado, sem a coloração de grupos.

Alguns limites já cortavam caixas antes do debug. Na versão estética em 390 × 844, as caixas B05, B07, B09, B10 e B12 ultrapassam o container do perímetro. O debug preserva esse comportamento para diagnóstico; ampliar a escala pode expor cruzamentos adicionais. A área de cada janela não equivale à área preenchida por desgaste: algumas contêm poucos grãos e grandes regiões transparentes.

## Capturas Playwright

| Versão | Desktop 1440 × 900 | Mobile 390 × 844 |
| --- | --- | --- |
| Forte, caixas/IDs | `.playwright-mcp/homepage-dark-wear-debug-strong-desktop-1440x900.png` | `.playwright-mcp/homepage-dark-wear-debug-strong-mobile-390x844.png` |
| Moderada, caixas/IDs | `.playwright-mcp/homepage-dark-wear-debug-moderate-desktop-1440x900.png` | `.playwright-mcp/homepage-dark-wear-debug-moderate-mobile-390x844.png` |
| Forte, apenas artefatos coloridos | `.playwright-mcp/homepage-dark-wear-debug-strong-artifacts-only-desktop-1440x900.png` | `.playwright-mcp/homepage-dark-wear-debug-strong-artifacts-only-mobile-390x844.png` |

Painel aberto com inventário: `.playwright-mcp/homepage-dark-wear-debug-inspector-desktop.png`.

## Arquivos e validação

Criados: as duas páginas HTML, `assets/homepage-wear-debug.css`, `assets/homepage-wear-debug.js` e este documento. README atualizado com links. Não houve geração de imagens ou edição dos PNGs; os SVGs inline são filtros de inspeção, sem geometria ornamental.

Playwright confirmou 31 recortes, 31 IDs, 31 linhas no inventário e zero duplicatas exatas. A geometria de hero, retrato, logo e início de Archive permanece idêntica à atual em desktop/mobile; definições dos 31 recortes idênticas; sem overflow horizontal ou imagens quebradas; foto com `filter: none`; opacidade da base preservada. Os dois controles foram testados e o console não apresentou erros. `node --check assets/homepage-wear-debug.js` passou.

Hashes da página estética atual, seu CSS, Shop, foto e logo conferidos e preservados. As seções inferiores têm HTML idêntico. A tipografia e os estilos do site não foram alterados; apenas o painel e os rótulos de diagnóstico usam fonte monoespaçada. Nenhuma publicação ou push foi realizado.
