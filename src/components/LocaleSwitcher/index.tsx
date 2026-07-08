'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { locales, localeLabels, isValidLocale, type Locale } from '@/i18n/config'
import { prefixWithLocale } from '@/i18n/locale'

/**
 * Renders a locale switcher (e.g. EN | BG) that preserves the current path when switching.
 */
export const LocaleSwitcher: React.FC<{ currentLocale: Locale; className?: string }> = ({
  currentLocale,
  className = '',
}) => {
  const pathname = usePathname()

  const pathSegments = pathname?.split('/').filter(Boolean) ?? []
  const firstSegment = pathSegments[0]
  const isLocaleInPath = firstSegment && isValidLocale(firstSegment)
  const pathWithoutLocale = isLocaleInPath ? pathSegments.slice(1) : pathSegments
  const basePath = pathWithoutLocale.length ? `/${pathWithoutLocale.join('/')}` : ''

  return (
    <nav className={className} aria-label="Language switcher">
      <ul className="flex items-center gap-2">
        {locales.map((locale, i) => {
          const href = prefixWithLocale(basePath || '/', locale)
          const isActive = locale === currentLocale
          return (
            <li key={locale}>
              {i > 0 && <span className="text-muted-foreground mx-1" aria-hidden>|</span>}
              <Link
                href={href}
                className={`text-sm font-medium transition-colors hover:underline ${
                  isActive ? 'underline' : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {localeLabels[locale].slice(0, 2).toUpperCase()}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
