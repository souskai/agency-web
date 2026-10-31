import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cacheLife, cacheTag } from 'next/cache'

import type { Locale } from '@/i18n/config'

/**
 * Cached legal-page fetch by slug.
 * Tagged `legal-pages` so the LegalPages collection hooks
 * (`afterChange`/`afterDelete` → `revalidateTag('legal-pages')`) invalidate it.
 */
export async function getCachedLegalPage(slug: string, locale: Locale = 'en') {
  'use cache'
  cacheTag('legal-pages')
  cacheLife({ revalidate: 600 })

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'legal-pages',
    depth: 0,
    locale,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] ?? null
}