/**
 * Frontend i18n configuration. Matches Payload localization locales.
 * Used for URL routing and UI translations.
 */
export const locales = ['en', 'bg'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  bg: 'Bulgarian',
}

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

/**
 * Canonical path for a locale. Default locale has no prefix.
 */
export function getLocalizedPath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path || '/'
  const clean = path.startsWith('/') ? path : `/${path}`
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}
