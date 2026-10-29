import { createLocalReq, getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(): Promise<Response> {
  // Destructive gate: seed() deletes 17 collections and re-creates every doc with
  // a new ID (see .clinerules Rule #17). Opt-in required; never against prod by default.
  if (process.env.SEED_ALLOW_DESTRUCTIVE !== 'true') {
    return new Response('Seeding is disabled. Set SEED_ALLOW_DESTRUCTIVE=true to enable.', { status: 403 })
  }

  if (process.env.VERCEL_ENV === 'production' && process.env.ALLOW_PROD_SEED !== 'true') {
    return new Response('Seeding production is disabled.', { status: 403 })
  }

  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate by passing request headers
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user || !user.roles?.includes('admin')) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    // Create a Payload request object to pass to the Local API for transactions
    // At this point you should pass in a user, locale, and any other context you need for the Local API
    const payloadReq = await createLocalReq({ user }, payload)

    await seed({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (e) {
    const err = e as {
      message?: string
      data?: unknown
      cause?: { constraint?: string; detail?: string }
    }
    payload.logger.error({ err: e, message: 'Error seeding data' })
    return Response.json(
      {
        error: err.message ?? 'Unknown error',
        data: err.data ?? null,
        constraint: err.cause?.constraint ?? null,
        detail: err.cause?.detail ?? null,
      },
      { status: 500 },
    )
  }
}
