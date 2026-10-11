# La Likbør — teste dos overlays A e B

Integração dos dois PNGs prontos fornecidos pelo usuário. Nenhum overlay foi gerado, redesenhado, recolorido ou regravado nesta rodada. Os nomes originais foram mantidos.

| Versão | Asset | Opacidade desktop/tablet | Opacidade mobile |
| --- | --- | --- | --- |
| A | `assets/bordas/moldura3.1.png` | 20% | 16% |
| B | `assets/bordas/moldura3.png` | 30% | 22% |

## Abrir a comparação

Execute `node dev-server.mjs` na raiz:
- http://127.0.0.1:4173/homepage-dark-overlay-a.html
- http://127.0.0.1:4173/homepage-dark-overlay-b.html

O rodapé de cada teste aponta para a outra versão. O servidor usado na validação foi encerrado após as capturas. A homepage anterior continua em `homepage-dark-hero.html`; a raiz continua sendo o Shop.

## Aplicação

As páginas são cópias da homepage dark atual, com uma camada decorativa adicional e o CSS compartilhado `assets/homepage-overlay-tests.css`. Os overlays de papel da rodada anterior foram desativados nestes testes. O círculo e os sigilos existentes foram preservados.

Desktop: uma única aplicação do PNG selecionado, cobrindo a área do hero e o cabeçalho. O tamanho se adapta à largura e à altura da moldura. Fades geométricos nas bordas deixam o centro transparente e contêm os traços que avançam demais pelo asset. Não há máscara de ruído, deformação procedural, filtros de cor ou alteração do desenho.

Mobile: quatro regiões CSS mostram partes distintas do MESMO PNG: topo, base, esquerda e direita. Cada faixa mantém a proporção original da textura; as laterais são escaladas pela altura e topo/base pela largura. Não há tiling ou espelhamento. Fades nas junções evitam somar duas bordas muito fortes e suavizam a passagem para o conteúdo.

Mistura normal (`mix-blend-mode: normal`) e `filter: none`. A transparência existente e a baixa opacidade foram suficientes; blends luminosos não foram necessários. A camada é `aria-hidden` e usa `pointer-events: none`.

A área próxima ao lettering recebe somente a margem do overlay escolhido, sem uma segunda textura ou ornamento novo. A fotografia tratada, seu enquadramento e seus fades são idênticos aos da homepage atual.

## Comparação visual

Recomendação: **B (`moldura3.png`)**. Tem abrasões mais finas e porosas, tinta falhada e desgaste mais concentrado nas margens. Isso se aproxima mais de capa de LP/CD gasta e harmoniza melhor com o lettering, sem parecer um halo separado da fotografia.

O A (`moldura3.1.png`) tem uma grande região clara no canto superior esquerdo e manchas mais amplas. As máscaras contêm essa região, mas a aparência ainda é mais nebulosa e menos fibrosa. Sua opacidade menor compensa a densidade do próprio asset.

O B ainda tem cantos marcados, sobretudo no mobile. Para um resultado mais discreto, testar 28% em desktop e 20% em mobile seria o próximo ajuste pequeno. No A, testar 18%/14% pode ajudar a conter as manchas. Manter a mistura normal. Ajustes de posição de poucos pixels podem ser avaliados após escolher a moldura; não há necessidade de inventar riscos ou redesenhar os PNGs.

## Capturas Playwright

- `.playwright-mcp/homepage-dark-overlay-a-desktop-1440x900.png`
- `.playwright-mcp/homepage-dark-overlay-b-desktop-1440x900.png`
- `.playwright-mcp/homepage-dark-overlay-a-mobile-390x844.png`
- `.playwright-mcp/homepage-dark-overlay-b-mobile-390x844.png`

As quatro capturas foram examinadas visualmente. As duas variantes também foram verificadas em 320, 390, 768, 1050 e 1440px: sem overflow horizontal, imagens quebradas, controles menores que 44px ou erros/avisos no console. Skip link por teclado funcionou nas duas versões.

Comparação de geometria com a homepage atual, em 1440 e 390px: hero, fotografia e logo mantêm exatamente as mesmas posições e dimensões. Foto com `filter: none`. HTML de foto, logo, Archive e About foi comparado e permanece igual. Mudanças de rodapé se limitam ao link entre as variantes e ao rótulo do teste.

Hashes SHA-256 confirmam que os overlays não foram modificados:
- A: `3aa4c14bc95b0ccb6f1be89a1e05cd6f6b6ae17b9a9c840bf1142f890e151c52`
- B: `963e2f5905fbdcc17a0a2628b5b09c7fefdfeba4756220d9d61cea5c4b4ec879`

## Arquivos

Criados: `homepage-dark-overlay-a.html`, `homepage-dark-overlay-b.html`, `assets/homepage-overlay-tests.css`, este documento e as capturas. Alterado: `README.md`.

A homepage atual, seus estilos, o Shop e os assets fornecidos permanecem intactos. Nenhuma publicação ou push.
