# Estudo de textura contínua — referência original

Página do estudo: http://127.0.0.1:4173/texture-reference-study.html

Heroes independentes:

- http://127.0.0.1:4173/homepage-dark-continuous-normal.html
- http://127.0.0.1:4173/homepage-dark-continuous-enhanced.html

Execute `node dev-server.mjs` caso o servidor não esteja rodando. A raiz continua abrindo o Shop. As versões anteriores, inclusive o microdesgaste com 31 recortes e os dois debugs, permanecem intactas.

## Mudança de abordagem

A nova textura foi extraída novamente de `assets/exemplos/base inicial.png`, não dos 31 fragmentos nem dos overlays grunge anteriores. A referência tem 1122 × 1402 px. O estudo usa apenas os primeiros 560 px de altura, terminando antes das molduras dos cards inferiores.

Cinco regiões amplas são consideradas: lateral esquerda contínua, lateral direita contínua, área preta superior, margem superior e área preta inferior esquerda. Elas preservam as coordenadas e diferenças de distribuição da referência. Suas interseções são reunidas em **um único campo RGBA**; não são reposicionadas como partículas ao redor do logo, nem repetidas ou espelhadas.

As regiões não equivalem a cinco texturas sobrepostas: o resultado de cada intensidade é um único PNG composto, com centro transparente. O mapa de seleção e descarte está na página e em `assets/bordas/continuous-reference/extraction-map.json`, com polígonos, dimensões e SHA-256 da fonte.

## Seleção confiável e limites

Foram inspecionados os traços longos das laterais, diferenças de espessura, pontilhado de impressão, pequenas invasões e o risco fino na área preta inferior. Regiões com fotografia, navegação, símbolos, textos, botões, lettering e órbita original são excluídas antes da preparação do alpha.

Perto do círculo/lettering, os elementos do mockup achatado se confundem. Essas áreas ambíguas foram descartadas. O estudo conserva a pequena extensão segura de desgaste junto ao quadrante externo superior esquerdo e as regiões pretas acima/abaixo, sem copiar a órbita nem inventar galhos ou uma nova distribuição circular. A integração junto ao logo continua discreta por essa limitação real do material de origem.

O PNG não recupera um alpha original inexistente: é uma separação controlada do desgaste sobre o fundo escuro da imagem achatada. Não é uma reprodução perfeita de toda a superfície do mockup, e não se deve preencher as áreas descartadas com material inventado para simular fidelidade.

## Transparência preparada no arquivo

O script `tools/extract-reference-wear.mjs` usa apenas Node.js e bibliotecas nativas. Nenhuma imagem foi gerada por IA, e a imagem original não foi modificada.

Etapas:

1. Decodificar a região superior do PNG RGB original, sem redimensionamento.
2. Aplicar a união das regiões confiáveis e excluir os polígonos de conteúdo.
3. Estimar o substrato escuro com abertura morfológica de 7 × 7; extrair somente o sinal positivo de luminância acima desse substrato, com limiar de 3 níveis.
4. Preparar RGB desassociado do preto, preservando as proporções cromáticas dos pixels da fonte. O alpha é calculado a partir do sinal de desgaste; as transições de seleção são incorporadas ao PNG com faixa de 4–6 px, em vez de máscaras de compensação no CSS.
5. Salvar duas intensidades: **Normal** e **Acentuada**, esta com alpha multiplicado por **2,4**, limitado a 255. Os bytes RGB e as posições são iguais nas duas versões; muda somente o alpha.

Reprodução: `node tools/extract-reference-wear.mjs`.

São 22.930 pixels ativos no campo composto. Alpha médio desses pixels: aproximadamente 9,8% normal / 22,2% acentuado. Esse dado descreve o arquivo; a prioridade visual é a continuidade original das linhas e irregularidades, não aumentar contagens.

## Aplicação no hero

Desktop: um PNG de 1122 × 560 ocupa a largura do conjunto hero/navegação com escala uniforme e proporção preservada. O desgaste conserva suas posições relativas dentro do campo da referência. Não há esticamento independente dos eixos.

Mobile: a mudança de proporção e o empilhamento da foto impedem reduzir o PNG inteiro sem tornar os traços subpixel. Três fatias **não sobrepostas na fonte** são derivadas do mesmo composto: esquerda 112 × 560, direita 112 × 560 e região inferior 250 × 45. As laterais ficam em escala nativa, deslocadas 14 px para fora para manter as linhas principais junto às margens atuais; a área inferior é centralizada abaixo dos controles. Não há repetição, espelhamento ou ampliação vertical para cobrir toda a página. O container usa apenas `overflow: clip` nas extremidades externas para evitar overflow horizontal.

Em ambas as intensidades: **opacity 1, blend normal, filter none, mask none**. Não são importados os estilos dos 31 fragmentos nem os overlays experimentais antigos. O círculo existente permanece em 62%; foto, PNG do logo, textos, composição, tipografia e seções inferiores são preservados.

## Página isolada

O estudo mostra as duas intensidades:

- Sobre preto, com links aos PNGs transparentes em tamanho original.
- Nas laterais em escala nativa, para inspecionar traços de um pixel.
- Sobre um painel com filetes bronze; sem outra textura concorrente.
- Sobre a composição atual do hero, em duas páginas de teste incorporadas.
- Em um mapa da referência: verde para regiões consideradas e vermelho para conteúdo descartado.

## Arquivos

Criados:

- `texture-reference-study.html`
- `homepage-dark-continuous-normal.html`
- `homepage-dark-continuous-enhanced.html`
- `assets/texture-reference-study.css`
- `assets/homepage-continuous-wear.css`
- `tools/extract-reference-wear.mjs`
- `assets/bordas/continuous-reference/reference-wear-{normal,enhanced}.png`
- Seis derivados móveis `reference-wear-{normal,enhanced}-{left,right,lower}.png`
- `assets/bordas/continuous-reference/extraction-map.json`
- Este documento.

Atualizado: `README.md`, apenas com acesso ao estudo. A homepage atual/aprovada e seus assets não foram alterados.

## Capturas Playwright

| Conteúdo | Desktop 1440 × 900 | Mobile 390 × 844 |
| --- | --- | --- |
| Estudo, viewport | `.playwright-mcp/continuous-reference-study-desktop-1440x900.png` | `.playwright-mcp/continuous-reference-study-mobile-390x844.png` |
| Hero normal | `.playwright-mcp/continuous-reference-hero-normal-desktop-1440x900.png` | `.playwright-mcp/continuous-reference-hero-normal-mobile-390x844.png` |
| Hero acentuado | `.playwright-mcp/continuous-reference-hero-enhanced-desktop-1440x900.png` | `.playwright-mcp/continuous-reference-hero-enhanced-mobile-390x844.png` |

Estudo completo, com altura variável além do viewport:

- `.playwright-mcp/continuous-reference-study-desktop-full.png`
- `.playwright-mcp/continuous-reference-study-mobile-full.png`

Inspeções isoladas:

- `.playwright-mcp/continuous-reference-overlays-native.png`: dois overlays sobre preto, em escala nativa.
- `.playwright-mcp/continuous-reference-extraction-map.png`: mapa das áreas consideradas e descartadas.
- `.playwright-mcp/continuous-source-regions-inspection.png`: ampliação de áreas da referência, usada durante a seleção; não é um asset do site.

## Verificação

Capturas revisadas visualmente contra a referência. Playwright confirmou geometria idêntica de hero, foto, logo e início de Archive em 320, 390, 768 e 1440 px; nenhuma imagem quebrada ou overflow horizontal; foto com `filter: none`; nenhuma instância de `.micro-mark`; material novo sem máscara/filtro/opacidade compensatória. Os dois heroes dentro do estudo carregam suas imagens. Skip link e navegação para Archive funcionam.

Áreas verificadas de lettering, foto, textos e navegação no espaço da extração têm alpha zero. A comparação dos dados RGBA dos PNGs confirmou zero diferenças RGB entre as intensidades; todos os pixels ativos diferem no alpha. O HTML das seções inferiores é idêntico ao da versão atual.

Hashes de homepage atual, seu CSS, `homepage-dark-hero.html`, Shop, fotografia e logo foram conferidos antes/depois e preservados. Nenhuma publicação ou push foi realizado.
