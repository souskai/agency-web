import type { Media, Post, Service } from '@/payload-types'

/**
 * JSON-LD builders for entity grounding. Emit only real data — a schema field
 * with a placeholder is worse than no schema. Consumers wrap output in <JsonLd />.
 */

export const organizationSchema = (
  siteName: string,
  serverUrl: string,
  sameAs: string[] = [],
) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: serverUrl,
  ...(sameAs.length ? { sameAs } : {}),
})

const mediaUrl = (m: Media | number | null | undefined): string | undefined => {
  if (m && typeof m === 'object' && 'url' in m) {
    return m.sizes?.og?.url ?? m.url ?? undefined
  }
  return undefined
}

export const serviceSchema = (service: Service, serverUrl: string, siteName: string) => {
  const url = `${serverUrl}${service?.slug ? `/services/${service.slug}` : ''}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    ...(service.summary || service.meta?.description
      ? { description: service.summary ?? service.meta?.description }
      : {}),
    url,
    provider: { '@type': 'Organization', name: siteName },
    ...(service.publishedAt ? { datePublished: service.publishedAt } : {}),
  }
}

export const articleSchema = (post: Post, serverUrl: string, siteName: string) => {
  const slug = typeof post.slug === 'string' ? post.slug : ''
  const url = `${serverUrl}${slug ? `/posts/${slug}` : ''}`
  const authors = (post.populatedAuthors ?? [])
    .map((a) => a?.name)
    .filter((n): n is string => typeof n === 'string' && n.length > 0)
  const image = mediaUrl(post.heroImage) ?? mediaUrl(post.meta?.image)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    ...(post.meta?.description ? { description: post.meta.description } : {}),
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    ...(authors.length
      ? { author: authors.map((name) => ({ '@type': 'Person', name })) }
      : {}),
    ...(image ? { image } : {}),
    publisher: { '@type': 'Organization', name: siteName },
  }
}