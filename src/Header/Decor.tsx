import React from 'react'

import { ConnectorJunction } from '@/components/ConnectorJunction'

/**
 * Header chrome: two 1px hairline rails running the full height of the content
 * column, each finished with a junction where it meets the header's bottom
 * edge — so the rail reads as a wire that branches sideways.
 *
 * Dev-authored decoration only, never CMS fields (see .clinerules Rule #14).
 * The `.container` class keeps the rails aligned with the page content column;
 * they overflow the header on purpose, so the svg is not clipped.
 *
 * The hairlines are painted with `w-px` spans rather than `border-x` so the rail
 * has zero border: absolutely positioned children resolve against the padding
 * box, so a border would push every junction 1px off the line it must sit on.
 * Junctions are nudged to `-bottom-2.75` on purpose — that is the spacing-scale
 * spelling of 11px (`bottom-11` would mean 44px). `-bottom-[10.5px]` (the
 * component default) puts the cross centre on the rail's own bottom edge, while
 * 11px puts it on the centre of the header's 1px `border-b`, i.e. exactly on the
 * horizontal rail.
 */
export const HeaderDecor: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="container pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 text-border"
    >
      <span className="absolute inset-y-0 left-0 w-px bg-current" />
      <span className="absolute inset-y-0 right-0 w-px bg-current" />
      <ConnectorJunction className="-bottom-2.75" side="left" />
      <ConnectorJunction className="-bottom-2.75" side="right" />
    </div>
  )
}

HeaderDecor.displayName = 'HeaderDecor'
