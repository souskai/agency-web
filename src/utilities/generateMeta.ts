import type { Metadata } from 'next'

import type { Media, Page, Post, SiteSetting } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getCachedGlobal } from './getGlobals'
import { getServerSideURL } from './getURL'

const DEFAULT_OG_IMAGE = '/website-template-OG.webp'
const FALLBACK_SITE_NAME = 'Souskai'

type MetaDoc = Partial<Page> | Partial<Post> | null

const resolveImageUrl = (
  image: Media | SiteSetting['ogImage'] | number | null | undefined,
): string | undefined => {
  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    return ogUrl ? ogUrl : (image.url ?? undefined)
  }

  return undefined
}

export const generateMeta = async (args: { doc: MetaDoc }): Promise<Metadata> => {
  const { doc } = args

  const serverUrl = getServerSideURL()
  const siteSettings = (await getCachedGlobal('site-settings', 1)) as SiteSetting

  const siteName = siteSettings?.siteName || FALLBACK_SITE_NAME
  const siteDescription = siteSettings?.siteDescription || 'A modern web development agency.'

  const docImage = resolveImageUrl(doc?.meta?.image)
  const defaultImage = resolveImageUrl(siteSettings?.ogImage) ?? DEFAULT_OG_IMAGE

  const ogImage = docImage ? serverUrl + docImage : serverUrl + defaultImage

  const title = doc?.meta?.title ? `${doc.meta.title} | ${siteName}` : siteName

  const description = doc?.meta?.description || siteDescription

  return {
    description,
    openGraph: await mergeOpenGraph({
      description,
      images: [{ url: ogImage }],
      siteName,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
