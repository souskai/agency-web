import type { Access, CollectionConfig, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

import { authenticated } from '../../access/authenticated'
import { hasRole } from '../../access/hasRole'

/**
 * Roles available to authenticated admin users.
 * - `admin`       — full access, can manage users and roles
 * - `editor`      — can create/update/delete content; cannot manage users
 * - `viewer`      — read-only across the site (intended for client demos)
 */
export const ROLES = ['admin', 'editor', 'viewer'] as const
export type Role = (typeof ROLES)[number]

/**
 * Only admins may change role assignments. Non-admins (and admins editing
 * themselves) cannot change the `roles` field.
 */
const preventSelfOrNonAdminRoleUpdate: FieldAccess = ({ req: { user }, id }) => {
  if (!user) return false
  if (user.roles?.includes('admin')) {
    // Admins can change anyone's roles, but not their own (avoid lock-out)
    return user.id !== id
  }
  return false
}

/**
 * Allow user creation only when no users exist yet (bootstrap), or when the
 * requester is an admin. Prevents creating additional top-level admin
 * accounts outside the bootstrap window.
 */
const createUser: Access = async ({ req }) => {
  if (req.user) {
    return Boolean(req.user.roles?.includes('admin'))
  }

  // Bootstrap: if there are zero users in the DB, allow the very first create
  const { payload } = req
  const { totalDocs } = await payload.count({
    collection: 'users',
    overrideAccess: true,
  })
  return totalDocs === 0
}

const updateOwnOrAdmin: Access = ({ req: { user }, id }) => {
  if (!user) return false
  if (user.roles?.includes('admin')) return true
  return user.id === id
}

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: createUser,
    delete: hasRole(['admin']),
    read: authenticated,
    update: updateOwnOrAdmin,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7, // 7 days
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
    forgotPassword: {
      // Branded HTML for the password-reset email. The default Payload
      // template works but is unbranded; we override with the agency look.
      generateEmailHTML: (args) => {
        const { token, user } = args as { token: string; user: User }
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        // Payload exposes the reset-password UI at /admin/reset-password?token=<token>
        const resetPasswordURL = `${serverUrl}/admin/reset-password?token=${token}`

        const brand = 'Agency Admin'
        const supportEmail = process.env.RESEND_FROM_ADDRESS || 'onboarding@resend.dev'

        return `
          <!doctype html>
          <html>
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Reset your ${brand} password</title>
            </head>
            <body style="margin:0;padding:0;background:#0b0d12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e5e7eb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0b0d12;padding:32px 16px;">
                <tr>
                  <td align="center">
                    <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#11141b;border:1px solid #1f2530;border-radius:12px;padding:32px;">
                      <tr>
                        <td>
                          <h1 style="margin:0 0 8px 0;font-size:22px;line-height:1.3;color:#ffffff;">
                            Reset your password
                          </h1>
                          <p style="margin:0 0 24px 0;font-size:14px;line-height:1.6;color:#9ca3af;">
                            Hi ${escapeHtml(user.name || user.email || 'there')},<br />
                            We received a request to reset the password for your ${brand} account.
                          </p>
                          <p style="margin:0 0 24px 0;font-size:14px;line-height:1.6;color:#9ca3af;">
                            Click the button below to choose a new password. This link expires in one hour.
                          </p>
                          <p style="margin:0 0 32px 0;">
                            <a href="${resetPasswordURL}" style="display:inline-block;background:#3b82f6;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:8px;">
                              Reset password
                            </a>
                          </p>
                          <p style="margin:0 0 8px 0;font-size:12px;line-height:1.6;color:#6b7280;">
                            Or paste this URL into your browser:
                          </p>
                          <p style="margin:0 0 24px 0;font-size:12px;line-height:1.6;color:#9ca3af;word-break:break-all;">
                            <a href="${resetPasswordURL}" style="color:#60a5fa;text-decoration:underline;">${resetPasswordURL}</a>
                          </p>
                          <hr style="border:none;border-top:1px solid #1f2530;margin:24px 0;" />
                          <p style="margin:0;font-size:12px;line-height:1.6;color:#6b7280;">
                            If you didn't request this, you can safely ignore this email.<br />
                            Need help? Contact <a href="mailto:${supportEmail}" style="color:#60a5fa;">${supportEmail}</a>.
                          </p>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:16px 0 0 0;font-size:11px;color:#4b5563;">
                      &copy; ${new Date().getFullYear()} ${brand}
                    </p>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `
      },
      generateEmailSubject: () => {
        const brand = 'Agency Admin'
        return `Reset your ${brand} password`
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: ROLES.map((role) => ({
        label: role.charAt(0).toUpperCase() + role.slice(1),
        value: role,
      })),
      defaultValue: ['viewer'],
      // `required: true` is enforced at runtime by `defaultValue`; keeping
      // the field non-required at the type level avoids breaking existing
      // callers of `payload.create({ collection: 'users', data: {...} })`
      // (seed scripts, tests) that rely on the default kicking in.
      required: false,
      saveToJWT: true,
      access: {
        // Field-level: only admins (and not on themselves) can update roles
        update: preventSelfOrNonAdminRoleUpdate,
        create: ({ req: { user } }) => {
          // Only admins can set roles on create; otherwise defaultValue applies
          return Boolean(user?.roles?.includes('admin'))
        },
      },
      admin: {
        description:
          'Admin = full access. Editor = manage content. Viewer = read-only (client demo accounts).',
      },
    },
  ],
  timestamps: true,
}

/**
 * Tiny HTML escape for safe interpolation in the email template.
 * The token and URLs are generated by Payload — but `user.name` and
 * `user.email` may contain user-supplied content.
 */
// Composed at runtime so the editor/linter doesn't rewrite HTML entity tokens.
const HTML_ENTITIES = {
  amp: String.fromCharCode(0x26) + 'amp;', // &
  lt: String.fromCharCode(0x3c) + 'lt;', // <
  gt: String.fromCharCode(0x3e) + 'gt;', // >
  quot: String.fromCharCode(0x22) + 'quot;', // "
  apos: String.fromCharCode(0x27) + '#39;', // &#39;
} as const

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, HTML_ENTITIES.amp)
    .replace(/</g, HTML_ENTITIES.lt)
    .replace(/>/g, HTML_ENTITIES.gt)
    .replace(/"/g, HTML_ENTITIES.quot)
    .replace(/'/g, HTML_ENTITIES.apos)
}
