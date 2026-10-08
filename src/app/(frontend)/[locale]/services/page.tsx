import type { Metadata } from 'next'
import React from 'react'

import type { ServicesPage, SiteSetting } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { isValidLocale, type Locale } from '@/i18n/config'
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
  const services = await getCachedServices(locale)
  const servicesPage = (await getCachedGlobal('services-page', 1, locale)) as ServicesPage

  return (
    <div className="pb-24">
      <PageClient />
      <RenderHero {...servicesPage.hero} />

      <RenderBlocks blocks={servicesPage.layout ?? []} locale={locale} services={services.docs} />
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
