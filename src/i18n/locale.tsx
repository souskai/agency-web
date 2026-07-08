'use client'

import { usePathname } from 'next/navigation'

import { defaultLocale, isValidLocale, type Locale } from './config'

/**
 * Get the current locale from the URL path.
 * Default locale (en) has no prefix; secondary locales (bg) appear as first segment.
 */
export function useLocale(): Locale {
  const pathname = usePathname()
  const segment = pathname?.split('/').filter(Boolean)[0]
  return segment && isValidLocale(segment) ? segment : defaultLocale
}

/**
 * Format a path with locale. Default locale has no prefix; others use /{locale}.
 */
export function prefixWithLocale(path: string, locale: Locale): string {
  if (!path || path === '/') return locale === defaultLocale ? '/' : `/${locale}`
  const clean = path.startsWith('/') ? path : `/${path}`
  return locale === defaultLocale ? clean : `/${locale}${clean}`
}
