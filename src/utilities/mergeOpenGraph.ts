import type { Metadata } from 'next'

import type { SiteSetting } from '../payload-types'

import { getCachedGlobal } from './getGlobals'
import { getServerSideURL } from './getURL'

const DEFAULT_OG_IMAGE = '/website-template-OG.webp'
const FALLBACK_SITE_NAME = 'Souskai'

const resolveImageUrl = (image?: SiteSetting['ogImage'] | null): string | undefined => {
  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    return ogUrl ? ogUrl : (image.url ?? undefined)
  }

  return undefined
}

export const mergeOpenGraph = async (
  og?: Metadata['openGraph'],
): Promise<Metadata['openGraph']> => {
  const serverUrl = getServerSideURL()
  const siteSettings = (await getCachedGlobal('site-settings', 1)) as SiteSetting

  const siteName = siteSettings?.siteName || FALLBACK_SITE_NAME
  const description = siteSettings?.siteDescription || 'A modern web development agency.'
  const defaultImage = resolveImageUrl(siteSettings?.ogImage) ?? `${serverUrl}${DEFAULT_OG_IMAGE}`

  return {
    type: 'website',
    description,
    siteName,
    title: siteName,
    ...og,
    images: og?.images ? og.images : [{ url: defaultImage }],
  }
}
