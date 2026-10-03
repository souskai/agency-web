import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ServiceIcon } from '@/components/ServiceIcon'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const MediumImpactHero: React.FC<Page['hero'] & { icon?: string | null }> = ({
  icon,
  links,
  richText,
}) => {
  return (
    <section className="container mb-16">
      <div className="relative flex min-h-[65vh] items-center overflow-hidden rounded-3xl bg-mesh-aurora ring-1 ring-foreground/10">
        <div
          className={cn(
            'grid w-full grid-cols-1 gap-10 px-6 py-12 sm:px-10 lg:px-16 lg:py-20',
            icon && 'lg:grid-cols-12',
          )}
        >
          <div className={cn(icon && 'lg:col-span-7')}>
            {richText && (
              <RichText
                className="[&_h1]:font-display [&_h1]:font-medium [&_h1]:text-4xl [&_h1]:leading-[1.05] [&_h1]:tracking-[-1.4px] md:[&_h1]:text-5xl lg:[&_h1]:text-6xl xl:[&_h1]:text-7xl"
                data={richText}
                enableGutter={false}
              />
            )}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-3">
                {links.map(({ link }, i) => (
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

          {icon && (
            <div className="flex items-center justify-center lg:col-span-5 lg:justify-end">
              <ServiceIcon icon={icon} className="h-32 w-32 text-primary/20 lg:h-64 lg:w-64" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

