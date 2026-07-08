import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { CaseStudy } from '@/payload-types'

export const revalidateCaseStudy: CollectionAfterChangeHook<CaseStudy> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/case-studies/${doc.slug}`

      payload.logger.info(`Revalidating case study at path: ${path}`)

      revalidatePath(path)
      revalidateTag('case-studies-sitemap', 'max')
      revalidateTag('case-studies-list', 'max')
      revalidateTag(`case-studies_${doc.slug}`, 'max')
      revalidateTag(`case-studies_id_${doc.id}`, 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/case-studies/${previousDoc.slug}`

      payload.logger.info(`Revalidating old case study at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('case-studies-sitemap', 'max')
      revalidateTag('case-studies-list', 'max')
      revalidateTag(`case-studies_${previousDoc.slug}`, 'max')
      revalidateTag(`case-studies_id_${previousDoc.id}`, 'max')
    }

    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidateTag(`case-studies_${previousDoc.slug}`, 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<CaseStudy> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/case-studies/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('case-studies-sitemap', 'max')
    revalidateTag('case-studies-list', 'max')
    if (doc?.slug) revalidateTag(`case-studies_${doc.slug}`, 'max')
    if (doc?.id) revalidateTag(`case-studies_id_${doc.id}`, 'max')
  }

  return doc
}
