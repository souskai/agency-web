import type { Access } from 'payload'

import type { User } from '@/payload-types'

/**
 * Returns an Access function that grants access if the currently logged-in
 * user has at least one of the given roles.
 *
 * Roles are read from `user.roles`. Since the `roles` field uses
 * `saveToJWT: true`, this works without an extra database round-trip.
 *
 * Usage:
 *   const isEditor = hasRole(['admin', 'editor'])
 *   const isAdmin = hasRole(['admin'])
 */
export const hasRole =
  (roles: User['roles']): Access =>
  ({ req: { user } }) => {
    if (!user) return false
    if (!user.roles) return false
    if (!roles) return false
    return roles.some((role) => user.roles?.includes(role))
  }
