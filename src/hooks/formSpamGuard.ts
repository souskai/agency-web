import type { CollectionBeforeValidateHook, PayloadRequest } from 'payload'
import { APIError } from 'payload'

type SubmissionField = { field: string; value: unknown }

/**
 * Lightweight anti-spam for the public /api/form-submissions endpoint.
 *
 * Three best-effort layers (no external service, Hobby plan so no edge WAF):
 *   1. Honeypot — a visually-hidden field only bots fill; rejected if non-empty.
 *   2. Min-fill — a hidden render timestamp; rejected if submitted in < 2s.
 *   3. Throttle — per-IP in-memory cap. Serverless caveat: the map is per warm
 *      instance, so this fences bursts, not a coordinated botnet.
 */
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 6
const MIN_FILL_MS = 2_000

const hits = new Map<string, number[]>()

const clientIp = (req: PayloadRequest): string => {
  const fwd = req?.headers?.get?.('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return 'unknown'
}

export const formSpamGuard: CollectionBeforeValidateHook = ({ data, operation, req }) => {
  if (operation !== 'create') return data

  const submissionData = (data?.submissionData ?? []) as SubmissionField[]
  const values = Object.fromEntries(submissionData.map((s) => [s.field, s.value]))

  const honeypot = typeof values.__honeypot === 'string' ? values.__honeypot : ''
  if (honeypot.trim() !== '') {
    throw new APIError('Request blocked.', 400, undefined, true)
  }

  const startedAt = Number(values.__started_at || 0)
  if (startedAt && Date.now() - startedAt < MIN_FILL_MS) {
    throw new APIError('Please take a moment before submitting.', 400, undefined, true)
  }

  // Never persist the guard fields or surface them in the admin UI.
  if (data) {
    data.submissionData = submissionData.filter(
      (s) => s.field !== '__honeypot' && s.field !== '__started_at',
    )
  }

  const ip = clientIp(req)
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)

  if (recent.length > MAX_PER_WINDOW) {
    throw new APIError('Too many submissions — please try again shortly.', 429, undefined, true)
  }

  return data
}