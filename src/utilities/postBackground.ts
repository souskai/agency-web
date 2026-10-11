import type { Post } from '@/payload-types'
import type { BackgroundPresetKey } from '@/components/BackgroundLayers/registry'

/**
 * Order-cycled post backgrounds.
 *
 * Posts cycle through the SectionShell mesh-gradient family in list order:
 * post 1 → mesh-aurora, 2 → mesh-tide, 3 → mesh-sunrise, 4 → mesh-dusk,
 * 5 → radial-vignette, and post 6 wraps back to mesh-aurora. The pick is driven
 * by the list position (not the slug), so the same index always yields the same
 * background while the palette stays one shared, theme-aware set (no bespoke
 * colour family).
 */
export const POST_BACKGROUNDS: Array<Exclude<BackgroundPresetKey, 'none'>> = [
  'mesh-aurora',
  'mesh-tide',
  'mesh-sunrise',
  'mesh-dusk',
  'radial-vignette',
]

/** Stable background for a zero-based list index (wraps after the 5th). */
export function postBackgroundForIndex(index: number): Exclude<BackgroundPresetKey, 'none'> {
  const n = POST_BACKGROUNDS.length
  return POST_BACKGROUNDS[((index % n) + n) % n]
}

/** First category `slug` (drives the decorative icon); unknown/missing → undefined. */
export function primaryCategorySlug(categories: Post['categories']): string | undefined {
  if (!categories) return undefined
  for (const category of categories) {
    if (typeof category === 'object' && category !== null && category.slug) {
      return category.slug
    }
  }
  return undefined
}