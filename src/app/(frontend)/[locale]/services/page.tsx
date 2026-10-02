import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import type { ServicesPage, SiteSetting } from '@/payload-types'

import { ServiceIcon } from '@/components/ServiceIcon'
import { RenderHero } from '@/heros/RenderHero'
import { getLocalizedPath, isValidLocale, type Locale } from '@/i18n/config'
import { getTranslations } from '@/i18n/translations'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedServices } from '@/utilities/getCachedServices'

import PageClient from './page.client'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function ServicesIndex({ params: paramsPromise }: Args) {
  const { locale: localeParam } = await paramsPromise
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en'
  const t = getTranslations(locale)
  const services = await getCachedServices(locale)
  const servicesPage = (await getCachedGlobal('services-page', 1, locale)) as ServicesPage

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <RenderHero {...servicesPage.hero} />

      <div className="container">
        {services.docs.length === 0 ? (
          <p className="text-muted-foreground">{t.services.noResults}</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.docs.map((service) => (
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
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam } = await paramsPromise
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en'
  const t = getTranslations(locale)
  const siteSettings = (await getCachedGlobal('site-settings', 1)) as SiteSetting

  return {
    title: `${t.services.title} | ${siteSettings?.siteName || 'Souskai'}`,
    description: t.services.intro,
  }
}
