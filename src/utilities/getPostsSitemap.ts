import { getPayload } from 'payload'
import config from '@payload-config'
import { cacheTag } from 'next/cache'
import { getServerSideURL } from './getURL'
import { getLocalizedPath, locales } from '@/i18n/config'

export type SitemapEntry = {
  loc: string
  lastmod: string
}

/**
 * Cached posts sitemap data. Use cacheTag for invalidation via revalidateTag('posts-sitemap').
 * Emits per-locale URLs for localized content.
 */
export async function getPostsSitemap(): Promise<SitemapEntry[]> {
  'use cache'
  cacheTag('posts-sitemap')

  const payload = await getPayload({ config })
  const SITE_URL = getServerSideURL()
  const dateFallback = new Date().toISOString()
  const entries: SitemapEntry[] = []

  for (const locale of locales) {
    const results = await payload.find({
      collection: 'posts',
      locale,
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: { equals: 'published' },
      },
      select: { slug: true, updatedAt: true },
    })

    if (results.docs) {
      for (const post of results.docs) {
        if (!post?.slug) continue
        entries.push({
          loc: `${SITE_URL}${getLocalizedPath(locale, `/posts/${post.slug}`)}`,
          lastmod: post.updatedAt || dateFallback,
        })
      }
    }
  }

  return entries
}
