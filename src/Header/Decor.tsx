import React from 'react'

import { ContainerRails } from '@/components/ContainerRails'

/**
 * Header chrome: hairline rails + junction crosses on the `.container`,
 * anchored to the header's bottom border. Delegates to the shared
 * `ContainerRails`. MUST stay a sibling of `.container` inside `<header>`
 * (put it back inside and the rails inset to the content column).
 */
export const HeaderDecor: React.FC = () => {
  return <ContainerRails edge="bottom" />
}

HeaderDecor.displayName = 'HeaderDecor'
