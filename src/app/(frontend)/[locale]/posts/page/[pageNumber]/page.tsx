import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getCachedPosts, POSTS_PER_PAGE } from '@/utilities/getCachedPosts'
import { getTranslations } from '@/i18n/translations'
import { isValidLocale, type Locale } from '@/i18n/config'
import React from 'react'

import PageClient from './page.client'
import { notFound } from 'next/navigation'

type Args = {
  params: Promise<{ locale: string; pageNumber: string }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale: localeParam, pageNumber } = await paramsPromise
  const locale = isValidLocale(localeParam) ? localeParam : 'en'
  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await getCachedPosts(sanitizedPageNumber, locale)
  const t = getTranslations(locale)

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{t.posts.title}</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={POSTS_PER_PAGE}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Payload Website Template Posts Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const { totalDocs } = await payload.count({
      collection: 'posts',
      overrideAccess: false,
    })

    const totalPages = Math.ceil(totalDocs / POSTS_PER_PAGE)
    const locales: Locale[] = ['en', 'bg']
    const pages: { locale: string; pageNumber: string }[] = []

    for (const locale of locales) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push({ locale, pageNumber: String(i) })
      }
    }

    // Next.js 16 Cache Components require at least one param for build-time validation
    if (pages.length === 0) {
      return locales.map((locale) => ({ locale, pageNumber: '1' }))
    }
    return pages
  } catch {
    return [{ locale: 'en', pageNumber: '1' }]
  }
}
