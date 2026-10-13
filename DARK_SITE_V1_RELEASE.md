# La Likb?r ? Dark Site V1

Estado consolidado em 2026-10-13, antes do desenvolvimento isolado da V2.

## P?ginas e depend?ncias

- Home: home-dark.html; Shop: shop-dark.html.
- Archive: archive-dark.html; Media permanece uma se??o real no Archive.
- Photography: photography-dark.html; 53 imagens, 53 miniaturas, quatro categorias, nove galerias.
- About: about-dark.html; artigo demonstrativo: records-ten-remain.html.
- Cat?logo ?nico: assets/products.js; 12 produtos, 54 fotos, miniaturas em assets/product-thumbnails/.
- Editorial/Media: assets/archive-content.js, assets/archive.js e thumbnail verificada em assets/media/.
- Depend?ncias da V1 auditadas: 260 arquivos, nenhum caminho local ausente. Checksums das 53 fotografias pessoais verificados.

## Valida??o

Playwright: validate-editorial-dark.js (seis p?ginas em 1440/390/320 px, navega??o e links); validate-photography-dark.js (53 imagens, contadores, miniaturas, teclado, originais, foco); validate-shop-dark.js (12 produtos, filtros, seis galerias novas, Styled/Original e intensidade). Nenhum erro JavaScript ou falha de recursos. git diff --check passou. Hovers recentes e navega??o entre sub?lbuns tamb?m foram verificados nos respectivos ajustes.

## Revis?o do staging

Inclu?dos somente p?ginas ativas, depend?ncias, documenta??o e validadores aplic?veis. Capturas, caches e estudos descart?veis est?o ignorados. Os estudos antigos permanecem no disco; vers?es formais index.html/homepage.html e tags anteriores permanecem intactas.

O arquivo fornecido assets/v2/la-likbor-v2-footer.webp pertence ? V2 e fica fora deste commit. Nenhum arquivo desconhecido foi descartado.

## Conte?do ainda provis?rio

Top 10 ? demonstrativo; textos editoriais/About continuam edit?veis e neutros. Night I mant?m t?tulo provis?rio. Playlist, videoclipe e perfis externos conservam os links j? verificados; nenhuma nova biografia foi atribu?da.

Commit autorizado: feat: complete dark site with archive, photography and about
Tag anotada: dark-site-v1. N?o fazer push.
