# La Likbør — Brief de Design e Desenvolvimento

## Objetivo
Um site autoral em inglês que une **arquivo pessoal** e **loja de peças selecionadas**, com peso semelhante. Temas: black metal underground, misticismo/ocultismo, fotografia e viagens/natureza, arquivo editorial. Protótipo visual, ainda sem compras ou backend.

## Referências visuais neste pacote
- `references/home_reference.png`: direção visual principal, sobretudo o HERO com retrato grande, lettering black-metal de alto impacto, fundos escuros, textura nas laterais, molduras envelhecidas e tipografia clara.
- `references/shop_reference.png`: aparência almejada de página de catálogo: cabeçalho atmosférico, card grid, divisórias, molduras e ornamentos. ATENÇÃO: as fotografias/produtos deste mockup são conceituais e NÃO representam fielmente os anúncios.
- `references/product_reference.png`: página de detalhe conceitual e controle Styled/Original; textos, mercadorias e dados NÃO são confiáveis como cadastro.
- `references/shop_current.html`: protótipo HTML funcional existente com SEIS itens reais (nomes, URLs do Vinted, fotos originais carregadas remotamente, preços na ocasião), filtro por categoria, Styled/Original e modal da foto original. Esse arquivo é a base de implementação, não os mockups.
- `references/portrait_original.webp`: fotografia original compartilhada para o projeto; não deve ser recriada como pessoa sintética. Usar apenas com autorização da titular antes de publicar.

## Direção de arte
- 70% energia visual do conceito cinematográfico/black-metal (home), 20% editorial/minimalista (interiores), 10% detalhes ocultistas envelhecidos.
- Paleta sugerida: background #080807 ou #090807; superfícies #12100F; marfim #DED2C2; bronze/dourado antigo #A78A65; cinza #9D9288. O dourado não deve parecer metal reluzente.
- Marca: `La Likbør`. Tratar `ø` corretamente (não substituir por `o`). Identidade dupla: lettering expressivo no hero e wordmark serifado, limpo e legível na navegação. O logo black-metal mostrado no mockup é parte da imagem conceitual, NÃO existe como arquivo isolado. Não recortar cegamente nem afirmar que ele foi reproduzido como SVG. Usar placeholder honesto e definir etapa futura para criação de logo apropriado.
- Texturas discretas de xerox, desgaste, riscos verticais nas bordas, grain e vinheta. Centro da página e conteúdo crítico precisam permanecer legíveis.
- Molduras: bordas 2–3px com gradiente sutil e variações de bronze, borda interna, pequenas irregularidades e cantos ornamentais. Preferir CSS + SVG pequeno reutilizável. Evitar um único PNG esticado que distorça nas diferentes alturas.
- Separadores de seção e rodapé devem compartilhar elementos do design system.
- Fotos do catálogo: conservar material real do Vinted, inclusive fundos originais; não recriar produto nem inventar cenários, sombras na roupa, cor da peça ou detalhes. O tratamento Styled atua em CSS/camadas decorativas e é reversível. Original deve aparecer sem filtros, overlays ou alteração cromática. Ampliação mostra foto original sempre.
- Cards usam proporções estáveis (ex. 3:4), `object-fit: contain` por padrão; o painel/fundo se adapta ao enquadramento. Não cortar detalhes das roupas, discos nem óculos. Testar fotos verticais, horizontais e quadradas.
- Possibilidade de intensidade Styled (soft/strong) é desejável, mas manter UI simples e fácil de testar.
- Layout desktop com grid 3 colunas inicialmente, responsivo tablet/celular (2 ou 1 coluna conforme legibilidade). Cuidado com peso dos overlays e scroll no mobile.

## Escopo da iteração inicial
1. Inspecionar o HTML e os recursos; identificar o que existe e o que não pode ser reproduzido literalmente.
2. Refatorar o HTML existente apenas na medida necessária para reusar estilos (tokens, `page-frame`, `ornate-card`, `texture-layer`, `section-divider`). Não reescrever a funcionalidade desnecessariamente.
3. Implementar texturas laterais, molduras decorativas com gradiente, ornamentos e cabeçalho Shop mais próximo da referência.
4. Intensificar Styled de maneira controlável, mantendo Original correto, e os seis anúncios e fotografias como dados de demonstração.
5. Preservar filtros, modal, teclado/ESC, responsividade e URLs originais, sem scraping/integração com Vinted. Se hotlinks falharem, indicar erro e link, sem fabricar foto substituta.
6. Entregar instruções locais para rodar, resumo de mudanças e capturas desktop/mobile se a ferramenta de browser estiver disponível.

## Fora de escopo, por enquanto
- Backend, CMS, inventário de verdade, checkout, Stripe, PayPal, autenticação, integração Vinted ou migração automática.
- Publicação de loja real ou textos de venda não confirmados.
- Copiar mockups gerados como imagens inteiras de fundo ou como se fossem screenshots de um site real.

## Critérios de aceitação
- Aspecto visual perceptivelmente mais rico que `shop_current.html`, sem perder clareza na grade.
- Texturas laterais e bordas funcionam em qualquer comprimento de página, sem sobrepor conteúdo, inclusive no celular.
- Produtos reais e fotos permanecem iguais; Original mostra cores/detalhes verdadeiros.
- Não há botões enganosos de pagamento: o protótipo deve ser identificado como demonstração.
- Recursos reutilizáveis para páginas futuras; arquivos e instruções organizados.
