/**
 * Shared, on-brand HTML shell for transactional emails.
 *
 * Callers own the copy; this module only wraps it. Keeps the contact
 * notification / auto-reply (and future invite/reset templates) visually
 * consistent without duplicating the dark-shell markup a fourth time.
 */

const ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export const escapeHtml = (input: string): string =>
  input.replace(/[&<>"']/g, (char) => ENTITIES[char])

type EmailShellArgs = {
  brand?: string
  heading: string
  intro: string
  bodyHtml: string
  footerNote?: string
}

export const renderEmailShell = ({
  brand = 'Souskai',
  heading,
  intro,
  bodyHtml,
  footerNote,
}: EmailShellArgs): string => `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;padding:0;background:#0b0d12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e5e7eb;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0b0d12;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
            <tr>
              <td style="padding:0 0 24px 0;">
                <h1 style="margin:0;font-size:24px;line-height:1.3;color:#f9fafb;">${escapeHtml(heading)}</h1>
                <p style="margin:12px 0 0 0;font-size:15px;line-height:1.6;color:#9ca3af;">${escapeHtml(intro)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px;background:#11151d;border:1px solid #1f2530;border-radius:12px;">
                ${bodyHtml}
              </td>
            </tr>
            ${
              footerNote
                ? `<tr>
                    <td style="padding:16px 0 0 0;font-size:12px;line-height:1.6;color:#4b5563;">${footerNote}</td>
                  </tr>`
                : ''
            }
            <tr>
              <td style="padding:16px 0 0 0;font-size:11px;color:#4b5563;">&copy; ${new Date().getFullYear()} ${escapeHtml(brand)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`