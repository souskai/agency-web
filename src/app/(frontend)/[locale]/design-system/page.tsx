import type { Metadata } from 'next'
import React from 'react'

import type { SiteSetting } from '@/payload-types'

import { DesignSystem } from '@/components/DesignSystem'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getTranslations } from '@/i18n/translations'
import { getCachedGlobal } from '@/utilities/getGlobals'

import PageClient from './page.client'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function DesignSystemPage({ params: paramsPromise }: Args) {
  const { locale: localeParam } = await paramsPromise
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en'
  const t = getTranslations(locale)

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <h1 className="text-4xl font-bold tracking-tight">{t.designSystem.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{t.designSystem.intro}</p>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{t.designSystem.liveNote}</p>
      </div>
      <DesignSystem copy={t.designSystem} />
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam } = await paramsPromise
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en'
  const t = getTranslations(locale)
  const siteSettings = (await getCachedGlobal('site-settings', 1)) as SiteSetting

  return {
    title: `${t.designSystem.title} | ${siteSettings?.siteName || 'Souskai'}`,
    description: t.designSystem.intro,
  }
}
