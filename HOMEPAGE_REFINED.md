# La Likbør — black-dominant homepage refinement

Open http://127.0.0.1:4173/homepage-refined.html. If the local server is stopped, run `node dev-server.mjs` from the project root.

## Changes

- `homepage-refined.html` preserves the logo 3 composition and imports the additional, scoped `assets/homepage-refined.css`.
- The body and page frame use pure black (`#000`). Large brown radial glows are removed. Cards use neutral charcoal (`#070707` to `#010101`), and secondary text uses neutral grey rather than brown.
- Bronze is retained as an accent on frames, fine rules, corners and small typographic details. Border highlights and side scratches are more restrained.
- Intersecting horizontal and vertical CSS masks dissolve all four photographic edges. Black gradient overlays soften the corners, left edge and bottom. The hero's visible straight borders are removed.
- The portrait is still the original WebP, without a CSS colour filter or file modification. Its candlelight and illuminated face retain their natural warmth; surrounding areas recede into black. Mask stops differ on mobile to preserve the face and candle.
- The lower atmospheric SVG remains, under a black veil that reduces its brown haze.

## Review

Playwright screenshots, visually compared with the previous logo 3 study:

- `.playwright-mcp/homepage-refined-desktop-1440x900.png`
- `.playwright-mcp/homepage-refined-mobile-390x844.png`
- `.playwright-mcp/homepage-refined-desktop-1440x900-full.png`
- `.playwright-mcp/homepage-refined-mobile-390x844-full.png`

Responsive checks at 320, 390, 700, 768, 1050 and 1440px found no horizontal overflow or broken images. Keyboard skip navigation and section links worked. The homepage console had no warnings or errors. Mask support was verified in the Playwright browser; other browser engines have not been tested.

SHA-256 comparisons confirmed the original logo, portrait, previous homepage, shared styles and Shop entry point remained unchanged. No publishing or push was performed.
