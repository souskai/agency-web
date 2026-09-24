import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Prevents non-approving roles (e.g. `publisher`) from publishing Pages.
 * They can create and edit drafts, but `_status: 'published'` is reverted
 * to `draft` unless the requester is an admin or editor.
 */
export const restrictPagePublish: CollectionBeforeChangeHook = ({ data, req }) => {
  const roles = req.user?.roles ?? []
  const canPublish = roles.includes('admin') || roles.includes('editor')

  if (!canPublish && data && data._status === 'published') {
    return { ...data, _status: 'draft' }
  }

  return data
}
