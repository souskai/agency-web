import React from 'react'

export type BackgroundPresetKey =
  | 'none'
  | 'mesh-aurora'
  | 'grid-fade'
  | 'soft-noise'
  | 'svg-circuit'
  | 'radial-vignette'

/**
 * Dev-only background presets.
 *
 * Each key maps to one or more absolutely-positioned layers rendered behind a
 * section's content (see `SectionShell`). Presets reference named CSS classes
 * in `globals.css` (e.g. `.bg-mesh-aurora`) rather than inline styles, so the
 * Tailwind v4 scanner sees them as static and light/dark theming stays driven
 * by CSS custom properties.
 *
 * To add a look: add a class in `globals.css` under `@layer components`, then
 * map a key here. Editors in the admin panel never see or change these.
 */
export const backgroundPresets: Record<Exclude<BackgroundPresetKey, 'none'>, React.ReactNode> = {
  'mesh-aurora': <div className="absolute inset-0 bg-mesh-aurora" />,
  'grid-fade': <div className="absolute inset-0 bg-grid-fade" />,
  'soft-noise': <div className="absolute inset-0 bg-soft-noise" />,
  'svg-circuit': <div className="absolute inset-0 bg-svg-circuit" />,
  'radial-vignette': <div className="absolute inset-0 bg-radial-vignette" />,
}
