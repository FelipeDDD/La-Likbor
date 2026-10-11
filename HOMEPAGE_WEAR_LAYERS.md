# Homepage dark — correção de volume e integração (v2)

Página: http://127.0.0.1:4173/homepage-dark-wear-layers.html

Execute `node dev-server.mjs` se o servidor ainda não estiver rodando. A integração anterior da referência permanece em `homepage-dark-reference-extraction.html`. O Shop continua na raiz.

## Correção desta rodada

Os onze recortes anteriores eram pequenos demais e algumas seleções de moldura deixavam cantos visíveis. Foram substituídos por seis áreas maiores de abrasão no desktop e cinco no mobile. O aumento vem da área ocupada e da continuidade do material, sem engrossar as linhas da base ou aumentar sua opacidade.

Os complementos usam exclusivamente o PNG já existente `assets/bordas/worn-paper-source-v7.png` (1536 × 1024). Não houve geração, edição ou recoloração de bitmap nesta rodada. As regiões selecionadas evitam os cantos rígidos das molduras anteriores e os longos vincos diagonais.

## Três camadas

1. **Base / bordas:** os PNGs de `assets/bordas/reference-extraction/` e seu CSS permanecem intactos. Opacidade de 76% desktop / 70% mobile. As faixas móveis continuam em 68 × 535. Três áreas complementares acrescentam abrasão no topo direito e nas duas margens inferiores, com distribuição assimétrica.
2. **Entrada para o interior:** duas regiões mais amplas acompanham as laterais, sem repetir faixas. No mobile, a região direita é ocultada e a esquerda termina antes da fotografia por uma máscara vertical adicional.
3. **Entorno do logo:** uma área contínua de textura substitui quatro fragmentos mínimos. No desktop ocupa uma janela de 530 × 360; no mobile, 230 px de altura. Os fades limitam o material às áreas pretas antes do rosto e da região de vela/crânio. O PNG do logo e o círculo ornamental não foram alterados; o círculo conserva a opacidade de 62%.

## Aplicação e limites

- Escala uniforme do PNG: 1100 × 733,333 nas margens; 1000 × 666,667 no foco desktop; 820 × 546,667 no foco mobile. Não há esticamento independente dos eixos, repetição automática ou espelhamento.
- Cada seleção tem máscara radial combinada com fades horizontais e verticais. Nas margens desktop, os fades de 36 px e 30 px levam todas as extremidades a zero. As posições do background mantêm os limites do PNG fora das regiões visíveis.
- Blend `screen` e filtro `sepia(.75) saturate(.6) brightness(.78)` somente nos complementos. As marcas recebem tonalidade apagada, sem branco puro, glow ou blur.
- Opacidades complementares: 27%–38% desktop / 23%–34% mobile. A base permanece com a intensidade anterior.
- Decoração com `aria-hidden` e sem eventos de ponteiro; não bloqueia links ou navegação.

O material acrescentado é abrasão de papel existente, não novos riscos desenhados. Algumas ilhas de desgaste são mais granuladas que as linhas finas extraídas do mockup; a aproximação não é uma reprodução exata da referência. A comparação visual deve orientar qualquer ajuste fino de intensidade.

## Arquivos desta rodada

Modificados: `homepage-dark-wear-layers.html`, `assets/homepage-wear-layers.css`, este documento e `README.md`.

Foto, logo, círculo SVG, página anterior, CSS compartilhado, Shop e HTML das seções inferiores foram preservados. Nenhuma publicação ou push foi realizado.

## Capturas Playwright

- Antes desktop: `.playwright-mcp/homepage-dark-wear-before-desktop-1440x900.png`
- Antes mobile: `.playwright-mcp/homepage-dark-wear-before-mobile-390x844.png`
- Depois desktop: `.playwright-mcp/homepage-dark-wear-v2-desktop-1440x900.png`
- Depois mobile: `.playwright-mcp/homepage-dark-wear-v2-mobile-390x844.png`
- Comparação lado a lado: `.playwright-mcp/homepage-dark-wear-v2-comparison.png`

Capturas revisadas visualmente. Playwright confirmou geometria idêntica de hero, foto, logo e início de Archive em 320, 390, 768 e 1440 px; ausência de overflow horizontal e imagens quebradas; fotografia com `filter: none`; skip link e navegação para Archive funcionando; console sem erros.

A comparação de pixels das regiões selecionadas de rosto, vela, mão e crânio encontrou zero alterações em desktop e mobile. Isso verifica essas áreas protegidas, não toda a fotografia nas margens. O aumento de textura aparece nas áreas negras e no perímetro: 20.396 pixels desktop e 12.073 mobile tiveram diferença de pelo menos 12 níveis em um canal RGB frente à captura anterior. Esse dado confirma uma alteração visual mais ampla, sem medir fidelidade estética.
