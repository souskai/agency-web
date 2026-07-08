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
 * Cached pages sitemap data. Use cacheTag for invalidation via revalidateTag('pages-sitemap').
 * Emits per-locale URLs for localized content.
 */
export async function getPagesSitemap(): Promise<SitemapEntry[]> {
  'use cache'
  cacheTag('pages-sitemap')

  const payload = await getPayload({ config })
  const SITE_URL = getServerSideURL()
  const dateFallback = new Date().toISOString()

  const entries: SitemapEntry[] = []

  for (const locale of locales) {
    const results = await payload.find({
      collection: 'pages',
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

    entries.push(
      { loc: `${SITE_URL}${getLocalizedPath(locale, '/search')}`, lastmod: dateFallback },
      { loc: `${SITE_URL}${getLocalizedPath(locale, '/posts')}`, lastmod: dateFallback },
    )

    if (results.docs) {
      for (const page of results.docs) {
        if (!page?.slug) continue
        const path = page.slug === 'home' ? '/' : `/${page.slug}`
        entries.push({
          loc: `${SITE_URL}${getLocalizedPath(locale, path)}`,
          lastmod: page.updatedAt || dateFallback,
        })
      }
    }
  }

  return entries
}
