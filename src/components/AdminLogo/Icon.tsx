import React from 'react'

/**
 * Brand icon for the admin navigation sidebar. Served from `public/favicon.svg`
 * so the panel mark always matches the public site. Replaces Payload's default
 * `Icon` via `admin.components.graphics.Icon`.
 */
const AdminIcon: React.FC = () => (
  <img alt="" aria-hidden="true" src="/favicon.svg" style={{ height: 26, width: 'auto' }} />
)

export default AdminIcon