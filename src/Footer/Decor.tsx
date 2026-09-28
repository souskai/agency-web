import React from 'react'

import { ContainerRails } from '@/components/ContainerRails'

/**
 * Footer chrome: hairline rails + junction crosses on the `.container`,
 * mirroring `HeaderDecor` but anchored to the footer's TOP border.
 * MUST stay a sibling of `.container` inside `<footer>`.
 */
export const FooterDecor: React.FC = () => {
  return <ContainerRails edge="top" />
}

FooterDecor.displayName = 'FooterDecor'
