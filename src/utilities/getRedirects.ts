import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cacheTag } from 'next/cache'

/**
 * Cached redirects fetch. Use cacheTag for invalidation via revalidateTag('redirects').
 */
export async function getCachedRedirects(depth = 1) {
  'use cache'
  cacheTag('redirects')

  const payload = await getPayload({ config: configPromise })

  const { docs: redirects } = await payload.find({
    collection: 'redirects',
    depth,
    limit: 0,
    pagination: false,
  })

  return redirects
}
