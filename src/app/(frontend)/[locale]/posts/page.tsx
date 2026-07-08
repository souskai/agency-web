import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { getCachedPosts, POSTS_PER_PAGE } from '@/utilities/getCachedPosts'
import { getTranslations } from '@/i18n/translations'
import { isValidLocale, type Locale } from '@/i18n/config'
import React from 'react'

import PageClient from './page.client'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale: localeParam } = await paramsPromise
  const locale = isValidLocale(localeParam) ? localeParam : 'en'
  const t = getTranslations(locale)

  const posts = await getCachedPosts(1, locale)

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
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata({ params }: Args): Metadata {
  return {
    title: 'Payload Website Template Posts',
  }
}
