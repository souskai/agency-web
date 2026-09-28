import React from 'react'

import { ContainerRails } from '@/components/ContainerRails'

/**
 * Footer chrome: hairline rails + junction crosses on the `.container`,
 * mirroring `HeaderDecor` but anchored to the footer's TOP border. The
 * `surface="background"` band paints the footer's surface CONTAINED to the
 * rail band (not full-bleed). MUST stay a sibling of `.container` inside
 * `<footer>`.
 */
export const FooterDecor: React.FC = () => {
  return <ContainerRails edge="top" surface="background" />
}

FooterDecor.displayName = 'FooterDecor'
