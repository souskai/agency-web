import React from 'react'

import type { Page } from '@/payload-types'

import { AnimatedFlame } from '@/components/AnimatedFlame'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export const HeroGridHero: React.FC<Page['hero']> = ({ description, eyebrow, links, richText }) => {
  const renderLinks = (className: string) => {
    return (
      <ul className={className}>
        {links?.map(({ link }, i) => (
          <li key={i}>
            <CMSLink
              {...link}
              className="h-auto rounded-full px-6 py-4 font-display text-base leading-none uppercase"
            />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section className="container mt-2 pt-12 flex min-h-[75vh] flex-col">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 xl:pt-4">
        <div className="xl:col-span-8 xl:col-start-1 xl:col-end-9">
          <div className="flex flex-col gap-6 lg:gap-10">
            {eyebrow && (
              <div className="flex flex-row items-center gap-4">
                <AnimatedFlame className="size-6 text-brand-500 lg:size-7 dark:text-brand-400" />
                <p className="font-mono text-base leading-normal text-foreground lg:text-2xl">
                  {eyebrow}
                </p>
              </div>
            )}

            {richText && (
              <RichText
                data={richText}
                enableGutter={false}
                className="[&_h1]:font-medium [&_h1]:text-4xl [&_h1]:leading-tight [&_h1]:tracking-[-1.4px] md:[&_h1]:text-5xl lg:[&_h1]:text-6xl xl:[&_h1]:text-7xl"
              />
            )}

            {Array.isArray(links) && links.length > 0 && (
              <div className="hidden flex-row gap-3 lg:flex">
                {renderLinks('flex flex-row flex-wrap gap-3')}
              </div>
            )}
          </div>
        </div>

        <div className="xl:col-span-3 xl:col-start-10 xl:col-end-13">
          <div className="flex h-full flex-col justify-end">
            {description && (
              <p className="font-mono text-base leading-normal text-muted-foreground lg:text-lg">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {Array.isArray(links) && links.length > 0 && (
        <div className="mt-10 flex flex-col gap-3 lg:hidden">
          {renderLinks('flex flex-col gap-3')}
        </div>
      )}
    </section>
  )
}
