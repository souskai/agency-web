import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cacheLife, cacheTag } from 'next/cache'

import type { Locale } from '@/i18n/config'

/** Posts per page for the posts index and pagination. */
export const POSTS_PER_PAGE = 12

/**
 * Cached posts list for the posts index and pagination pages.
 * Time-based: revalidate every 600s (10 min).
 * On-demand: invalidated via revalidateTag('posts-list') when posts change.
 */
export async function getCachedPosts(page = 1, locale: Locale = 'en') {
  'use cache'
  cacheTag('posts-list')
  cacheLife({ revalidate: 600 })

  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: POSTS_PER_PAGE,
    locale,
    page,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return posts
}
