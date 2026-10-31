import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import {
  getLocalizedPath,
  isValidLocale,
  type Locale,
} from '@/i18n/config'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedLegalPage } from '@/utilities/getCachedLegalPage'

type Args = {
  params: Promise<{ locale: string; slug?: string }>
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const locales: Locale[] = ['en']
    const allParams: { locale: string; slug: string }[] = []

    for (const locale of locales) {
      const result = await payload.find({
        collection: 'legal-pages',
        draft: false,
        limit: 1000,
        locale,
        overrideAccess: false,
        pagination: false,
        select: { slug: true },
      })

      const slugs = result.docs.map((doc) => ({ locale, slug: doc.slug as string }))
      allParams.push(...slugs)
    }

    if (allParams.length === 0) {
      return [{ locale: 'en', slug: 'placeholder' }]
    }
    return allParams
  } catch {
    return [{ locale: 'en', slug: 'placeholder' }]
  }
}

export default async function LegalPage({ params: paramsPromise }: Args) {
  const { locale: localeParam, slug = '' } = await paramsPromise
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en'
  const decodedSlug = decodeURIComponent(slug)
  const url = getLocalizedPath(locale, `/legal-pages/${decodedSlug}`)

  const page = await getCachedLegalPage(decodedSlug, locale)

  if (!page) {
    notFound()
  }

  const lastUpdated = page.lastUpdated
    ? new Date(page.lastUpdated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <article className="pb-24">
      <PayloadRedirects disableNotFound url={url} />

      <header className="container pt-16 md:pt-24">
        <h1 className="text-3xl font-semibold md:text-4xl">{page.title}</h1>
        {lastUpdated && (
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        )}
      </header>

      <div className="container pt-10">
        <RichText data={page.content} enableGutter={false} />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam, slug = '' } = await paramsPromise
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en'
  const decodedSlug = decodeURIComponent(slug)
  const page = await getCachedLegalPage(decodedSlug, locale)

  const meta = await generateMeta({ doc: page, collection: 'legal-pages' })
  if (page?.title) {
    const siteName = meta.openGraph?.siteName || 'Souskai'
    meta.title = `${page.title} | ${siteName}`
    meta.openGraph = { ...meta.openGraph, title: page.title }
  }
  return meta
}