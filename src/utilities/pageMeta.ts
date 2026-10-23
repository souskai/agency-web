import type { Metadata } from 'next'

import type { SiteSetting } from '@/payload-types'

import { getCachedGlobal } from './getGlobals'
import { getServerSideURL } from './getURL'
import { mergeOpenGraph } from './mergeOpenGraph'

const FALLBACK_DESCRIPTION =
  'We engineer modern, type-safe web platforms using Payload CMS and Next.js.'

type PageMetaArgs = {
  title: string
  description?: string
  path: string
  image?: string
}

/**
 * Metadata for top-level archive/list routes (posts, work, services, search).
 * Adds og:title/description/image + canonical, falling back to SiteSettings defaults.
 * `description` falls back to SiteSettings.siteDescription; `image` (a site-relative
 * path like `/og-work.jpg`) falls back to the global OG default.
 */
export const pageMeta = async ({ title, description, path, image }: PageMetaArgs): Promise<Metadata> => {
  const serverUrl = getServerSideURL()
  const siteSettings = (await getCachedGlobal('site-settings', 1)) as SiteSetting
  const siteDescription = siteSettings?.siteDescription || FALLBACK_DESCRIPTION
  const url = `${serverUrl}${path}`

  return {
    title,
    description: description ?? siteDescription,
    alternates: { canonical: url },
    openGraph: await mergeOpenGraph({
      title,
      description: description ?? siteDescription,
      url,
      ...(image ? { images: [{ url: `${serverUrl}${image}` }] } : {}),
    }),
  }
}