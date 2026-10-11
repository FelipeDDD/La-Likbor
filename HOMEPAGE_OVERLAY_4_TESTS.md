# Testes de moldura4 e moldura4-1

## Abrir

Execute `node dev-server.mjs` na raiz do projeto, caso o servidor ainda não esteja rodando.

- http://127.0.0.1:4173/homepage-dark-overlay-4.html
- http://127.0.0.1:4173/homepage-dark-overlay-4-1.html

Os testes anteriores A/B e a homepage dark base continuam disponíveis e não foram modificados.

## Assets e aplicação

| Página | Asset original | Desktop | Mobile |
| --- | --- | --- | --- |
| `homepage-dark-overlay-4.html` | `assets/bordas/moldura4.png` | 55% | 42% |
| `homepage-dark-overlay-4-1.html` | `assets/bordas/moldura4-1.png` | 55% | 42% |

Ambos são PNGs de 1672 × 941. Nenhum asset foi gerado, retocado, recolorido ou renomeado. Cada página usa apenas seu asset selecionado. As opacidades são iguais para facilitar a comparação.

O CSS específico é `assets/homepage-overlay-4-tests.css`. Ele desativa as camadas antigas de papel somente nestes testes. Preserva os ornamentos existentes, a foto tratada, os fades da fotografia, o logo, o layout e as seções inferiores.

Em desktop, a moldura ocupa o hero e o espaço do cabeçalho; o PNG é dimensionado à caixa. Fades geométricos preservam uma faixa maior de desgaste original que no teste anterior e removem marcas isoladas do centro. Não há máscara procedural nem riscos novos.

O blend `screen` impede que as regiões pretas semitransparentes do PNG escureçam a fotografia. Isso é especialmente relevante para `moldura4.png`, cujo pixel central tem alfa 91/255; em `moldura4-1.png` o centro é transparente. Nenhum filtro de cor foi aplicado.

No mobile, quatro faixas recortam as respectivas bordas do mesmo PNG. As laterais mantêm a proporção da textura, sem repetição ou espelhamento. Fades suavizam as junções dos cantos e a entrada na área do conteúdo. A camada não recebe eventos do ponteiro.

## Comparação visual

`moldura4` apresenta cantos arredondados, abrasão e uma dobra clara no canto inferior direito. Nesta integração, sugere melhor uma capa antiga manuseada e tem mais variação material.

`moldura4-1` tem bordas mais retas e regulares, com abrasão visível. O aspecto é mais de impressão gasta em uma superfície retangular. O centro transparente facilita a integração, embora o contorno ainda pareça mais uniforme.

As duas molduras continuam bastante presentes, sobretudo no mobile. A redução inicial de 50% para 42% no mobile conservou os sinais de uso sem deixar as margens tão dominantes. Se a versão 4 for escolhida e ainda parecer forte, um próximo ajuste pequeno seria 50% desktop / 38% mobile. Não há necessidade de adicionar ornamentos ou novos riscos.

## Capturas Playwright

- `.playwright-mcp/homepage-dark-overlay-4-desktop-1440x900.png`
- `.playwright-mcp/homepage-dark-overlay-4-1-desktop-1440x900.png`
- `.playwright-mcp/homepage-dark-overlay-4-mobile-390x844.png`
- `.playwright-mcp/homepage-dark-overlay-4-1-mobile-390x844.png`

As quatro capturas foram examinadas visualmente. A validação nas larguras 320, 390, 768, 1050 e 1440 confirmou ausência de overflow horizontal e imagens quebradas. Posições e dimensões de hero, foto e logo são iguais às da homepage base. A fotografia continua com `filter: none`, as seções inferiores são idênticas e o console não apresentou erros. Os hashes dos PNGs fornecidos não mudaram.
