# Homepage Dark — teste localizado de microdesgaste

Página: http://127.0.0.1:4173/homepage-dark-micro-wear.html

Execute `node dev-server.mjs` caso o servidor não esteja rodando. A versão anterior continua intacta em `homepage-dark-wear-layers.html`; o link no rodapé do teste abre essa página. A raiz continua sendo o Shop.

## O que mudou

Este teste não importa `homepage-wear-layers.css` nem suas seis áreas amplas de `worn-paper-source-v7.png`. Isso remove as manchas de abrasão nos cantos e o grande campo de papel atrás do logo. O teste importa o mesmo design system, o mesmo CSS do hero e a mesma integração da referência.

Os riscos verticais continuam com a posição, escala, máscaras e intensidade anteriores: 76% no desktop e 70% no mobile. O círculo ornamental conserva a opacidade de 62%. Nenhuma dessas camadas foi redesenhada.

Os complementos usam somente estes dois PNGs existentes:

- `assets/bordas/reference-extraction/la_likbor_riscos_esquerda.png`
- `assets/bordas/reference-extraction/la_likbor_riscos_direita.png`

São 31 seleções distintas: 27 regiões pequenas de grãos/falhas de tinta e quatro trechos curtos de linha. Não são 31 texturas completas sobrepostas. Cada região de grãos ocupa uma janela de 18 × 28 px, com marcas individuais geralmente de poucos pixels; os trechos de linha usam janelas de 9–10 × 15–21 px. A espessura vem dos próprios arquivos fornecidos.

As regiões foram examinadas em transparência sobre preto. A seleção evita áreas vazias, massas de abrasão, os cantos densos e as ramificações maiores. Nenhuma imagem foi gerada ou modificada, e nenhum risco novo foi desenhado.

## Distribuição e apresentação

- Quinze seleções no perímetro, incluindo topo, laterais e pequenas entradas para dentro do hero; dezesseis na região externa do círculo/lettering.
- Posicionamento manual e assimétrico, com ângulos diferentes. Não há grade de repetição, `background-repeat`, espelhamento ou randomização em runtime.
- Os PNGs permanecem em 68 × 535 no background de cada seleção: escala original, sem ampliar traços ou grãos. As diferentes formas/tamanhos visíveis são do material selecionado e dos quatro trechos curtos de linha.
- Opacidades entre 52% e 72% sobre extrações que já contêm transparência; tonalidade com `sepia(.35) saturate(.7) brightness(.82)`, igual à base. Nenhum branco puro foi acrescentado.
- Blend `screen` e fades de 3 px nas laterais / 4 px nas extremidades de cada janela retiram limites retangulares e o substrato preto. Não há blur, glow ou textura nebulosa.
- O campo focal termina antes da área central da foto. No mobile, seu fade inferior termina em 222 px de altura; as entradas laterais sobem para a região do lettering e as marcas inferiores são deslocadas para fora dos botões/textos.
- `overflow: clip` no container decorativo impede que fragmentos rotacionados ampliem o viewport. As seleções têm `aria-hidden` e `pointer-events: none`.

O resultado é intencionalmente delicado. As marcas ficam mais fáceis de avaliar nas capturas em tamanho original; uma comparação reduzida mostra sobretudo a retirada das manchas grandes. A extração disponível limita o repertório de falhas de tinta: o teste reutiliza pequenos trechos do material original, sem reproduzir exatamente todo o desgaste do mockup.

## Arquivos

Criados: `homepage-dark-micro-wear.html`, `assets/homepage-micro-wear.css` e este documento. Atualizado: `README.md`, apenas para acrescentar o acesso ao teste.

Não modificados: versão anterior e seu CSS, integração das faixas, PNGs de origem, fotografia, logo, círculo SVG, Shop e CSS compartilhado. O HTML das seções Archive/About permanece idêntico ao da versão anterior. O rodapé e o aviso identificam apenas esta página de estudo.

## Capturas Playwright

- Desktop 1440 × 900: `.playwright-mcp/homepage-dark-micro-wear-desktop-1440x900.png`
- Mobile 390 × 844: `.playwright-mcp/homepage-dark-micro-wear-mobile-390x844.png`
- Comparação lado a lado: `.playwright-mcp/homepage-dark-micro-wear-comparison.png`
- Anterior desktop: `.playwright-mcp/homepage-dark-micro-wear-before-desktop-1440x900.png`
- Anterior mobile: `.playwright-mcp/homepage-dark-micro-wear-before-mobile-390x844.png`

Capturas revisadas e comparadas à versão anterior e a `assets/exemplos/base inicial.png`, especialmente quanto à escala e delicadeza das marcas. Playwright confirmou geometria preservada de hero, fotografia, logo e início de Archive em 320, 390, 768 e 1440 px, sem overflow horizontal ou imagens quebradas. A foto permanece com `filter: none`; intensidade da base preservada; skip link, Archive e link para comparação funcionando; console sem erros.

Hashes da versão anterior, seu CSS, CSS da extração, Shop, CSS compartilhado, foto e logo conferidos antes/depois e preservados. Nenhuma publicação ou push foi realizado.
