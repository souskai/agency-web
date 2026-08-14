import React from 'react'

import type { Page } from '@/payload-types'

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
    <section className="container mt-16">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12 xl:pt-28">
        <div className="xl:col-span-8 xl:col-start-1 xl:col-end-9">
          <div className="flex flex-col gap-6 lg:gap-10">
            {eyebrow && (
              <div className="flex flex-row items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-muted">
                  <svg
                    className="h-3 w-3 -rotate-45 text-primary"
                    fill="none"
                    viewBox="0 0 34 34"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.8115 16.2041L27.607 16.9996L18.0611 26.5454L16.4702 24.9545L23.3014 18.1232L8.51527 18.1265H7.38832L7.39164 15.8759L8.51858 15.8759L23.3014 15.8759L16.4702 9.04468L18.0611 7.45371L26.8115 16.2041Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
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
