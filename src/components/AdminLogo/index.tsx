import React from 'react'

/**
 * Custom logo for the Payload admin login screen. The mark is served from
 * `public/favicon.svg` (the same asset as the site favicon) so the admin
 * always matches the public brand. Replaces Payload's default logo via
 * `admin.components.graphics.Logo`.
 */
const AdminLogo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <img
        alt=""
        aria-hidden="true"
        src="/favicon.svg"
        style={{ height: '5rem', width: 'auto', flexShrink: 0 }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span
          style={{
            fontSize: '3rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--theme-success-500)',
          }}
        >
          Souskai
        </span>
        <span style={{ fontSize: '1.5rem', color: 'var(--theme-elevation-600)' }}>
          {'Custom Web & Mobile Development'}
        </span>
      </div>
    </div>
  )
}

export default AdminLogo
