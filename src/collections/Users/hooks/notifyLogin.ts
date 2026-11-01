import type { CollectionAfterLoginHook } from 'payload'

import type { User } from '@/payload-types'

import { getServerSideURL } from '@/utilities/getURL'

/**
 * Notifies the owner when a non-admin user (invitee) signs in, and logs every
 * login to the Payload logger (visible in Vercel runtime logs). The admin's own
 * logins are logged but not emailed to keep the inbox quiet.
 *
 * Wired via `Users.hooks.afterLogin`; IP + user-agent come from the request
 * headers because Payload's `users_sessions` rows don't store them.
 */
export const notifyLogin: CollectionAfterLoginHook<User> = async ({ req, user }) => {
  const { payload } = req

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0]?.trim() || 'unknown'
  const ua = req.headers.get('user-agent') ?? 'unknown'
  const roles = (user.roles ?? []).join(', ') || 'viewer'
  const when = new Date().toISOString()

  payload.logger.info(`[admin-login] ${user.email} roles=${roles} ip=${ip} ua="${ua}"`)

  // Only email for invitees (non-admin) so the owner's own logins don't spam.
  if (user.roles?.includes('admin')) return user

  const to = process.env.CONTACT_NOTIFICATION_EMAIL || process.env.RESEND_FROM_ADDRESS
  if (!to || !user.email) return user

  const serverUrl = getServerSideURL()
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Admin login</title>
  </head>
  <body style="margin:0;padding:0;background:#0b0d12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e5e7eb;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0b0d12;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
            <tr>
              <td style="padding:0 0 16px 0;">
                <h1 style="margin:0;font-size:20px;line-height:1.3;color:#f9fafb;">Admin login</h1>
                <p style="margin:12px 0 0 0;font-size:15px;line-height:1.6;color:#9ca3af;">A user signed in to the Souskai admin panel.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;background:#11151d;border:1px solid #1f2530;border-radius:12px;font-size:14px;line-height:1.7;color:#9ca3af;">
                <p style="margin:0 0 8px 0;"><strong style="color:#e5e7eb;">Email:</strong> ${escapeHtml(user.email)}</p>
                <p style="margin:0 0 8px 0;"><strong style="color:#e5e7eb;">Role:</strong> ${escapeHtml(roles)}</p>
                <p style="margin:0 0 8px 0;"><strong style="color:#e5e7eb;">Time (UTC):</strong> ${escapeHtml(when)}</p>
                <p style="margin:0 0 8px 0;"><strong style="color:#e5e7eb;">IP:</strong> ${escapeHtml(ip)}</p>
                <p style="margin:0;"><strong style="color:#e5e7eb;">User agent:</strong> ${escapeHtml(ua)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 0 0 0;">
                <p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280;"><a href="${serverUrl}/admin" style="color:#60a5fa;">Open the admin panel</a> to review activity.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  try {
    await payload.sendEmail({
      to,
      subject: `Admin login: ${user.email} (${roles})`,
      html,
    })
  } catch (err) {
    payload.logger.error(`[admin-login] notification email failed: ${String(err)}`)
  }

  return user
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;')
}