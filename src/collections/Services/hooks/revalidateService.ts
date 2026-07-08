import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Service } from '@/payload-types'

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/services/${doc.slug}`

      payload.logger.info(`Revalidating service at path: ${path}`)

      revalidatePath(path)
      revalidateTag('services-sitemap', 'max')
      revalidateTag('services-list', 'max')
      revalidateTag(`services_${doc.slug}`, 'max')
      revalidateTag(`services_id_${doc.id}`, 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/services/${previousDoc.slug}`

      payload.logger.info(`Revalidating old service at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('services-sitemap', 'max')
      revalidateTag('services-list', 'max')
      revalidateTag(`services_${previousDoc.slug}`, 'max')
      revalidateTag(`services_id_${previousDoc.id}`, 'max')
    }

    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidateTag(`services_${previousDoc.slug}`, 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Service> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/services/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('services-sitemap', 'max')
    revalidateTag('services-list', 'max')
    if (doc?.slug) revalidateTag(`services_${doc.slug}`, 'max')
    if (doc?.id) revalidateTag(`services_id_${doc.id}`, 'max')
  }

  return doc
}
