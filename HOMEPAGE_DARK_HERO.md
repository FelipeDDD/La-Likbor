# La Likbør — homepage dark, refinamento 07

Direção visual: papel velho com tinta falhada, abrasões pequenas e bordas de espessura irregular. Referências: [página do iStock indicada pelo usuário](https://www.istockphoto.com/de/vektor/altes-papier-hintergrund-gm823196622-133252011) e a segunda imagem enviada no chat. A nova textura é independente; nenhuma prévia de stock integra o projeto.

Os overlays ramificados da V6 foram substituídos na apresentação do hero por dois assets transparentes gerados com `image_gen`: `assets/bordas/worn-paper-edge-v7.png` e `assets/bordas/worn-paper-source-v7.png`. Os prompts completos e a procedência estão em [WORN_PAPER_V7.md](assets/bordas/WORN_PAPER_V7.md).

A primeira textura ocupa apenas o perímetro: lados com desgaste diferente, falhas e maior abrasão no canto inferior esquerdo. Uma máscara SVG de ruído de semente fixa, `assets/paper-breakup.svg`, interrompe a continuidade dos traços. Máscaras CSS eliminam qualquer marca no centro. Em mobile são usados recortes distintos dos lados do asset, sem espelhamento ou tiling.

A segunda textura aparece somente numa área mascarada à esquerda e abaixo do logo, com transição gradual e baixa opacidade. O círculo `hero-orbit.svg` foi reativado de forma discreta, mantendo a relação ritual com o lettering. O sigilo do cabeçalho voltou, pois a nova textura não contém símbolos.

As camadas usam mistura `screen` e uma tonalidade levemente envelhecida. Opacidade antes das máscaras: moldura 60% desktop/50% mobile; abrasão 34%/30%. O centro da fotografia permanece limpo, sem filtros. O desgaste antigo das laterais fica oculto no hero e reaparece abaixo da transição para o restante da página.

Alterados: `assets/homepage-dark-hero.css`, `README.md` e este documento. Criados: os dois PNGs, `assets/paper-breakup.svg`, o documento de prompts e screenshots. HTML, enquadramento, fotografia, logo, Shop e conteúdo das seções inferiores foram preservados.

Capturas finais examinadas:
- `.playwright-mcp/homepage-dark-v7-desktop-1440x900.png`
- `.playwright-mcp/homepage-dark-v7-mobile-390x844.png`
- `.playwright-mcp/homepage-dark-v7-tablet-check.png`

Playwright validou 320, 390, 700, 768, 1050 e 1440px: sem overflow horizontal, imagens quebradas ou controles menores que 44px. Foto com `filter: none`; camadas decorativas com `pointer-events: none`. Console sem erros/avisos. O controle artístico continua concentrado nos URLs, opacidades e máscaras no CSS.

Execute `node dev-server.mjs` e abra http://127.0.0.1:4173/homepage-dark-hero.html. O servidor de validação foi encerrado após as capturas.

## Histórico — refinamento 06

Teste dos overlays transparentes fornecidos em `assets/bordas`, aplicados apenas como apresentação CSS. Nenhuma imagem foi recortada ou regravada. O enquadramento da fotografia tratada, seus fades e o lettering foram preservados.

- `Imagem ChatGPT 11_10_2026, 15_49_23-1.png`: camada principal de moldura/desgaste. Desktop usa uma única aplicação sem tiling. Mobile reaproveita os lados esquerdo e direito distintos da mesma imagem, deslocados 46px para expor os filetes, sem espelhamento ou repetição vertical.
- `Imagem ChatGPT 11_10_2026, 15_49_24-2.png`: ornamento focal atrás do logo. Escala/posição ajustadas por breakpoint, com máscaras para conter a textura ao redor do lettering e evitar microtextos/fotografia.

As duas camadas usam `mix-blend-mode: screen`, `saturate(.55)` e `pointer-events: none`. Opacidade da moldura: 38% desktop e 34% mobile; do orgânico: 34% desktop e 25% mobile. A mistura normal também foi examinada; screen preserva os traços luminosos e suaviza as manchas escuras nas pequenas áreas de sobreposição.

O antigo círculo SVG e os espinhos do hero foram substituídos na apresentação pelos novos PNGs. Os assets SVG permanecem disponíveis. O desgaste lateral anterior fica atenuado na região superior, para reduzir a soma de padrões; volta à presença anterior abaixo dessa transição. O sigilo SVG do topo fica oculto, pois a moldura já traz um símbolo central.

Os URLs e opacidades ficam nas variáveis `--hero-frame-overlay`, `--hero-organic-overlay`, `--hero-frame-opacity` e `--hero-organic-opacity` no início de `assets/homepage-dark-hero.css`, facilitando testar outros assets.

Capturas finais, examinadas visualmente:
- `.playwright-mcp/homepage-dark-v6-desktop-1440x900.png`
- `.playwright-mcp/homepage-dark-v6-mobile-390x844.png`

Captura intermediária de comparação: `.playwright-mcp/homepage-dark-v6-blend-normal-check.png`. Verificadas larguras de 320, 390, 700, 768, 1050 e 1440 px; sem overflow horizontal, controles com pelo menos 44px, fotografia sem filtros e camadas decorativas sem bloquear cliques. Console sem erros/avisos.

Alterados: `assets/homepage-dark-hero.css`, `README.md` e este documento. HTML, fotografias, logo e arquivos do Shop preservados. Os novos overlays são deliberadamente discretos; o desenho de origem ainda é denso e pode ser substituído após revisão.

Execute `node dev-server.mjs` e abra http://127.0.0.1:4173/homepage-dark-hero.html. O servidor de validação foi encerrado após as capturas.

## Histórico — refinamento 05

A versão atual usa temporariamente `references/portrait_original_update.png`, fornecida pelo usuário, com dimensões 1122 × 1402. O arquivo original permanece disponível e nenhum dos dois assets foi regravado. A troca está no `src` do retrato em `homepage-dark-hero.html`.

O blur CSS e a variável de suavização foram removidos. A imagem agora usa `filter: none`. Mantivemos a escala, a posição pelo topo e as dimensões do enquadramento da V4, preservando rosto, vela, mão e crânio em desktop e mobile.

Os fades laterais usam etapas graduais de transparência até o centro opaco; a base começa a desaparecer aos 80% da altura. As máscaras elípticas continuam suavizando os cantos e preservando a área da mão. Não há overlay escuro uniforme sobre o centro.

Alterados nesta rodada: `homepage-dark-hero.html`, `assets/homepage-dark-hero.css`, `README.md` e este documento. Logo, ornamentos, Shop e seções inferiores foram preservados.

Capturas Playwright examinadas visualmente:
- `.playwright-mcp/homepage-dark-v5-desktop-1440x900.png`
- `.playwright-mcp/homepage-dark-v5-mobile-390x844.png`

Execute `node dev-server.mjs` e abra http://127.0.0.1:4173/homepage-dark-hero.html. O servidor de validação foi encerrado após a revisão.

## Histórico — refinamento 04

Rodada restrita ao hero, comparada visualmente com `assets/exemplos/base inicial.png`. A referência não foi recortada nem usada como fundo. O HTML, as seções inferiores e o Shop foram preservados.

Execute `node dev-server.mjs` na raiz e abra http://127.0.0.1:4173/homepage-dark-hero.html. A raiz continua sendo o Shop. O servidor usado na validação é encerrado após as capturas.

## Fotografia e enquadramento

Em desktop 1440 × 900, a largura da fotografia passou de aproximadamente 853 para 702 px: a personagem fica cerca de 18% menor. A imagem ocupa 56% do hero, com margem direita de 12%, e continua por trás da navegação. O alinhamento vertical passa a ser pelo topo. A altura mínima do hero aumenta de 600 para 640 px para acomodar a mão e o suporte da vela sem ampliar a personagem.

As máscaras lineares atuam em faixas estreitas das bordas. Uma máscara elíptica dissolve os cantos; outra elipse preserva a região inferior esquerda, onde está a mão. O overlay escuro sobre a fotografia foi removido. Isso expõe mais do crânio, da vela ao fundo e do ambiente, preservando a integração com o preto.

No mobile, a proporção da área fotográfica passa de 1440/1600 para 1440/1710, mostrando mais da cena vertical. Em 390 × 844, a mão e o suporte da vela aparecem e os dois botões permanecem no viewport. Em telas intermediárias, a composição continua lado a lado e o crop se adapta à altura disponível.

## Suavização do ruído

A apresentação usa apenas `filter: blur(.45px)` em desktop e `.28px` em mobile. É uma suavização pequena, reversível e comparada diretamente com a versão sem filtro. Reduz a aspereza do ruído fino, mas não substitui uma redução de ruído fotográfica seletiva; algum grão permanece. Nenhum ajuste de sépia, saturação ou brilho foi acrescentado. A textura CSS adicional fica no lado do texto, fora do centro da fotografia.

O arquivo `portrait_original.webp` não foi regravado. Para comparar no navegador, altere temporariamente `--portrait-softening` para `0px` em `.home-portrait`. O modo Original do Shop não foi alterado.

## Ornamento e ramificações

`assets/hero-arcanum.svg` introduz um círculo interrompido, anel pontilhado, crescente, marcas de eixo e pequenas raízes em bronze envelhecido. A camada ganhou presença atrás do logo. No desktop, é independente do recorte de transparência do PNG; no mobile, acompanha o bloco do logo. O arquivo `logo3.png` permanece intacto.

`assets/hero-thorns.svg` acrescenta hastes curvas, bifurcações secas, pequenos espinhos e variações de espessura/opacidade. Essa linguagem também aparece nos ramos do círculo. A nova camada se limita às laterais do hero, com escalas e deslocamentos distintos. A textura do restante da página permanece igual à rodada anterior.

O fundo continua preto, o calor vem da fotografia original e o bronze fica nos detalhes. Os símbolos anteriores do topo e da direita foram preservados.

## Arquivos desta rodada

Alterados:
- `assets/homepage-dark-hero.css`
- `README.md`
- `HOMEPAGE_DARK_HERO.md`

Criados:
- `assets/hero-arcanum.svg`
- `assets/hero-thorns.svg`
- capturas listadas abaixo

`homepage-dark-hero.html` não foi alterado nesta rodada. Nenhuma seção nova, publicação ou push.

## Validação com Playwright MCP

Capturas finais examinadas junto à referência:
- `.playwright-mcp/homepage-dark-v4-desktop-1440x900.png`
- `.playwright-mcp/homepage-dark-v4-mobile-390x844.png`
- `.playwright-mcp/homepage-dark-v4-desktop-1440x900-full.png`

Comparação do filtro na região fotográfica:
- `.playwright-mcp/homepage-dark-v4-photo-unsoftened.png`
- `.playwright-mcp/homepage-dark-v4-photo-softened.png`

Verificadas larguras de 320, 390, 700, 768, 1050 e 1440 px: sem overflow horizontal ou imagens quebradas; controles da navegação e do hero com pelo menos 44 px de altura. Skip link e foco no conteúdo funcionaram. Console sem erros ou avisos. Captura adicional: `.playwright-mcp/homepage-dark-v4-tablet-check.png`.

As capturas V3 permanecem disponíveis para comparação. O navegador usa barra de rolagem tradicional; capturas completas podem ter largura útil 15 px menor que o viewport configurado.

## Limites e próximos ajustes

O crânio está mais exposto, mas já é escuro e desfocado na fotografia original. Máscaras não recuperam detalhes ausentes. A referência apresenta outra nitidez e tratamento fotográfico; aproximar esse aspecto exigiria uma fonte de melhor qualidade ou tratamento seletivo dedicado, com revisão visual. A suavização atual é deliberadamente discreta para preservar rosto, tecido e atmosfera.

O logo fornecido tem formas e proporções diferentes do lettering conceitual. As novas ramificações aproximam sua linguagem, mas o desgaste vetorial ainda é mais limpo que a textura irregular do mockup. O crop de tablet pode receber ajuste óptico após revisão. Outros motores de navegador ainda não foram examinados. As seções inferiores continuam no estágio anterior.
