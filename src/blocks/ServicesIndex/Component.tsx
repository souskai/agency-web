import Link from 'next/link'
import React from 'react'

import type { Locale } from '@/i18n/config'
import { getLocalizedPath } from '@/i18n/config'
import { getTranslations } from '@/i18n/translations'

import { ServiceIcon } from '@/components/ServiceIcon'
import { SectionShell } from '@/components/SectionShell'

/**
 * The minimal service shape the index renders. `getCachedServices` requests a
 * `select` subset, so this is looser than the full `Service` type.
 */
export type ServicesIndexService = {
  id: number
  title: string
  slug: string
  summary?: string | null
  icon?: string | null
}

type Props = {
  className?: string
  id?: string
  /** Locale from the render context (forwarded by `RenderBlocks`). */
  locale?: Locale
  /** Services list from the render context (forwarded by `RenderBlocks`). */
  services?: ServicesIndexService[]
}

/**
 * The hub's service index — icon + title + summary cards linking out to the
 * individual `/services/[slug]` detail pages. Data is passed down from the page
 * (already fetched + cached via `getCachedServices`), so this component stays a
 * plain synchronous Server Component and never re-queries the collection.
 */
export const ServicesIndexBlock: React.FC<Props> = ({
  className,
  id,
  locale = 'en',
  services,
}) => {
  const t = getTranslations(locale)
  const docs = services ?? []

  return (
    <SectionShell className={className} id={id ? `block-${id}` : undefined} spacing="md">
      {docs.length === 0 ? (
        <p className="text-muted-foreground">{t.services.noResults}</p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((service) => (
            <li key={service.id}>
              <Link
                href={getLocalizedPath(locale, `/services/${service.slug}`)}
                className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent"
              >
                <ServiceIcon icon={service.icon} className="h-8 w-8 text-primary" />
                <h2 className="mt-4 text-xl font-semibold">{service.title}</h2>
                {service.summary && (
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.summary}</p>
                )}
                <span className="mt-4 text-sm font-medium text-primary">
                  {t.common.readMore} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </SectionShell>
  )
}