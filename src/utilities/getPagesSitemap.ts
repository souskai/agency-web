import { getPayload } from 'payload'
import config from '@payload-config'
import { cacheTag } from 'next/cache'
import { getServerSideURL } from './getURL'
import { getLocalizedPath, locales } from '@/i18n/config'

export type SitemapEntry = {
  loc: string
  lastmod?: string
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

    // List routes omit `lastmod` entirely — a `new Date()` stamp changes on every
    // render, which teaches Google to distrust the real per-document values too.
    // `/search` is intentionally excluded (noindex, thin query page).
    entries.push(
      { loc: `${SITE_URL}${getLocalizedPath(locale, '/posts')}` },
      { loc: `${SITE_URL}${getLocalizedPath(locale, '/work')}` },
      { loc: `${SITE_URL}${getLocalizedPath(locale, '/services')}` },
    )

    if (results.docs) {
      for (const page of results.docs) {
        if (!page?.slug) continue
        const path = page.slug === 'home' ? '/' : `/${page.slug}`
        entries.push({
          loc: `${SITE_URL}${getLocalizedPath(locale, path)}`,
          lastmod: page.updatedAt || undefined,
        })
      }
    }

    const services = await payload.find({
      collection: 'services',
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

    if (services.docs) {
      for (const service of services.docs) {
        if (!service?.slug) continue
        entries.push({
          loc: `${SITE_URL}${getLocalizedPath(locale, `/services/${service.slug}`)}`,
          lastmod: service.updatedAt || undefined,
        })
      }
    }

    const legalPages = await payload.find({
      collection: 'legal-pages',
      locale,
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      select: { slug: true, updatedAt: true },
    })

    if (legalPages.docs) {
      for (const lp of legalPages.docs) {
        if (!lp?.slug) continue
        entries.push({
          loc: `${SITE_URL}${getLocalizedPath(locale, `/legal-pages/${lp.slug}`)}`,
          lastmod: lp.updatedAt || undefined,
        })
      }
    }
  }

  return entries
}
