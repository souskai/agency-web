import type { CollectionSlug } from 'payload'

import type { User } from '@/payload-types'

/**
 * Collections with no frontend consumer at all.
 * `hidden: true` removes them from the admin nav AND their routes (deep links 404).
 */
export const HIDDEN_COLLECTIONS = [
  'demos',
  'team-members',
] as const satisfies readonly CollectionSlug[]

/**
 * Wired only to layout blocks that no live page currently uses.
 * `group: false` drops them from the sidebar/dashboard WITHOUT disabling routes,
 * so block relationship pickers (LogoBanner / AwardsList / Testimonial / Archive)
 * keep resolving when a page is built later.
 */
export const SECONDARY_COLLECTIONS = [
  'awards',
  'customers',
  'portfolio',
  'technologies',
  'testimonials',
] as const satisfies readonly CollectionSlug[]

const rolesOf = (user: unknown) => (user as User | null)?.roles ?? []

/** Editors/viewers never see the user list; admins do. */
export const hiddenForNonAdmin = ({ user }: { user: unknown }) => !rolesOf(user).includes('admin')

/** Leads are PII — only admin/editor. Viewers (client demo accounts) get no dead links. */
export const hiddenForNonStaff = ({ user }: { user: unknown }) =>
  !rolesOf(user).some((role) => role === 'admin' || role === 'editor')