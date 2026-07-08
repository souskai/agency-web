import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/posts/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('posts-sitemap', 'max')
      revalidateTag('posts-list', 'max')
      revalidateTag(`posts_${doc.slug}`, 'max')
      revalidateTag(`posts_id_${doc.id}`, 'max')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/posts/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('posts-sitemap', 'max')
      revalidateTag('posts-list', 'max')
      revalidateTag(`posts_${previousDoc.slug}`, 'max')
      revalidateTag(`posts_id_${previousDoc.id}`, 'max')
    }

    // If slug changed, also revalidate the old slug's document cache (used by PayloadRedirects)
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidateTag(`posts_${previousDoc.slug}`, 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/posts/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('posts-sitemap', 'max')
    revalidateTag('posts-list', 'max')
    if (doc?.slug) revalidateTag(`posts_${doc.slug}`, 'max')
    if (doc?.id) revalidateTag(`posts_id_${doc.id}`, 'max')
  }

  return doc
}
