# La Likbør — proposta de identidade 01

Estudo independente do Shop. O mockup original da homepage e os cinco exemplos em `assets/exemplos` foram examinados como referências de direção visual. Nenhum lettering foi extraído, recortado ou traçado sobre uma captura.

## Propostas e arquivos

| Estilo | Marfim envelhecido `#DED2C2` | Bronze fosco `#A78A65` |
| --- | --- | --- |
| Principal — Black Metal | `la-likbor-black-metal-ivory.svg` | `la-likbor-black-metal-bronze.svg` |
| Secundário — Gothic Editorial | `la-likbor-editorial-ivory.svg` | `la-likbor-editorial-bronze.svg` |

Todos os arquivos têm fundo transparente e contornos vetoriais, sem PNG, fotografia, fonte externa ou elemento SVG `<text>` embutido. O título acessível é exatamente **La Likbør**, com o `ø` U+00F8. As versões de cor mantêm a mesma geometria.

### Principal — Black Metal

Base de oito letras desenhadas especificamente para esta proposta (`L`, `a`, espaço, `L`, `i`, `k`, `b`, `ø`, `r`), com contornos de inspiração blackletter, hastes fendidas, raízes curvas afiladas e espinhos. O traço diagonal do `ø` é uma forma separada e explícita. Pequenas fissuras transparentes dão desgaste ao marfim, sem filtro bitmap. A composição tem `viewBox="0 0 1040 440"` e margem para os ramos.

É uma primeira interpretação, mais legível e menos orgânica/emaranhada que os mockups. A densidade das raízes, o ritmo entre hastes e a naturalidade dos contornos ainda devem ser refinados artisticamente antes de aprovar a marca definitiva. Os ramos são construídos de curvas amostradas em contornos vetoriais determinísticos; isso preserva a escalabilidade, mas não substitui o gesto de um lettering final desenhado à mão.

Recomendação inicial: 480–550 px em desktop e pelo menos 280 px em mobile. Abaixo disso, detalhes dos espinhos se tornam muito finos; use o secundário. O tamanho mínimo ainda precisa de aprovação visual, principalmente para impressão. Não há monograma ou favicon de marca nesta rodada.

### Secundário — Gothic Editorial

Assinatura serifada clássica a partir dos contornos de Garamond disponível neste ambiente Windows. É a vertente editorial da direção gótica, deliberadamente simples, coerente com o uso de serifa no Shop. Preserva a grafia e a barra do `ø` da fonte. Os glifos foram convertidos em curvas: não é necessário ter Garamond instalado para visualizar os SVGs. Nenhum arquivo de fonte foi copiado para o projeto.

Aplicações demonstradas em 290, 230, 180 e 110 px. Use em navegação, rodapés e páginas internas; a implementação no Shop não foi feita.

## Página de teste local

Na raiz do projeto:

```powershell
node dev-server.mjs
```

Abra **http://127.0.0.1:4173/logo-lab.html**. Se o servidor já estiver nessa porta, basta abrir o endereço. A sessão existente na porta 4173 foi reaproveitada durante esta tarefa, sem interrompê-la.

A página usa `logo-lab.css` e `logo-lab.js`, exclusivos deste estudo. Mostra os dois logos sobre preto e sobre dois enquadramentos da fotografia original `portrait_original.webp`. A fotografia não foi regravada: o escurecimento é apenas uma camada CSS de aplicação para contraste. Ela continua um recurso para avaliação local; nenhuma publicação foi realizada.

Os botões Marfim/Bronze atualizam todas as amostras e os links de download. Ver transparência alterna o quadriculado somente nas amostras de fundo preto. Abaixo há testes reduzidos de escala.

## Estrutura para um asset futuro

`manifest.json` registra os dois papéis, suas variantes e o estado `proposal`. Os nomes de arquivo são independentes da homepage e do Shop. Um futuro lettering final pode substituir a família `la-likbor-black-metal-*.svg`, preservando as URLs e a interface de apresentação `data-logo="black-metal"`. Se o novo desenho tiver outra proporção, ajuste seu `viewBox` e revise a escala na página de teste. Para outro formato de arquivo, atualize o mapeamento de URLs no script do estudo.

Esta proposta não é uma reprodução exata do lettering dos mockups. Não há bitmap gerado por IA ou SVG que encapsule uma imagem rasterizada.

## Fontes técnicas do desenho

- `build-black-metal.mjs`: glifos desenhados, posições, curvas de ramificação, cortes transparentes e exportação das duas cores. Executar `node assets/brand/build-black-metal.mjs` a partir da raiz recria os SVGs principais.
- `build-editorial.ps1`: converte a assinatura a partir da Garamond local em curvas e exporta as duas cores. O script requer Windows com essa família instalada, somente para reconstruir os arquivos. Para uma máquina que permite scripts locais, executar `./assets/brand/build-editorial.ps1`. Nesta sessão, o mesmo código foi executado como script block de PowerShell, sem alterar a política de execução do sistema.

Os SVGs entregues já estão prontos para visualização, sem necessidade de executar os geradores. Alterações artísticas podem ser feitas em um editor vetorial; uma nova execução dos geradores substitui os arquivos exportados.

## Verificação com Playwright MCP

- As quatro variantes responderam HTTP 200 e foram decodificadas no navegador.
- Teste de alpha em canvas confirmou pixels transparentes nas bordas e formas visíveis; não há fundos opacos dentro dos assets.
- Inspeção dos SVGs confirmou título exato e ausência de `<image>`, `<text>`, `foreignObject` e scripts.
- Alternância de cor, estado acessível dos botões, download correspondente e transparência passaram.
- Layout conferido em 320, 390, 768 e 1440 px, sem overflow horizontal, com controles de 44 px.
- Inspeção visual sobre preto, quadriculado e fotografia, incluindo os tamanhos menores.
- Os arquivos existentes do Shop foram verificados por SHA-256 ao início e ao final: sem alterações.

Capturas finais na raiz `.playwright-mcp/`:

- `logo-study-desktop-1440x900.png`
- `logo-study-desktop-full.png`
- `logo-study-mobile-390x844.png`
- `logo-study-mobile-full.png`
- `logo-study-bronze-desktop-1440x900.png`
- `logo-study-transparency-desktop.png`

Os arquivos `initial`/`refined` são registros intermediários. Nenhuma homepage, integração com o Shop, publicação ou push foi realizada.
