import React from 'react'

import { cn } from '@/utilities/ui'

import { backgroundPresets, type BackgroundPresetKey } from './registry'

type Props = {
  className?: string
  preset?: BackgroundPresetKey
}

/**
 * Renders the stacked background layers for a section preset.
 *
 * Always rendered as a non-interactive, absolutely-positioned layer at `z-0`
 * so it sits behind the section's content. The actual layer stack is defined in
 * `registry.tsx`; the CSS lives in `globals.css`.
 */
export const BackgroundLayers: React.FC<Props> = ({ className, preset }) => {
  if (!preset || preset === 'none') return null

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 z-0', className)}
    >
      {backgroundPresets[preset]}
    </div>
  )
}
