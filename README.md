# La Likbør

Site estático pessoal e Shop, sem framework ou etapa de build.

## Versões prontas para revisão

- V1 Dark: [`home-dark.html`](home-dark.html) e [`shop-dark.html`](shop-dark.html).
- V2 Warm Gothic: [`v2/index.html`](v2/index.html) e [`v2/shop.html`](v2/shop.html).
- Ambas incluem Archive, Photography, Media/Music, About e o artigo Top 10 demonstrativo.
- A V2 usa Styled / Strong no Shop; a Dark mantém Ritual. As galerias continuam oferecendo Original.

Com o servidor na porta 4174, abra <http://127.0.0.1:4174/home-dark.html> ou <http://127.0.0.1:4174/v2/index.html>.
Use o servidor local para carregar as máscaras SVG corretamente. Estudos e capturas permanecem disponíveis localmente, fora deste checkpoint.
Para conferir dependências das duas versões e as tags históricas preservadas: `node v2/tools/audit-v2.mjs`.

## Páginas atuais

- **Homepage dark aprovada:** [`homepage.html`](homepage.html).
- **Shop:** [`index.html`](index.html), com seis produtos, filtros de categoria, Styled / Original e intensidades Soft, Strong e Ritual.
- **Home Dark integrada, para revisão:** [`home-dark.html`](home-dark.html), cópia visual da homepage aprovada com links para o Shop Dark.
- **Shop Dark consolidado:** [`shop-dark.html`](shop-dark.html), banner B com Laura, Ritual inicial, 12 produtos e galerias com 54 fotografias reais.
- **Archive Dark, em revisão:** [`archive-dark.html`](archive-dark.html), com Photography, Collections, Records, Objects e Media.
- **Artigo demonstrativo:** [`records-ten-remain.html`](records-ten-remain.html), Top 10 com seleção provisória, sem atribuir preferências à Laura.
- **About Dark, em revisão:** [`about-dark.html`](about-dark.html), retrato existente e apresentação neutra do projeto.

Home, Archive, Shop e About Dark agora compartilham os destinos do menu e o rodapé discreto “Personal Archive”. Os quatro cards da Home levam às seções correspondentes do Archive. Dados editáveis do artigo e vídeo: `assets/archive-content.js`. Instruções, pendências e capturas: [`ARCHIVE_ABOUT_DARK.md`](ARCHIVE_ABOUT_DARK.md). Esta rodada editorial não foi commitada nem enviada ao remoto.

Os arquivos `homepage.html` e `index.html` e a entrada `/` permanecem preservados. Para revisar Home ↔ Shop Dark, abra `home-dark.html`. Esta dupla usa o catálogo e controles compartilhados, sem copiar dados. O Shop original continua limitado aos seis produtos iniciais. Relatório e lista do próximo commit: [`SHOP_DARK_RELEASE_REVIEW.md`](SHOP_DARK_RELEASE_REVIEW.md).

A homepage foi consolidada a partir de `homepage-dark-wear-scattered.html`, incluindo o novo logo, desgaste com remoções irregulares, cruz invertida detalhada e botões em bronze discreto. Sua aparência foi preservada. O nome anteriormente indicado como base no README era `homepage-dark-frame-consolidated.html`.

Tipografia selecionada: Georgia no menu, hero e informações secundárias dos produtos; EB Garamond nos quatro cards, título Recent Pieces, nomes/preços e rodapé. O texto completo de Of a Darker World segue a referência. Regras em `assets/homepage-typography.css`, com a fonte e licença em `assets/fonts/eb-garamond/`.

## Executar localmente

Com Node.js disponível, no PowerShell, dentro desta pasta:

```powershell
$env:PORT = '4174'
node dev-server.mjs
```

- Homepage: <http://127.0.0.1:4174/homepage.html>
- Shop: <http://127.0.0.1:4174/index.html>
- Home integrada: <http://127.0.0.1:4174/home-dark.html>
- Shop Dark: <http://127.0.0.1:4174/shop-dark.html>

Encerre com Ctrl+C. Sem `PORT`, o servidor usa 4173. A raiz `/` continua abrindo o Shop. O servidor desativa cache; use Ctrl+F5 caso uma aba antiga mantenha estilos anteriores.

## Arquivos ativos

Photography tem página própria em `photography-dark.html`, acessível pela capa do Archive e pelo card da Home. Usa 52 fotos selecionadas do Instagram e o arquivo local “Retrato gótico”, totalizando 53 imagens, com quatro categorias e nove galerias. Portraits tem nove fotos e usa o retrato fornecido como primeira imagem/capa. Dados editáveis em `assets/photography-content.js`; organização, fontes e capturas em [PHOTOGRAPHY_ARCHIVE.md](PHOTOGRAPHY_ARCHIVE.md). Revisão local: <http://127.0.0.1:4175/photography-dark.html>.

- `assets/styles.css`: estilos compartilhados e Shop; importa `assets/photo-treatment.css` com os tratamentos fotográficos.
- `assets/homepage-*.css`: camadas de estilo efetivamente importadas pela homepage, mantidas na ordem atual para preservar o resultado aprovado. Alguns nomes históricos permanecem porque esses arquivos ainda são dependências.
- `assets/homepage-dark-two-layers.css`: fotografia em duas camadas e posicionamento do logo. `assets/homepage-dark-wear-balanced.css` controla a intensidade; `assets/homepage-dark-wear-scattered.css` aplica as remoções irregulares e o acabamento dos botões.
- `assets/photos/portrait_original_update.png`: cópia byte a byte da fotografia tratada aprovada, independente do pacote inicial.
- `assets/brand/La Likbør em Tipografia Oculta.png`: logo atual, sem alteração do asset.
- `assets/bordas/dark-frame-consolidated/` e `assets/masks/`: sistema de desgaste utilizado pela página.
- `assets/placeholders/`: imagens atuais de Photography, Collections, Favorite Music, Objects e Of a Darker World.
- `assets/products.js`: dados e links dos produtos, compartilhados com Recent Pieces. As fotos de produtos continuam hospedadas no Vinted.
- `assets/shop.js`, `assets/homepage-recent-pieces.js` e `assets/homepage-recent-ritual.js`: controles do Shop, ampliação Original e tratamento da prévia na homepage.

## Estudos e limpeza do Git

As páginas anteriores, screenshots, referências, pacotes ZIP, ferramentas antigas e assets sem referência nas páginas atuais permanecem **no disco**, mas estão ignorados em `.gitignore`. Os arquivos antigos já rastreados foram retirados somente do índice do Git; não foram apagados localmente. A documentação cronológica anterior está em `VERSION_HISTORY.md`, também local e ignorada.

Para comparar localmente, a versão recém-aprovada continua em <http://127.0.0.1:4174/homepage-dark-wear-scattered.html>. Esses estudos e suas dependências antigas não fazem parte de um novo clone. A limpeza não remove arquivos de commits anteriores do histórico.

## Verificação

```powershell
node tools/audit-site-files.mjs
node tools/audit-site-files.mjs home-dark.html shop-dark.html index.html
git status --short
git diff --cached --stat
```

A auditoria percorre as referências locais declaradas em HTML, CSS, SVG e imports, incluindo as duas páginas atuais. Deve retornar `missing: []`. Seu campo `unusedAssets` mostra candidatos fora dessa árvore; URLs de produtos criadas em JavaScript continuam externas. Ao adicionar novos assets, confira as regras de `.gitignore`.

Revise homepage em desktop 1440 × 900 e mobile 390 × 844, navegação e ampliação Original em Recent Pieces. No Shop, confira seis produtos, categorias, Styled / Original, Soft / Strong / Ritual e modal sem filtros. Nenhum commit, push ou publicação foi feito na consolidação.

Validação da consolidação: screenshots Playwright da página completa idênticos aos da versão aprovada em desktop e mobile; 77 arquivos locais respondendo HTTP 200; nenhuma dependência ativa ignorada. Modal Original sem filtros e com `object-fit: contain`; Shop com seis produtos, Ritual, Original e filtro Records funcionando. Capturas locais: `.playwright-mcp/consolidated-current-desktop.png` e `.playwright-mcp/consolidated-current-mobile.png`.
