import { getPayload } from 'payload'
import { randomBytes } from 'node:crypto'

import config from '../../src/payload.config.js'

const TEST_EMAIL = 'dev@payloadcms.com'

/**
 * The e2e suite creates an `admin` user wherever `DATABASE_URL` points. A local
 * `pnpm dev` uses the PRODUCTION Neon database (single shared DB), so running
 * these tests would plant an admin login on the live site at a public `/admin`.
 *
 * Hard stop: refuse to seed against a non-local host. Escape hatch for
 * intentional runs (CI with a throwaway DB, or until FR-005 moves dev to an
 * isolated Neon branch): `ALLOW_E2E_SHARED_DB=true`.
 */
function assertSafeDatabase(): void {
  if (process.env.ALLOW_E2E_SHARED_DB === 'true') {
    console.warn('[e2e] ALLOW_E2E_SHARED_DB=true — seeding an admin user into the shared database.')
    return
  }

  const host = process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).hostname : ''
  const isLocal =
    host === 'localhost' || host.startsWith('127.') || host === '::1' || host === '0.0.0.0'

  if (!isLocal) {
    throw new Error(
      `[e2e] Refusing to seed an admin user into a non-local database (host "${host}").\n` +
        `Set ALLOW_E2E_SHARED_DB=true to override, or point DATABASE_URL at a local Postgres ` +
        `(see FR-005 in docs/present-state-future.md).`,
    )
  }
}

/**
 * Per-run random password: even if a run is aborted before `cleanupTestUser()`,
 * any leftover account is not guessable (the old fixed `'test'` password made a
 * stray row an admin backdoor on the public `/admin`).
 */
export const testUser = {
  email: TEST_EMAIL,
  password: randomBytes(24).toString('hex'),
  roles: ['admin'] as ('admin' | 'editor' | 'publisher' | 'viewer')[],
}

/**
 * Seeds a test user for e2e admin tests.
 */
export async function seedTestUser(): Promise<void> {
  assertSafeDatabase()

  const payload = await getPayload({ config })

  // Delete existing test user if any
  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })

  // Create fresh test user
  await payload.create({
    collection: 'users',
    data: testUser,
    draft: false,
  })
}

/**
 * Cleans up test user after tests
 */
export async function cleanupTestUser(): Promise<void> {
  const payload = await getPayload({ config })

  await payload.delete({
    collection: 'users',
    where: {
      email: {
        equals: testUser.email,
      },
    },
  })
}
