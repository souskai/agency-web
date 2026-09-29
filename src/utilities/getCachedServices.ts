import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cacheLife, cacheTag } from 'next/cache'

import type { Locale } from '@/i18n/config'

/**
 * Cached services list for the `/services` hub.
 * Time-based: revalidate every 600s (10 min).
 * On-demand: invalidated via revalidateTag('services-list') by the Services
 * collection hooks (`src/collections/Services/hooks/revalidateService.ts`).
 */
export async function getCachedServices(locale: Locale = 'en') {
  'use cache'
  cacheTag('services-list')
  cacheLife({ revalidate: 600 })

  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: 'services',
    depth: 0,
    locale,
    overrideAccess: false,
    pagination: false,
    sort: 'sortOrder',
    select: {
      title: true,
      slug: true,
      summary: true,
      icon: true,
      sortOrder: true,
    },
  })
}
