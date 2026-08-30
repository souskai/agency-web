# Shape Dividers

Shape dividers in this project are **inline SVG React components** living in
`src/components/ShapeDivider/`, not static files. Inline SVG is required so the
divider's `fill="currentColor"` follows the active `data-theme` (light/dark) and
the section's own background colour.

`public/dividers/` is reserved only if you ever need a static `url()` divider
with a hard-coded fill. Prefer the inline variants: `wave`, `tilt`, `curve`,
`zigzag`, `arc`.

Generated art (OpenRouter / MiniMax output) belongs in `public/backgrounds/`.
