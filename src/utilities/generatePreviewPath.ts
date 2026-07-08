import { PayloadRequest } from 'payload'

const collectionPrefixMap: Record<string, string> = {
  posts: '/posts',
  pages: '',
  services: '/services',
  'case-studies': '/case-studies',
}

type Props = {
  collection: string
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  // Allow empty strings, e.g. for the homepage
  if (slug === undefined || slug === null) {
    return null
  }

  // Encode to support slugs with special characters
  const encodedSlug = encodeURIComponent(slug)
  const prefix = collectionPrefixMap[collection] ?? ''
  const pathSegment = slug === 'home' && collection === 'pages' ? '' : `/${encodedSlug}`
  const path = `${prefix}${pathSegment}` || '/'

  const encodedParams = new URLSearchParams({
    slug: encodedSlug,
    collection,
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
