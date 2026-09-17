import React from 'react'

/**
 * Custom logo for the Payload admin login screen.
 *
 * Colors are driven by the brand tokens in `src/app/(payload)/custom.scss`
 * (`--color-success-600` for the mark, `--color-warning-*` for the wordmark
 * and tagline), keeping the admin in sync with the design system. Replaces
 * Payload's default logo via `admin.components.graphics.Logo`.
 */
const AdminLogo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 80 80"
        style={{ height: '5rem', width: '5rem', flexShrink: 0 }}
      >
        <g stroke="var(--color-success-600)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}>
          <path d="M40 12 L66 27 L66 53 L40 68 L14 53 L14 27 Z" />
          <path d="M32 34 L26 40 L32 46" />
          <path d="M48 34 L54 40 L48 46" />
          <path d="M44 34 L36 46" />
        </g>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span
          style={{
            fontSize: '3rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--color-warning-500)',
          }}
        >
          Souskai
        </span>
        <span style={{ fontSize: '1.5rem', color: 'var(--color-warning-350)' }}>
          {'Custom Web & Mobile Development'}
        </span>
      </div>
    </div>
  )
}

export default AdminLogo
