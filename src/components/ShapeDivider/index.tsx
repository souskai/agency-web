import React from 'react'

import { cn } from '@/utilities/ui'

export type DividerVariant = 'wave' | 'tilt' | 'curve' | 'zigzag' | 'arc' | 'none'

type Props = {
  className?: string
  height?: string
  position?: 'top' | 'bottom'
  variant: Exclude<DividerVariant, 'none'>
}

/**
 * SVG paths for each divider variant.
 *
 * Each path is authored for the BOTTOM position: the solid colour fills the
 * TOP of the viewBox and the shape cuts away toward the bottom (the wave /
 * curve / zigzag "reaches" down). A top divider reuses the same path with
 * `rotate-180`, which flips the solid region to the bottom so the shape
 * reaches upward.
 */
const PATHS: Record<Exclude<DividerVariant, 'none'>, string> = {
  wave: 'M0,60 C240,120 480,0 720,30 C960,60 1200,90 1440,30 L1440,0 L0,0 Z',
  tilt: 'M0,0 H1440 L1440,120 L0,0 Z',
  curve: 'M0,0 H1440 V60 C1080,120 360,120 0,60 Z',
  zigzag:
    'M0,0 H1440 L1350,60 L1260,20 L1170,60 L1080,20 L990,60 L900,20 L810,60 L720,20 L630,60 L540,20 L450,60 L360,20 L270,60 L180,20 L90,60 L0,20 Z',
  arc: 'M0,0 H1440 V40 C1440,40 1296,100 1152,50 C1008,0 864,0 720,50 C576,100 432,100 288,50 C144,0 0,0 0,40 Z',
}

/**
 * Dev-only shape divider.
 *
 * Self-contained by design: it is always painted with `currentColor`, which
 * the caller sets to the SECTION'S OWN background colour via `className`
 * (e.g. `text-secondary`). Because the divider only ever references its own
 * section's colour and its own edge, it stays correct no matter how blocks are
 * reordered in the CMS.
 *
 * It overflows the section edge (translate-y-full / -translate-y-full) so the
 * shape visually reaches into the neighbouring section, and is layered at
 * `z-20` above the neighbour's background (`z-0`) and content (`z-10`).
 */
export const ShapeDivider: React.FC<Props> = ({
  className,
  height = 'h-12',
  position = 'bottom',
  variant,
}) => {
  const isTop = position === 'top'

  return (
    <svg
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 z-20 w-full',
        height,
        isTop ? 'top-0 -translate-y-full rotate-180' : 'bottom-0 translate-y-full',
        className,
      )}
      preserveAspectRatio="none"
      viewBox="0 0 1440 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={PATHS[variant]} fill="currentColor" />
    </svg>
  )
}
