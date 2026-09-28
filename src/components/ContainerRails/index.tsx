import React from 'react'

import { ConnectorJunction } from '@/components/ConnectorJunction'
import { cn } from '@/utilities/ui'

type ContainerRailsEdge = 'top' | 'bottom'

interface Props {
  /**
   * Which horizontal edge the rails "branch" into.
   * - `bottom` (header): the wire runs down the page and branches at the
   *   header's bottom border.
   * - `top` (footer): the wire runs down the page and branches at the
   *   footer's top border.
   */
  edge?: ContainerRailsEdge
  className?: string
}

/**
 * Site chrome: two 1px hairline rails running the full height of the content
 * column, each finished with a `ConnectorJunction` where it meets the section's
 * horizontal border — so each rail reads as a wire that branches sideways.
 *
 * Dev-authored decoration only, never CMS fields (see .clinerules Rule #14).
 * The `.container` class keeps the rails aligned with the page content column;
 * they overflow the host on purpose, so the svg is not clipped.
 *
 * Geometry notes:
 * - Hairlines are painted with `w-px` spans rather than `border-x` so the rail
 *   has zero border: absolutely positioned children resolve against the padding
 *   box, so a border would push every junction 1px off the line it must sit on.
 * - The junction offset is `-top-2.75` / `-bottom-2.75` — the spacing-scale
 *   spelling of 11px (`top-11`/`bottom-11` would mean 44px). 11px puts the cross
 *   centre exactly on the host's own 1px horizontal border, i.e. on the rail.
 * - The `ConnectorJunction` svg is point-symmetric (vertical bar spans svg x
 *   10.5–11.5, horizontal bar svg y 10–11), so the same asset serves both edges
 *   with no transform.
 */
export const ContainerRails: React.FC<Props> = ({ className, edge = 'bottom' }) => {
  const isTop = edge === 'top'

  return (
    <div
      aria-hidden="true"
      className={cn(
        'container pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 text-border',
        className,
      )}
    >
      <span className="absolute inset-y-0 left-0 w-px bg-current" />
      <span className="absolute inset-y-0 right-0 w-px bg-current" />
      <ConnectorJunction className={isTop ? '-top-2.75' : '-bottom-2.75'} side="left" />
      <ConnectorJunction className={isTop ? '-top-2.75' : '-bottom-2.75'} side="right" />
    </div>
  )
}

ContainerRails.displayName = 'ContainerRails'
