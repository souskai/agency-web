/**
 * One-off script: creates or updates an admin user via Payload Local API.
 * Bypasses access control (overrideAccess: true) so it works even when
 * the bootstrap window has closed.
 *
 * Usage:
 *   pnpm tsx scripts/create-admin.ts
 *
 * Environment variables (set in .env or pass inline):
 *   ADMIN_EMAIL     — the email address for the admin user (required)
 *   ADMIN_PASSWORD  — the password for the admin user (required)
 *   ADMIN_NAME      — the display name (optional, defaults to "Admin")
 *
 * Examples:
 *   # Local dev
 *   pnpm tsx scripts/create-admin.ts
 *
 *   # Against production DB (set DATABASE_URL inline)
 *   DATABASE_URL=your_prod_url ADMIN_EMAIL=you@domain.com ADMIN_PASSWORD=StrongPass123 pnpm tsx scripts/create-admin.ts
 *
 * ⚠️ Never commit secrets to git. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env
 * (gitignored) or pass them as environment variables at runtime.
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME || 'Admin'

  if (!email || !password) {
    console.error(
      '❌ ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required.\n' +
        '   Set them in .env or pass inline:\n' +
        '   ADMIN_EMAIL=you@domain.com ADMIN_PASSWORD=YourPassword pnpm tsx scripts/create-admin.ts',
    )
    process.exit(1)
  }

  if (password.length < 8) {
    console.error('❌ ADMIN_PASSWORD must be at least 8 characters.')
    process.exit(1)
  }

  const payload = await getPayload({ config })

  // Check if user already exists
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs.length > 0) {
    // Update existing user's password and ensure admin role
    const user = existing.docs[0]
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password,
        roles: ['admin'],
        name,
      },
      overrideAccess: true,
    })
    console.log(`✅ Updated existing user: ${email} (id: ${user.id})`)
    console.log('   Password has been reset. The user should change it after logging in.')
  } else {
    // Create new user
    const user = await payload.create({
      collection: 'users',
      data: {
        email,
        password,
        name,
        roles: ['admin'],
      },
      overrideAccess: true,
    })
    console.log(`✅ Created new admin user: ${email} (id: ${user.id})`)
    console.log('   The user should change their password after first login.')
  }

  // List all users for reference
  const allUsers = await payload.find({
    collection: 'users',
    overrideAccess: true,
    limit: 100,
  })
  console.log(`\n📋 All users in database (${allUsers.totalDocs} total):`)
  for (const u of allUsers.docs) {
    console.log(`   - ${u.email} | roles: ${(u as any).roles?.join(', ') || 'none'} | id: ${u.id}`)
  }

  await payload.destroy()
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Failed:', err)
  process.exit(1)
})
