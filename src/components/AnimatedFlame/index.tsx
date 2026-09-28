import React from 'react'

import { cn } from '@/utilities/ui'

/**
 * Rest frame — identical to the 100% keyframe in `globals.css`, so the one-shot
 * morph lands exactly on this path whichever way the animation resolves.
 *
 * Two subpaths: the outer flame, plus the inner ember as a true cut-out
 * (`fillRule="evenodd"`), so the mark reads correctly on any background instead
 * of painting a fake hole with `var(--background)`.
 */
const FLAME_BODY =
  'M 12.4 1.7 C 12.9 5.8 15.4 8.1 17.1 10.5 C 18.6 12.6 19.4 14.4 19.4 16.2 C 19.4 19.9 16.1 22.4 12 22.4 C 7.9 22.4 4.6 19.9 4.6 16.2 C 4.6 13.3 6.2 12 7.1 9.8 C 7.6 8.6 7.7 7.2 7.3 5.9 C 7.1 5.2 7.6 4.5 8.3 4.7 C 9.6 5 10.7 5.7 11.5 6.6 C 11.5 4.7 11.7 3 12.4 1.7 ZM 11.9 12 C 12.3 13.2 13.1 13.9 13.1 15.3 C 13.1 16.8 12.6 17.7 11.8 17.7 C 11 17.7 10.5 16.8 10.5 15.3 C 10.5 13.9 11.3 13.2 11.9 12 Z'

interface Props {
  /** Position/size/colour, e.g. `size-6 text-brand-500 lg:size-7 dark:text-brand-400`. */
  className?: string
  /** Accessible name. Omit for fully decorative usage (then aria-hidden). */
  title?: string
}

/**
 * Brand flame mark with a continuous idle path morph (the keyframes live in
 * `globals.css` under `@layer utilities` as `.flame-flicker`).
 *
 * The animation is a closed 2.6s cycle — 0%/35%/70%/100% of rest → flare →
 * pinch → rest — so it wraps seamlessly with no snap. Every keyframe path is an
 * anisotropic scaling of this rest path about the flame's base (12, 22.4), so
 * they share an identical command structure and CSS can interpolate them.
 * Firefox has no `d` support and `prefers-reduced-motion` disables the
 * animation, so the mark falls back to this rest silhouette untouched.
 *
 * Presentation-only — no client JS, no dependencies; the morph is pure CSS.
 */
export const AnimatedFlame: React.FC<Props> = ({ className, title }) => {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      aria-label={title}
      className={cn('shrink-0', className)}
      fill="none"
      role={title ? 'img' : undefined}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className="flame-flicker" d={FLAME_BODY} fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}

AnimatedFlame.displayName = 'AnimatedFlame'
