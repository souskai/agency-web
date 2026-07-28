/**
 * One-off script: creates or updates an admin user via Payload Local API.
 * Bypasses access control (overrideAccess: true) so it works even when
 * the bootstrap window has closed.
 *
 * Usage:
 *   pnpm tsx scripts/create-admin.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.js'

async function main() {
  const payload = await getPayload({ config })

  const email = 'souskaidev@gmail.com'
  const password = 'TempAdmin123!'
  const name = 'Test Admin'

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
    console.log(`   Password reset to: ${password}`)
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
    console.log(`✅ Created new user: ${email} (id: ${user.id})`)
    console.log(`   Password: ${password}`)
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
