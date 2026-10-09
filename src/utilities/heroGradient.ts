import type { Post } from '@/payload-types'

/**
 * Deterministic post-hero gradient assignment.
 *
 * Gradients are a decoupled family (see `globals.css` → `.hero-grad-*`), so site
 * theme changes never invalidate them. The pick is seeded on a stable per-doc
 * value (post `slug`) so the same post always renders the same gradient — on its
 * card and its detail hero — and the future `/og` route recomputes the identical
 * key from the same seed.
 */
export const HERO_GRADIENT_KEYS = [
  'hero-grad-1',
  'hero-grad-2',
  'hero-grad-3',
  'hero-grad-4',
  'hero-grad-5',
] as const

export type HeroGradientKey = (typeof HERO_GRADIENT_KEYS)[number]

/** Pick a stable gradient class for a given seed. */
export function pickHeroGradient(seed: string | number): HeroGradientKey {
  return HERO_GRADIENT_KEYS[hashToIndex(String(seed))]
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

/** FNV-1a — small, deterministic, spread evenly over the key list. */
function hashToIndex(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) % HERO_GRADIENT_KEYS.length
}