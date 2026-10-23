import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export const HeroGridHero: React.FC<Page['hero']> = ({ description, eyebrow, links, richText }) => {
  const hasLinks = Array.isArray(links) && links.length > 0

  return (
    <section className="container flex min-h-[calc(100svh-var(--header-height))] flex-col justify-center py-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center lg:gap-8">
        {eyebrow && (
          <p className="font-mono text-base leading-normal text-foreground lg:text-2xl">
            {eyebrow}
          </p>
        )}

        {richText && (
          <RichText
            data={richText}
            enableGutter={false}
            className="[&_h1]:text-balance [&_h1]:font-medium [&_h1]:text-4xl [&_h1]:leading-tight [&_h1]:tracking-[-1.4px] md:[&_h1]:text-5xl lg:[&_h1]:text-6xl xl:[&_h1]:text-7xl"
          />
        )}

        {description && (
          <p className="max-w-2xl font-mono text-base leading-normal text-muted-foreground lg:text-lg">
            {description}
          </p>
        )}

        {hasLinks && (
          <ul className="flex flex-row flex-wrap justify-center gap-3">
            {links?.map(({ link }, i) => (
              <li key={i}>
                <CMSLink
                  {...link}
                  className="h-auto rounded-full px-6 py-4 font-display text-base leading-none uppercase"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
