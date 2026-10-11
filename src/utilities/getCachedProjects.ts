import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cacheLife, cacheTag } from 'next/cache'

import type { Locale } from '@/i18n/config'

/**
 * Cached case studies (projects) list for the `/work` index.
 * Time-based: revalidate every 600s (10 min).
 * On-demand: reuses the `case-studies-list` tag that the CaseStudies collection
 * hook (`src/collections/CaseStudies/hooks/revalidateCaseStudy.ts`) already
 * invalidates on publish/unpublish — so both locales re-render for free.
 */
export async function getCachedProjects(locale: Locale = 'en') {
  'use cache'
  cacheTag('case-studies-list')
  cacheLife({ revalidate: 600 })

  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: 'case-studies',
    depth: 1,
    locale,
    overrideAccess: false,
    pagination: false,
    sort: 'sortOrder',
    select: {
      title: true,
      slug: true,
      summary: true,
      phase: true,
      featured: true,
      sortOrder: true,
      coverImage: true,
      results: true,
      services: true,
      content: true,
      projectLink: true,
      updatedAt: true,
      createdAt: true,
    },
  })
}