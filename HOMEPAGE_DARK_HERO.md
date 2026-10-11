# La Likbør — dark hero study 02

Preview: http://127.0.0.1:4173/homepage-dark-hero.html

Run `node dev-server.mjs` from the project root if the local server is stopped.

## Photographic balance

The original portrait, crop and main logo are retained. The radial black veil is removed. Desktop mask opacity now reaches full visibility at 17% horizontally instead of 27%, and 6% vertically instead of 13%. The fully visible bottom extends to 91% instead of 77%. The bottom overlay begins at 83% instead of 68%, and its maximum black opacity falls from 100% to 60%. On mobile, horizontal fades narrow from 18% to 10% on the left and from 18% to 8% on the right; bottom masking begins at 90% instead of 76%. The face, front candle, hand and room therefore remain much more visible. All edges still dissolve into black. No colour filter or photo-file edit is used.

## Ornaments and typography

The small header wordmark is removed. A thin bronze SVG sigil takes its place on desktop, with the same asset used in the divider and rotated 180° at the right. Its long stem, eight-point intersection, interrupted strokes and tonal variations follow the reference's fine ornamentation. A broken orbit and crescent sit subtly behind the existing logo, recalling the reference's circular emblem. These are independent vector assets, not crops from the mockup.

Hero copy, navigation and side text use warm ivory/light bronze, regular serif weight, more deliberate tracking and line spacing. Side scratches are stronger, with additional edge-only abrasion; the photograph and logo are kept clear of these overlays. Black remains dominant, and the lower content sections retain their markup and styling from the previous version.

## Validation and screenshots

Playwright checked 320, 390, 700, 768, 1050 and 1440px widths: no horizontal overflow, broken images or links below 44px height. Keyboard skip navigation and section links worked. The homepage console had no warnings or errors. The portrait reports `filter: none`, the logo remains `assets/exemplos/logo3.png`, and the right symbol's 180° transform was verified on desktop. The side text/symbol is hidden on narrow layouts as before.

- `.playwright-mcp/homepage-dark-hero-desktop-1440x900.png`
- `.playwright-mcp/homepage-dark-hero-mobile-390x844.png`
- `.playwright-mcp/homepage-dark-hero-desktop-1440x900-full.png`
- `.playwright-mcp/homepage-dark-hero-mobile-390x844-full.png`

Created: `homepage-dark-hero.html`, `assets/homepage-dark-hero.css`, `assets/hero-sigil.svg`, `assets/hero-orbit.svg`, this document and the screenshots. Existing source files and assets were not edited. No publishing, push or formal/brown variant.
