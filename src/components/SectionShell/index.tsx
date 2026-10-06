import React from 'react'

import { BackgroundLayers } from '@/components/BackgroundLayers'
import type { BackgroundPresetKey } from '@/components/BackgroundLayers/registry'
import { ShapeDivider, type DividerVariant } from '@/components/ShapeDivider'
import { cn } from '@/utilities/ui'

type Spacing = 'none' | 'sm' | 'md' | 'lg'

// Literal map so the Tailwind v4 scanner sees every class statically
// (never build these strings dynamically — that defeats the scanner).
const spacingClass: Record<Spacing, string> = {
  none: 'py-section-none',
  sm: 'py-section-sm md:py-section-md',
  md: 'py-section-md md:py-section-xl',
  lg: 'py-section-xl md:py-section-2xl',
}

type Props = {
  background?: BackgroundPresetKey
  backgroundClassName?: string
  children: React.ReactNode
  className?: string
  container?: boolean
  dividerBottom?: DividerVariant
  dividerClassName?: string
  dividerHeight?: string
  dividerTop?: DividerVariant
  id?: string
  innerClassName?: string
  /** @deprecated use `spacing` */
  padding?: string
  spacing?: Spacing
}

/**
 * Dev-only section wrapper.
 *
 * Composes a section's background layers + optional shape dividers + content in
 * the canonical z-order:
 *
 *   background (z-0) → content (z-10) → dividers (z-20, overflow the edges)
 *
 * The editor in the admin panel never sees these options — a developer chooses
 * the look directly in the block's `Component.tsx`. Because dividers are
 * painted with the section's own colour, the whole shell stays correct when
 * blocks are reordered.
 */
export const SectionShell: React.FC<Props> = ({
  background = 'none',
  backgroundClassName,
  children,
  className,
  container = true,
  dividerBottom = 'none',
  dividerClassName,
  dividerHeight,
  dividerTop = 'none',
  id,
  innerClassName,
  padding,
  spacing = 'md',
}) => {
  const paddingClass = padding ?? spacingClass[spacing]

  return (
    <section
      className={cn('relative', container && 'container', paddingClass, className)}
      data-section=""
      data-section-bg={background}
      id={id}
    >
      <BackgroundLayers className={backgroundClassName} preset={background} />

      {dividerTop !== 'none' ? (
        <ShapeDivider
          className={dividerClassName}
          height={dividerHeight}
          position="top"
          variant={dividerTop}
        />
      ) : null}

      <div className={cn('section-content relative z-10', innerClassName)}>
        {children}
      </div>

      {dividerBottom !== 'none' ? (
        <ShapeDivider
          className={dividerClassName}
          height={dividerHeight}
          position="bottom"
          variant={dividerBottom}
        />
      ) : null}
    </section>
  )
}
