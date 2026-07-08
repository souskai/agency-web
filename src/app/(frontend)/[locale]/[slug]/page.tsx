import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getLocalizedPath, isValidLocale, type Locale } from '@/i18n/config'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

type Args = {
  params: Promise<{ locale: string; slug?: string }>
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const locales: Locale[] = ['en', 'bg']
    const allParams: { locale: string; slug: string }[] = []

    for (const locale of locales) {
      const pages = await payload.find({
        collection: 'pages',
        draft: false,
        limit: 1000,
        locale,
        overrideAccess: false,
        pagination: false,
        select: { slug: true },
      })

      const slugs =
        pages.docs
          ?.filter((doc) => doc.slug !== 'home')
          .map((doc) => ({ locale, slug: doc.slug as string })) ?? []
      allParams.push(...slugs)
    }

    // Next.js 16 Cache Components require at least one param for build-time validation
    if (allParams.length === 0) {
      return [{ locale: 'en', slug: 'home' }]
    }
    return allParams
  } catch {
    return [{ locale: 'en', slug: 'home' }]
  }
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale: localeParam, slug = 'home' } = await paramsPromise
  const locale = isValidLocale(localeParam) ? localeParam : 'en'
  const decodedSlug = decodeURIComponent(slug)
  const path = slug === 'home' ? '/' : `/${decodedSlug}`
  const url = getLocalizedPath(locale, path)
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })

  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam, slug = 'home' } = await paramsPromise
  const locale = isValidLocale(localeParam) ? localeParam : 'en'
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(
  async ({ slug, locale }: { slug: string; locale: Locale }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      locale,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return result.docs?.[0] || null
  },
)
