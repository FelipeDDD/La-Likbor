# Fidelidade visual — integração corrigida das texturas (v2)

Página: http://127.0.0.1:4173/homepage-dark-reference-extraction.html

Execute `node dev-server.mjs` caso o servidor local não esteja rodando. A raiz continua abrindo o Shop.

## Inspeção da fonte

Foram examinados `assets/exemplos/base inicial.png`, os três PNGs extraídos e o README do pacote. A referência concentra riscos finos e assimétricos nas margens, desde o topo da navegação; não apresenta as faixas cinzentas uniformes que surgiam na aplicação anterior.

O PNG amplo mede 1122 × 535. A leitura do canal alfa confirmou que o centro é transparente: apenas aproximadamente 5,55% dos pixels têm alfa maior que zero. O conteúdo RGB que aparece em alguns visualizadores não significa que a foto ou o logo estejam opacos neste overlay.

As faixas de 68 × 535 correspondem às laterais dessa mesma composição. A versão anterior dimensionava cada uma pela altura do hero, chegando a 98,14 × 772,19 no mobile. Embora uniforme, essa ampliação engrossava os riscos e prolongava o desgaste por toda a composição empilhada. Além disso, as imagens começavam abaixo da navegação.

## Correção

- Desktop: aplicado somente `la_likbor_hero_riscos_referencia.png`, como imagem decorativa transparente. Sua largura determina a escala de toda a composição, preservando a relação 1122/535. Em 1440 × 900, o tamanho renderizado é 1362 × 649,44; a altura não acompanha os 704 px do conjunto atual.
- Mobile: aplicadas somente as duas faixas originais, cada uma exatamente em 68 × 535. Nenhuma é esticada até o fim do hero ou dos controles.
- Em ambos, o início está alinhado ao topo da navegação (y aproximado de 1 px, devido à borda existente), e não à divisão entre navegação e hero.
- Máscaras verticais suavizam o início e dissolvem o término. Máscaras horizontais retiram gradualmente o excesso das margens e a entrada no conteúdo, sem criar riscos novos.
- No mobile, cada faixa é deslocada 14 px para fora da área decorativa; as posições e máscaras esquerda/direita são distintas. Não há repetição nem espelhamento.
- Opacidade: 76% desktop / 70% mobile. Apenas a camada de textura recebe `sepia(.35) saturate(.7) brightness(.82)`, aproximando os resíduos claros do bronze apagado/marfim envelhecido. Blend normal, sem glow, blur ou sombra.
- O círculo ornamental SVG existente permanece, com opacidade reduzida de 75% para 62% para acompanhar a intensidade dos riscos. O PNG do logotipo não mudou.

Não há moldura horizontal adicionada, retângulo de fundo ou imagem completa do mockup aplicada ao site. O PNG amplo é o overlay alfa fornecido no pacote; não substitui a fotografia aprovada.

## Comparação com a referência

A escala do desktop mantém a distribuição original dos riscos entre as duas laterais. O início junto da navegação e os fades removem a interrupção horizontal da primeira integração. A menor luminosidade retira os blocos cinza claros, preservando as linhas e diferenças do material original.

O mobile mantém a espessura natural dos riscos e permite que eles desapareçam antes dos controles inferiores. O objetivo é integrar o material existente à composição empilhada, sem prolongá-lo por repetição.

A extração não contém o desgaste misturado ao lettering no mockup achatado, conforme o README do pacote. Essa diferença permanece: o círculo foi preservado e ajustado, mas nenhum ornamento foi criado para preencher a área.

## Arquivos

Alterados: `homepage-dark-reference-extraction.html`, `assets/homepage-reference-extraction.css`, este documento e `README.md`.

Os quatro arquivos em `assets/bordas/reference-extraction/` continuam byte a byte idênticos aos do ZIP. Foto, logo, Shop, design system compartilhado e HTML das seções inferiores foram preservados.

## Capturas Playwright

- `.playwright-mcp/homepage-dark-reference-integration-v2-desktop-1440x900.png`
- `.playwright-mcp/homepage-dark-reference-integration-v2-mobile-390x844.png`

As capturas anteriores `homepage-dark-reference-extraction-*.png` permanecem disponíveis para comparação.

As novas capturas foram examinadas junto da referência inicial. A validação em 320, 390, 768 e 1440 px confirmou layout idêntico ao da homepage base, sem overflow horizontal ou imagens quebradas. Foto sem filtro novo, proporções dos overlays preservadas, navegação para Archive e skip link funcionando, console sem erros. Hashes da foto, logo, Shop e CSS compartilhado não mudaram. Nenhuma publicação ou push foi realizado.
