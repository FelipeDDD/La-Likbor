# La Likbør — Shop, segunda iteração

Site estático em inglês, sem dependências de terceiros ou etapa de build. A implementação usa HTML, CSS, JavaScript e cinco SVGs decorativos locais. Node.js é necessário somente para o servidor de desenvolvimento.

## Executar

Na raiz `C:\Users\Felipe\Documents\Github\La.likbor`, execute:

```powershell
node dev-server.mjs
```

Abra **http://127.0.0.1:4173/**. Encerre com `Ctrl+C`. Para escolher outra porta:

```powershell
$env:PORT = '4174'
node dev-server.mjs
```

O servidor atende somente na interface local, não publica o projeto e não precisa de `npm install`. A sessão usada na validação foi encerrada ao finalizar a tarefa. Os hotlinks das fotografias precisam de internet.

## Arquivos criados

| Arquivo | Responsabilidade |
| --- | --- |
| `index.html` | Shop, controles, navegação e modal nativo acessível |
| `assets/styles.css` | Tokens de cor, molduras, texturas, grid responsivo e modos das fotografias |
| `assets/products.js` | Os seis registros copiados literalmente do protótipo, incluindo fotos, preços e links |
| `assets/shop.js` | Renderização, categorias, Styled/Original, intensidade, modal e erros de hotlink |
| `assets/grain.svg` | Ruído discreto e repetível |
| `assets/scratches.svg` | Desgaste lateral irregular, com riscos e pequenas manchas repetíveis |
| `assets/corner.svg` | Ornamento de canto reutilizável, sem esticar uma imagem inteira |
| `assets/star.svg` | Estrela gravada compartilhada entre seções e favicon |
| `assets/atmosphere.svg` | Composição vetorial abstrata com lua, círculos e ramos |
| `dev-server.mjs` | Servidor estático sem dependências |
| `.gitignore` | Ignora saídas de navegador, logs e eventual `node_modules` |
| `README.md` | Execução, estrutura, decisões e validação |

O ZIP e todos os arquivos de referência foram preservados. O material já estava extraído em `la-likbor-codex-starter/la-likbor-codex-starter/`. Nenhuma foto de produto foi baixada, substituída ou regravada. O retrato não foi incorporado à página.

## Sistema visual

- Paleta preta, marfim e bronze envelhecido; tokens em `:root`.
- `page-frame`: margens desgastadas que acompanham qualquer altura de página e ruído discreto no fundo.
- `texture-layer`: textura compartilhada nas superfícies atmosféricas.
- `ornate-card`: moldura de 2 px com gradiente, borda interna, cantos SVG e variações discretas; nos produtos, 3 px com pequenas marcas e destaques de bronze fosco.
- `section-divider` e `short-divider`: linhas de bronze e estrela para reutilização em outras páginas.
- Cabeçalho com título serifado levemente irregular, gravura celestial e halo quente; rodapé usa a mesma linguagem.
- Cards com painel de imagem quadrado, `object-fit: contain`, divisória, títulos espaçados, metadados em itálico, preço e link direto para o anúncio. As fotos mantêm sua proporção original e aparecem inteiras, com espaço lateral. Hover e foco realçam a borda.
- Três colunas em desktop, duas em tablet e uma em celulares estreitos. Controles têm foco visível; há atalho para o conteúdo e suporte a movimento reduzido.

## Fotografias e comportamento

Styled **Strong** usa `saturate(.57) contrast(1.14) brightness(.73) sepia(.22)`, grain e vinheta. **Soft** usa `saturate(.78) contrast(1.07) brightness(.88) sepia(.1)` e camadas mais discretas. Tudo acontece no navegador e é reversível.

**Ritual**, experimental, usa `saturate(.32) contrast(1.23) brightness(.64) sepia(.36)`, uma vinheta mais presente, tonalidade envelhecida, grain e riscos laterais muito discretos. Foi examinado sobretudo nos fundos claros da jaqueta e do vinil. Strong continua sendo a intensidade inicial. Ritual altera somente a apresentação Styled; a mesma foto original fica disponível em um clique.

Original remove filtros, grain, vinheta, ambience, ícone sobre a foto e ornamento superior. O enquadramento integral e o mesmo URL remoto são mantidos. O modal sempre usa a fotografia original sem filtros, independentemente do modo da grade. Suporta Enter/Espaço, Tab, Escape, fechamento pelo fundo, bloqueio de scroll e devolução do foco ao card.

Se um hotlink falhar, aparece uma mensagem no card/modal e o link do anúncio continua disponível. Não há imagem inventada de substituição.

## Diferenças em relação aos mockups

As cenas fotográficas com vela, caveira e paisagem não são assets separados no pacote: foram interpretadas por uma gravura vetorial abstrata, menos cinematográfica. Os fundos reais das seis fotografias continuam visíveis. O catálogo tem seis peças e três colunas no desktop, enquanto o mockup tem doze peças conceituais em quatro colunas. A página de detalhe conceitual não foi implementada; a ampliação é um modal.

A identidade usa um wordmark serifado legível com `ø`. O lettering black metal da home ainda precisa de um logo próprio; não foi recortado do mockup nem apresentado como um SVG reproduzido. Home, Archive e About são destinos futuros, indicados como inativos. O protótipo informa que não possui checkout. Não houve publicação, push, integração Vinted ou consulta de disponibilidade/preços atuais.

## Validação realizada com Playwright MCP

Em 11 de outubro de 2026:

- Servidor local respondeu HTTP 200.
- As seis fotos remotas carregaram. Os registros foram comparados literalmente com `references/shop_current.html`.
- Filtros retornaram All: 6, Garments: 3, Records: 2 e Accessories: 1.
- Styled Soft e Strong apresentaram filtros distintos; Original e todos os seus ancestrais apresentaram `filter: none`, opacidade 1 e mistura normal, sem overlays.
- Modal usou exatamente o URL original; abertura por teclado, foco contido, Escape e restauração do foco passaram.
- Layout verificado em 320, 390, 768 e 1440 px, sem rolagem horizontal; modal em mobile também sem overflow horizontal.
- Falha de hotlink simulada no navegador: card e modal exibiram o aviso e preservaram o link. A interceptação foi removida e as seis fotos voltaram a carregar.
- Capturas examinadas visualmente junto às referências. Ajustes após inspeção: grain suavizado, desgaste lateral mais irregular e margens dos efeitos corrigidas em tablet/telas estreitas.

Para repetir manualmente: percorra as quatro categorias, alterne Styled/Original e Soft/Strong/Ritual, abra uma foto com Enter, percorra o modal com Tab e feche com Escape. Confira imagens completas, legibilidade e ausência de scroll horizontal em desktop/mobile. A falha dos hotlinks também pode ser verificada bloqueando uma URL de imagem nas ferramentas do navegador.

Capturas da primeira versão, preservadas para comparação, relativas à raiz:

- `.playwright-mcp/shop-desktop-1440x900.png` — viewport desktop 1440 × 900.
- `.playwright-mcp/shop-mobile-390x844.png` — viewport mobile 390 × 844.
- `.playwright-mcp/shop-desktop-full.png` — página completa em desktop.
- `.playwright-mcp/shop-mobile-full.png` — página completa em mobile.
- `.playwright-mcp/shop-desktop-original.png` — grade no modo Original.
- `.playwright-mcp/shop-modal-original.png` — ampliação original, aberta a partir de Styled.

O navegador deste ambiente utiliza barras de rolagem tradicionais: capturas completas podem ter largura útil 15 px menor que o viewport configurado. PNGs `initial` e os snapshots/logs automáticos são registros intermediários, não o resultado final.

## Segunda iteração — proporções, Ritual e molduras

Foram alterados apenas `index.html`, `assets/styles.css` e este README. Os cinco SVGs, o JavaScript funcional, os seis registros e as fotografias foram preservados. Nenhuma página nova ou serviço foi adicionado.

O cabeçalho e os espaços internos foram reduzidos. No mobile, Styled/Original e intensidade compartilham uma linha; categorias permanecem inteiramente visíveis. Botões e seletor mantêm altura mínima de 44 px. Os cards têm painel quadrado e área de texto menor, com borda de 3 px e marcas discretas no bronze.

Comparação medida no Playwright, valores arredondados em pixels:

| Medida | Desktop V1 → V2 (1440 × 900) | Mobile V1 → V2 (390 × 844) |
| --- | --- | --- |
| Navegação | 92 → 72 | 114 → 94 |
| Cabeçalho Shop | 267 → 198 | 255 → 176 |
| Início da grade | 483 → 372 | 584 → 421 |
| Altura do primeiro card | 671 → 510 | 546 → 419 |
| Limite inferior do primeiro nome | 1050 → 803 | 1035 → 765 |
| Limite inferior do primeiro preço | 1105 → 852 | 1090 → 813 |

Em desktop, os nomes e preços dos três produtos da primeira linha ficam visíveis sem scroll. No mobile, o nome e preço do primeiro produto também aparecem no viewport de 844 px. Todas as fotos continuam inteiras; Original apenas ganha espaço lateral no painel quadrado, sem qualquer tratamento cromático.

### Camada para imagem futura no cabeçalho

`index.html` inclui uma camada decorativa vazia `.hero-media`, atrás da composição SVG. Ela aceita uma imagem por variável CSS, posição ajustável e fade para preto na lateral e na base. Nenhuma imagem foi adicionada nem há requisição remota dessa camada.

Quando houver um asset aprovado, coloque-o em `assets/` e configure em `assets/styles.css`:

```css
.hero {
  --hero-image: url('approved-hero.webp');
  --hero-image-position: 70% 50%;
}
```

O caminho desse exemplo é relativo ao CSS. O enquadramento e os fades deverão ser revisados com o asset definitivo.

### Validação da V2

- Comparação visual entre capturas V1 e V2 nas duas resoluções solicitadas.
- As seis fotografias carregaram; os quatro filtros de categoria mantiveram suas contagens e estados acessíveis.
- Soft, Strong e Ritual produziram filtros distintos. Original permaneceu sem filtros, blending, mudanças de opacidade ou overlays após alternar de Ritual; o seletor fica desativado e a intensidade escolhida é recuperada ao voltar a Styled.
- Modal aberto a partir de Ritual exibiu o mesmo URL original, sem filtro ou corte. Enter, Tab, Escape e retorno de foco passaram.
- Verificação em 320, 390, 768, 1050, 1100 e 1440 px: sem overflow horizontal, controles com altura de 44 px e fotografias com `object-fit: contain`.
- A primeira linha inteira de nomes e preços ficou abaixo de 900 px em desktop. Não houve erros ou avisos no console durante a validação normal.

Capturas da V2:

- `.playwright-mcp/shop-v2-desktop-1440x900.png` — desktop, Strong.
- `.playwright-mcp/shop-v2-mobile-390x844.png` — mobile, Strong.
- `.playwright-mcp/shop-v2-desktop-full.png` — desktop completo, Strong.
- `.playwright-mcp/shop-v2-mobile-full.png` — mobile completo, Strong.
- `.playwright-mcp/shop-v2-ritual-desktop-1440x900.png` — Ritual com jaqueta e vinil visíveis.
- `.playwright-mcp/shop-v2-ritual-mobile-390x844.png` — Ritual em mobile.
- `.playwright-mcp/shop-v2-original-desktop.png` — Original após selecionar Ritual.

A V2 segue local, sem publicação ou push. As cenas fotográficas dos mockups e o logo black metal próprio permanecem para uma etapa futura.
