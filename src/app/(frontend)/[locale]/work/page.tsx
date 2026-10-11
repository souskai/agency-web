import type { Metadata } from 'next/types'
import React from 'react'

import { WorkProjects } from '@/components/WorkProjects'
import { getTranslations } from '@/i18n/translations'
import { isValidLocale, type Locale } from '@/i18n/config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedProjects } from '@/utilities/getCachedProjects'
import type { SiteSetting } from '@/payload-types'

import PageClient from './page.client'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale: localeParam } = await paramsPromise
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en'
  const t = getTranslations(locale)

  const projects = await getCachedProjects(locale)

  return (
    <div className="pb-24">
      <PageClient />
      <div className="container pt-24 pb-10" id="work-top">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{t.work.title}</h1>
          <p>{t.work.intro}</p>
        </div>
      </div>
      <WorkProjects projects={projects.docs} locale={locale} />
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = (await getCachedGlobal('site-settings', 1)) as SiteSetting
  return {
    title: `Work | ${siteSettings?.siteName || 'Souskai'}`,
  }
}