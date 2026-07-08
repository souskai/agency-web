import { draftMode } from 'next/headers'
import React from 'react'

import { AdminBar } from './index'

/**
 * Server component that reads draftMode and passes to AdminBar.
 * Wrapped in Suspense in layout to avoid blocking the route.
 */
export async function AdminBarWrapper() {
  const { isEnabled } = await draftMode()

  return <AdminBar adminBarProps={{ preview: isEnabled }} />
}
