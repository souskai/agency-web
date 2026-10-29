import type { BeforeEmail } from '@payloadcms/plugin-form-builder/types'

import { escapeHtml, renderEmailShell } from '@/utilities/emailTemplate'

type SubmissionField = { field: string; value: unknown }

const LABEL_OVERRIDES: Record<string, string> = {
  'full-name': 'Name',
  email: 'Email',
  company: 'Company',
  phone: 'Phone',
  'project-type': 'Project type',
  budget: 'Budget',
  message: 'Message',
}

const toLabel = (field: string): string =>
  LABEL_OVERRIDES[field] || field.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

/**
 * Builds the two transactional emails for the contact form deterministically:
 *
 *   1. internal notification -> CONTACT_NOTIFICATION_EMAIL, Reply-To the lead
 *   2. auto-reply            -> the lead, Reply-To the inbox
 *
 * It replaces whatever the admin configured in the form's `emails` array — the
 * seeded defaults still carry the Payload demo sender ("Payload <demo@…>"), and
 * the envelope must be pinned to env rather than to DB rows that drift.
 *
 * A submission is treated as the contact form iff it contains an `email` field;
 * any other form passes through untouched.
 */
export const beforeEmail: BeforeEmail = (emails, { data }) => {
  const submissionData = (data?.submissionData ?? []) as SubmissionField[]

  const values: Record<string, unknown> = Object.fromEntries(
    submissionData.map((s) => [s.field, s.value]),
  )

  const leadEmail = typeof values.email === 'string' ? values.email.trim() : ''
  if (!leadEmail) return emails

  const name = typeof values['full-name'] === 'string' ? values['full-name'].trim() : ''

  const fromName = process.env.RESEND_FROM_NAME || 'Souskai'
  const fromAddress = process.env.RESEND_FROM_ADDRESS || 'onboarding@resend.dev'
  const from = `${fromName} <${fromAddress}>`
  const inbox = process.env.CONTACT_NOTIFICATION_EMAIL || fromAddress

  const rows = submissionData
    .filter((s) => !s.field.startsWith('__'))
    .map((s) => {
      const text = String(s.value ?? '')
        .replace(/\r?\n/g, '<br>')
        .trim()
      return `<tr>
        <td style="padding:8px 12px 8px 0;font-size:12px;color:#6b7280;vertical-align:top;white-space:nowrap;">${escapeHtml(toLabel(s.field))}</td>
        <td style="padding:8px 0;font-size:15px;line-height:1.5;color:#e5e7eb;vertical-align:top;">${escapeHtml(text) || '—'}</td>
      </tr>`
    })
    .join('')

  const tableHtml = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;">${rows}</table>`

  const who = name || leadEmail

  const notification = {
    bcc: '',
    cc: '',
    from,
    replyTo: leadEmail,
    subject: `New enquiry — ${who}`,
    to: inbox,
    html: renderEmailShell({
      heading: 'New contact enquiry',
      intro: 'A visitor submitted the contact form on souskai.com.',
      bodyHtml: tableHtml,
      footerNote: `Reply-To is set to ${escapeHtml(leadEmail)}, so a direct reply reaches the lead.`,
    }),
  }

  const autoReply = {
    bcc: '',
    cc: '',
    from,
    replyTo: inbox,
    subject: 'We got your message — Souskai',
    to: leadEmail,
    html: renderEmailShell({
      heading: `Thanks${name ? `, ${name}` : ''} — message received.`,
      intro:
        'We received your enquiry and will reply within one business day, usually sooner. If it is urgent, reply to this email and it will reach us directly.',
      bodyHtml: tableHtml,
    }),
  }

  return [notification, autoReply]
}