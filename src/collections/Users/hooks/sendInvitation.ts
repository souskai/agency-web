import type { CollectionAfterChangeHook } from 'payload'

import type { User } from '@/payload-types'

import { getServerSideURL } from '@/utilities/getURL'

/**
 * Sends a branded "set your password" invitation when an admin creates a new
 * non-admin user (publisher/editor/viewer). Uses Payload's forgot-password
 * token (with the built-in email disabled) so the invitee chooses their own
 * password via the reset link — no plaintext password is ever emailed.
 */
export const sendInvitation: CollectionAfterChangeHook<User> = async ({
  doc,
  operation,
  req,
}) => {
  // Only on creation, only when an authenticated admin is creating
  // (skips bootstrap + seed/scripts), and never for admin accounts.
  if (operation !== 'create') return doc
  if (!req.user) return doc
  if (doc.roles?.includes('admin')) return doc

  const { payload } = req
  const email = doc.email
  if (!email) return doc

  const name = escapeHtml(doc.name || 'there')
  const brand = 'Souskai'
  const serverUrl = getServerSideURL()

  // Generate a reset token WITHOUT sending Payload's default email.
  const token = await payload.forgotPassword({
    collection: 'users',
    data: { email },
    disableEmail: true,
  })

  const setPasswordURL = `${serverUrl}/admin/reset-password?token=${token}`

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>You've been invited to ${brand}</title>
  </head>
  <body style="margin:0;padding:0;background:#0b0d12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e5e7eb;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0b0d12;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
            <tr>
              <td style="padding:0 0 24px 0;">
                <h1 style="margin:0;font-size:24px;line-height:1.3;color:#f9fafb;">You've been invited to write for ${brand}</h1>
                <p style="margin:12px 0 0 0;font-size:15px;line-height:1.6;color:#9ca3af;">Hi ${name} — we'd love to collaborate with you. You now have a contributor account on our site.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;background:#11151d;border:1px solid #1f2530;border-radius:12px;">
                <h2 style="margin:0 0 8px 0;font-size:16px;color:#f9fafb;">1. Set your password</h2>
                <p style="margin:0 0 16px 0;font-size:14px;line-height:1.6;color:#9ca3af;">Click below to choose your own password (for security, we never email one).</p>
                <p style="margin:0 0 16px 0;">
                  <a href="${setPasswordURL}" style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;">Set my password</a>
                </p>
                <p style="margin:0;font-size:12px;line-height:1.6;color:#6b7280;word-break:break-all;">Or paste this into your browser:<br/><a href="${setPasswordURL}" style="color:#60a5fa;">${setPasswordURL}</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 0 0 0;">
                <h2 style="margin:0 0 8px 0;font-size:16px;color:#f9fafb;">2. Sign in &amp; write</h2>
                <ol style="margin:0;padding-left:20px;font-size:14px;line-height:1.7;color:#9ca3af;">
                  <li>Go to <a href="${serverUrl}/admin" style="color:#60a5fa;">${serverUrl}/admin</a> and sign in with this email.</li>
                  <li>Open <strong style="color:#e5e7eb;">Posts → Create New</strong> to draft a blog post.</li>
                  <li>Add your title, content, and images, then <strong style="color:#e5e7eb;">Publish</strong>.</li>
                  <li>You can also draft <strong style="color:#e5e7eb;">Pages</strong> — our editors review and publish those.</li>
                </ol>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 0 0 0;">
                <p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280;">Your workspace runs on <strong style="color:#e5e7eb;">Payload CMS</strong> — a modern, code-first content platform. No coding needed on your end; it's all point-and-click.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 0 0 0;border-top:1px solid #1f2530;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#6b7280;">Have a question? Just reply to this email.<br/>&copy; ${new Date().getFullYear()} ${brand}</p>
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
      to: email,
      subject: `You've been invited to write for ${brand}`,
      html,
    })
  } catch (err) {
    // Fall back to logging the URL so the flow stays testable without Resend.
    payload.logger.error(`Failed to send invitation to ${email}: ${String(err)}`)
    payload.logger.info(`Invitation URL for ${email}: ${setPasswordURL}`)
  }

  return doc
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
