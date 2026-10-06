'use client'

import React from 'react'

import { DesignSystem as DesignSystemShowcase } from '@/components/DesignSystem'
import { SectionShell } from '@/components/SectionShell'
import { useLocale } from '@/i18n/locale'
import { getTranslations } from '@/i18n/translations'

type Props = {
  className?: string
  id?: string
}

/**
 * The live design-system showcase as a composable layout block.
 *
 * `useLocale()` reads the locale from the URL path (the app has no i18n
 * middleware, so there is no locale header available to a server component),
 * then `getTranslations()` resolves the localized `designSystem` copy. The
 * showcase itself is wrapped in the canonical `rounded-frame` card so it sits
 * flush inside the page's block rhythm instead of its former standalone
 * `pt-24` page shell.
 */
export const DesignSystemBlock: React.FC<Props> = ({ className, id }) => {
  const locale = useLocale()
  const { designSystem } = getTranslations(locale)

  return (
    <SectionShell
      background="grid-fade"
      className={className}
      dividerBottom="wave"
      dividerClassName="text-background"
      id={id ? `block-${id}` : undefined}
    >
      <div className="overflow-hidden rounded-frame border border-border/70 bg-card/35 px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mb-12 flex flex-col gap-4">
          <h2 className="text-4xl font-medium tracking-display text-balance">
            {designSystem.title}
          </h2>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground">
            {designSystem.intro}
          </p>
          <p className="max-w-3xl text-sm text-muted-foreground">{designSystem.liveNote}</p>
        </div>
        <DesignSystemShowcase copy={designSystem} />
      </div>
    </SectionShell>
  )
}
