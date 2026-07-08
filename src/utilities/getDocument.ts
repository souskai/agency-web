import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cacheTag } from 'next/cache'

import type { Locale } from '@/i18n/config'

type Collection = keyof Config['collections']

/**
 * Cached document fetch by slug. Use cacheTag for invalidation via revalidateTag(\`${collection}_${slug}\`).
 * Pass locale for localized content.
 */
export async function getCachedDocument(
  collection: Collection,
  slug: string,
  depth = 0,
  locale: Locale = 'en',
) {
  'use cache'
  cacheTag(`${collection}_${slug}`)

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection,
    depth,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0]
}

/**
 * Cached document fetch by ID. Use cacheTag for invalidation via revalidateTag(\`${collection}_id_${id}\`).
 * Used by PayloadRedirects when resolving reference IDs.
 * Pass locale for localized content.
 */
export async function getCachedDocumentById(
  collection: Collection,
  id: string | number,
  depth = 0,
  locale: Locale = 'en',
) {
  'use cache'
  cacheTag(`${collection}_id_${id}`)

  const payload = await getPayload({ config: configPromise })

  const doc = await payload.findByID({
    collection,
    id,
    depth,
    locale,
  })

  return doc
}
