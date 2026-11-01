'use client'

import { Link, LogOutIcon, useConfig, useTranslation } from '@payloadcms/ui'
import React from 'react'

/**
 * Replaces Payload's icon-only logout with a labelled, brand-filled button in
 * the admin nav (rendered below the collections, in `nav__controls`). Styling
 * lives in `src/app/(payload)/custom.scss` under `.admin-logout`.
 */
export const AdminLogout: React.FC = () => {
  const { config } = useConfig()
  const { t } = useTranslation()
  const href = `${config.routes.admin}${config.admin.routes.logout}` // → /admin/logout

  return (
    <Link
      aria-label={t('authentication:logOut')}
      className="admin-logout"
      href={href}
      prefetch={false}
    >
      <LogOutIcon />
      <span>Log out</span>
    </Link>
  )
}

export default AdminLogout