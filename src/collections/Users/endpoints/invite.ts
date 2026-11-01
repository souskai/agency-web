import type { Endpoint, PayloadRequest } from 'payload'

const INVITABLE_ROLES = ['viewer', 'editor', 'publisher'] as const
type InvitableRole = (typeof INVITABLE_ROLES)[number]

const isInvitableRole = (role: unknown): role is InvitableRole =>
  typeof role === 'string' && (INVITABLE_ROLES as readonly string[]).includes(role)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Admin-only endpoint that creates a user WITHOUT a password and lets the
 * existing `sendInvitation` afterChange hook email a "set your password" link
 * (valid 3 days). Avoids Payload's stock create form, which forces a password
 * field on create.
 */
export const inviteUserEndpoint: Endpoint = {
  path: '/invite',
  method: 'post',
  handler: async (req: PayloadRequest) => {
    const { payload, user } = req

    if (!user?.roles?.includes('admin')) {
      return Response.json({ error: 'Unauthorized' }, { status: 403 })
    }

    try {
      let body: unknown
      try {
        body = await (req as unknown as Request).json()
      } catch {
        return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
      }

      const data = (body ?? {}) as Record<string, unknown>

      const rawEmail = typeof data.email === 'string' ? data.email.trim().toLowerCase() : ''
      if (!rawEmail || !EMAIL_RE.test(rawEmail)) {
        return Response.json({ error: 'A valid email is required' }, { status: 400 })
      }

      const name = typeof data.name === 'string' ? data.name.trim() : ''

      const rawRoles = Array.isArray(data.roles) ? data.roles : ['viewer']
      const roles: InvitableRole[] = []
      for (const role of rawRoles) {
        if (isInvitableRole(role) && !roles.includes(role)) {
          roles.push(role)
        }
      }
      if (roles.length === 0) {
        return Response.json({ error: 'A valid role is required' }, { status: 400 })
      }

      const existing = await payload.find({
        collection: 'users',
        where: { email: { equals: rawEmail } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })

      if (existing.totalDocs > 0) {
        return Response.json({ error: 'A user with that email already exists' }, { status: 409 })
      }

      // No `password` → Payload stores no hash/salt; only the invite link activates the account.
      const doc = (await payload.create({
        collection: 'users',
        data: { email: rawEmail, name, roles },
        req,
        depth: 0,
      })) as { id: number; email: string; roles?: string[] | null }

      return Response.json({ id: doc.id, email: doc.email, roles: doc.roles }, { status: 201 })
    } catch (err) {
      payload.logger.error(`[invite] ${err instanceof Error ? err.message : String(err)}`)
      return Response.json(
        { error: err instanceof Error ? err.message : 'Invitation failed' },
        { status: 500 },
      )
    }
  },
}