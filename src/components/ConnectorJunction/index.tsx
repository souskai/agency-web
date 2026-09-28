import React from 'react'

import { cn } from '@/utilities/ui'

type ConnectorJunctionSide = 'left' | 'right'

interface Props {
  /** Which edge of the parent rail the junction hangs from. */
  side?: ConnectorJunctionSide
  /** Applied to the svg — use for colour (`text-border`) and z-index tweaks. */
  className?: string
}

/**
 * Decorative "wire junction": a 22×21 cross whose centre sits exactly on the
 * bottom corner of a rail, so a 1px hairline appears to branch sideways.
 *
 * Geometry: the svg is 22 wide, so `-left-[10.5px]` (half width minus the
 * 0.5px hairline) centres the cross on the parent's left edge; `-bottom-[10.5px]`
 * places the cross centre 10.5px below the parent's bottom edge — note 10.5px is
 * arbitrary-value syntax on purpose, since `bottom-11` in Tailwind means 44px.
 *
 * Dev-authored chrome only — no CMS fields (see .clinerules Rule #14).
 * Colour comes from the parent (`fill="currentColor"`); sizing/positioning
 * classes are static strings so the Tailwind v4 scanner picks them up.
 */
export const ConnectorJunction: React.FC<Props> = ({ className, side = 'left' }) => {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute h-[21px] w-[22px] -bottom-[10.5px]',
        side === 'left' ? '-left-[10.5px]' : '-right-[10.5px]',
        className,
      )}
      fill="none"
      height="21"
      viewBox="0 0 22 21"
      width="22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 4C10.5 7.31371 7.81371 10 4.5 10H0.5V11H4.5C7.81371 11 10.5 13.6863 10.5 17V21H11.5V17C11.5 13.6863 14.1863 11 17.5 11H21.5V10H17.5C14.1863 10 11.5 7.31371 11.5 4V0H10.5V4Z"
        fill="currentColor"
      />
    </svg>
  )
}

ConnectorJunction.displayName = 'ConnectorJunction'
