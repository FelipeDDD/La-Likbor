# La Likbør — homepage logo comparison

## Open locally

From the project root, run `node dev-server.mjs` if the preview server is not already running.

- Logo 1: http://127.0.0.1:4173/homepage-logo-1.html
- Logo 3: http://127.0.0.1:4173/homepage-logo-3.html
- Existing Shop: http://127.0.0.1:4173/index.html

Both pages are standalone HTML and use `assets/homepage-tests.css` after importing the existing `assets/styles.css`. No framework, additional dependency or homepage JavaScript is required.

## Composition

- The original Laura/candle photograph is loaded directly from the supplied reference folder. Its file is unchanged. The hero uses responsive framing and CSS fades into black, without a colour filter.
- The supplied transparent `assets/exemplos/logo1.png` and `logo3.png` are displayed directly as graphic assets, without tracing, recolouring or editing the files.
- The PNGs are both 2172 × 724, but their visible artwork occupies different widths. CSS accounts for the transparent gutters to display both at the same visible width: 490px on desktop, 305px at the 390px mobile viewport used for review.
- Both versions share the exact same logo container, hero height, text position, photograph and navigation. Logo 3 is vertically centred inside the common container because its artwork is slightly shorter.
- The existing palette, page frame, SVG scratches, grain, bronze gradients, corner ornaments and section dividers are reused unchanged. Homepage-specific rules are isolated in the new stylesheet.
- The desktop logo occupies the left side, away from the face and candles. On mobile it sits above the portrait within the hero. The portrait is capped at 440px for wider phones and narrow tablets.
- Archive and About links navigate to preview sections on the same page. Shop links open the existing Shop. Archive cards are typographic previews, pending approved content and photography; they do not copy conceptual images from the mockups.

## Visual recommendation

Logo 3 is the stronger candidate for this composition: its branches spread more evenly around the lettering, the outline is more balanced and the shorter silhouette reads better on mobile. Logo 1 has greater vertical drama and more pronounced descending roots; it remains a valid alternative for a more imposing presentation.

Both are detailed raster assets. For production, prepare optimised transparent exports with trimmed margins and review the visibility of the ø at smaller sizes. A professionally refined vector master would help future print applications and very large displays. The originals are deliberately preserved for this comparison.

The tests reproduce the hero's visual language, not the complete homepage mockup. The lower archive previews still need real content and approved images. A final choice can also benefit from small optical adjustments to logo spacing and portrait fades after review.

## Validation

Playwright checked both pages at 1440 × 900 and 390 × 844. Additional responsive checks covered 320, 700, 768 and 1050px widths. Images loaded; there was no horizontal overflow. Keyboard skip navigation, in-page links and links to the Shop worked. Interactive links have at least 44px height. The two variants have identical hero, logo-container and introduction coordinates at the target viewport sizes.

SHA-256 comparisons confirmed that `index.html`, `assets/styles.css`, `assets/shop.js`, `assets/products.js`, both supplied logos and the portrait remained unchanged. No publishing or push was performed.

Viewport screenshots:

- `.playwright-mcp/homepage-logo-1-desktop-1440x900.png`
- `.playwright-mcp/homepage-logo-1-mobile-390x844.png`
- `.playwright-mcp/homepage-logo-3-desktop-1440x900.png`
- `.playwright-mcp/homepage-logo-3-mobile-390x844.png`

Full-page screenshots are available with the same names, adding `-full` before `.png`.
