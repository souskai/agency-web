import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cacheTag } from 'next/cache'

import type { Locale } from '@/i18n/config'

type Global = keyof Config['globals']

/**
 * Cached global fetch. Use cacheTag for invalidation via revalidateTag(\`global_${slug}\`).
 * Pass locale for localized content (Header nav, Footer nav).
 */
export async function getCachedGlobal(slug: Global, depth = 0, locale: Locale = 'en') {
  'use cache'
  cacheTag(`global_${slug}`)

  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale,
  })

  return global
}
