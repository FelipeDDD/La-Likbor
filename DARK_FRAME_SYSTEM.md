# La Likbør — sistema de moldura dark

## Revisão local

Execute `node dev-server.mjs` na raiz, sem instalação ou build.

- Hero refinado: http://127.0.0.1:4173/homepage-dark-frame-refined.html
- Card mestre: http://127.0.0.1:4173/dark-frame-card-study.html
- Base anterior preservada: http://127.0.0.1:4173/homepage-dark-continuous-enhanced.html

A raiz `/` continua sendo o Shop. Estas duas páginas adotam o módulo oficial opt-in `assets/dark-frame.css`; as páginas anteriores não recebem esse stylesheet.

## Camada principal

O hero usa exatamente `assets/bordas/continuous-reference/reference-wear-enhanced.png`, a versão Acentuada aceita, e suas três faixas responsivas anteriores. Nenhum desses PNGs foi alterado. SHA-256 do PNG amplo: `d0a71f28bd612d2062eae8873677ecff2689b870a1748217ff819196b94f63c8`.

Posição, proporção, transparência, cor e continuidade da base permanecem idênticas. No desktop, escala uniforme de 1122 × 560; no mobile, faixas laterais nativas de 112 × 560, sem repetição, espelhamento ou esticamento pela altura do hero.

## Camada complementar

Uma segunda camada transparente, `assets/bordas/dark-frame/companion.png`, reaproveita quatro áreas contínuas do próprio PNG acentuado. Nenhuma linha foi desenhada e nenhuma imagem foi gerada por IA. RGB original preservado; giros de 90° em dois trechos, sem deformação ou interpolação.

| Campo | Região no PNG-base (x, y, largura, altura) | Posição no complemento desktop | Tratamento do alpha |
| --- | --- | --- | --- |
| Topo | 1060, 70, 30, 190 | 145, 0; giro 90° | × 0,72; teto 110/255 |
| Exterior esquerdo do círculo / invasão | 35, 135, 28, 140 | 82, 136 | × 0,65; teto 85/255 |
| Exterior superior do círculo | 1062, 330, 28, 145 | 148, 58; giro 90° | × 0,65; teto 85/255 |
| Base | 38, 513, 65, 45 | 155, 514 | × 0,72; teto 90/255 |

A transparência é preparada no PNG, com transição de 5/8 pixels nos limites dos campos. As camadas usam opacity 1, blend `normal`, sem filtros nem máscaras CSS compensatórias. Os limites de alpha evitam pontos brancos fortes. A faixa vertical de microdesgaste entra moderadamente no espaço preto externo ao círculo; não existe distribuição circular de fragmentos.

No mobile, são usados três campos nativos: topo (190 × 30), exterior inferior do círculo (145 × 28) e base (65 × 45). O campo vertical focal é omitido para proteger o lettering. O campo inferior começa abaixo dos botões, com a sobra transparente recortada pelo contêiner existente. O círculo ornamental continua em 62%, como na base aceita.

## Card mestre

`Photography` e `Collections` são dois exemplos isolados de um único componente `.dark-frame-card`. São cards textuais para avaliar moldura e espaçamento; não foram introduzidas fotografias adicionais.

- Coordenadas canônicas: 360 × 250; escala uniforme em ambas as dimensões.
- Padding: 28 px desktop, 26 px mobile; 22 px abaixo de 361 px.
- Fundo quase preto, texto marfim existente e filete bronze discreto e interrompido.
- Cada card reutiliza trechos laterais longos distintos da base aceita; quatro regiões de perímetro em um PNG-base, sem tile ou espelhamento.
- Alpha-base: × 0,60, teto 130/255. Complemento: dois campos de topo/base, × 0,52, teto 75/255. Opacity CSS 1 e blend normal.
- Dois PNGs por card: base contínua e complemento leve. Cantos sem novos ornamentos. Conteúdo com folga em relação ao desgaste.
- Photography permanece um artigo de prévia; Collections mantém o link para o Shop. Foco de teclado visível.

O primeiro teste apresentou grão denso na base do card; foi substituído por um trecho fino do desgaste inferior da referência. Essa correção também evita repetir uma mancha retangular.

## Arquivos desta rodada

Criados:

- `homepage-dark-frame-refined.html`
- `dark-frame-card-study.html`
- `assets/dark-frame.css` — módulo compartilhado, importa a lógica contínua existente
- `assets/dark-frame-study.css` — somente apresentação da página isolada
- `tools/prepare-dark-frame.mjs` — preparação determinística, sem dependências
- `assets/bordas/dark-frame/companion.png` e quatro campos individuais
- `assets/bordas/dark-frame/card-{photography,collections}-{base,companion}.png`
- `assets/bordas/dark-frame/preparation-map.json`
- `DARK_FRAME_SYSTEM.md` e screenshots abaixo

Modificado nesta rodada: `README.md`, com links para a revisão.

Para reproduzir somente os assets derivados: `node tools/prepare-dark-frame.mjs`. O script não escreve na pasta da base contínua aceita. O mapa registra origem, coordenadas, giros e hash.

## Validação Playwright

| Página | Desktop 1440 × 900 | Mobile 390 × 844 |
| --- | --- | --- |
| Hero | `.playwright-mcp/dark-frame-hero-desktop-1440x900.png` | `.playwright-mcp/dark-frame-hero-mobile-390x844.png` |
| Cards | `.playwright-mcp/dark-frame-cards-desktop-1440x900.png` | `.playwright-mcp/dark-frame-cards-mobile-390x844.png` |

Complemento isolado sobre preto: `.playwright-mcp/dark-frame-companion-isolated.png`. Também disponível no painel expansível da página de cards.

Comparação com a base anterior em 320, 390, 768 e 1440 px: geometria do hero, fotografia, logo e arquivo inferior idêntica; filtro da fotografia `none`. Sem overflow horizontal, imagens quebradas ou conteúdo extravasando os cards. Skip link, Enter archive, foco de teclado e link Collections → Shop verificados. Console sem erros nas capturas finais.

Hashes da foto, logo, HTML do Shop e stylesheet do Shop permanecem idênticos aos anteriores. Seções inferiores da homepage não foram alteradas; somente o link de estudo no rodapé e a identificação da versão foram atualizados. Sem publicação ou push.

## Limites e próximos ajustes possíveis

O complemento continua propositalmente secundário: a intensidade principal vem da base Acentuada. A distribuição é uma adaptação dos materiais extraídos, não uma cópia pixel a pixel do mockup; não extraímos logo, fotografia ou círculo daquela imagem. Os cards usam o mesmo material em composições próprias, adequadas à escala pequena. Avaliar os cards com fotografias reais é uma etapa posterior; este estudo valida a borda.

Qualquer ajuste de intensidade deve ser feito nos limites de alpha dos campos complementares, preservando a base contínua aceita, e reproduzido pelo script. Para outros formatos de card, manter escala uniforme e preparar posições das faixas; não esticar o PNG 360 × 250 para proporções diferentes.
