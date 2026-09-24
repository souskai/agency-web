import type { Access } from 'payload'

/**
 * Admins/editors can read every user; everyone else (publisher/viewer) can
 * only read their own record. Prevents lower-privilege accounts from
 * enumerating other users' emails.
 */
export const readOwnOrAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.roles?.includes('admin') || user.roles?.includes('editor')) return true
  return { id: { equals: user.id } }
}
