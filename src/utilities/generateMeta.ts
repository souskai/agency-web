import type { Metadata } from 'next'

import type { LegalPage, Media, Page, Post, Service, SiteSetting } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getCachedGlobal } from './getGlobals'
import { getServerSideURL } from './getURL'

const DEFAULT_OG_IMAGE = '/og-default.jpg'
const FALLBACK_SITE_NAME = 'Souskai'

type MetaDoc =
  | Partial<Page>
  | Partial<Post>
  | Partial<Service>
  | Partial<LegalPage>
  | null
type MetaCollection = 'pages' | 'posts' | 'services' | 'legal-pages'

const pathForDoc = (doc: MetaDoc, collection?: MetaCollection): string => {
  const slug = typeof doc?.slug === 'string' ? doc.slug : ''
  if (collection === 'posts') return `/posts/${slug}`
  if (collection === 'services') return `/services/${slug}`
  if (collection === 'legal-pages') return `/legal-pages/${slug}`
  if (!slug || slug === 'home') return '/'
  return `/${slug}`
}

const resolveImageUrl = (
  image: Media | SiteSetting['ogImage'] | number | null | undefined,
): string | undefined => {
  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url
    return ogUrl ? ogUrl : (image.url ?? undefined)
  }

  return undefined
}

export const generateMeta = async (args: {
  doc: MetaDoc
  collection?: MetaCollection
}): Promise<Metadata> => {
  const { doc, collection } = args

  const serverUrl = getServerSideURL()
  const siteSettings = (await getCachedGlobal('site-settings', 1)) as SiteSetting

  const siteName = siteSettings?.siteName || FALLBACK_SITE_NAME
  const siteDescription =
    siteSettings?.siteDescription ||
    'We engineer modern, type-safe web platforms using Payload CMS and Next.js.'

  const meta = (doc as Partial<Page>)?.meta
  const docImage = resolveImageUrl(meta?.image)
  const defaultImage = resolveImageUrl(siteSettings?.ogImage) ?? DEFAULT_OG_IMAGE

  const ogImage = docImage ? serverUrl + docImage : serverUrl + defaultImage

  const metaTitle = meta?.title?.trim()
  const title = !metaTitle
    ? siteName
    : metaTitle.toLowerCase().includes(siteName.toLowerCase())
      ? metaTitle
      : `${metaTitle} | ${siteName}`

  const description = meta?.description || siteDescription
  const url = `${serverUrl}${pathForDoc(doc, collection)}`

  return {
    description,
    alternates: { canonical: url },
    openGraph: await mergeOpenGraph({
      description,
      images: [{ url: ogImage }],
      siteName,
      title,
      url,
    }),
    title,
  }
}
