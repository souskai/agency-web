import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { defaultLocale, locales } from '@/i18n/config'

/**
 * Proxy for locale-aware routing:
 * - Default locale (en) has no URL prefix: /, /about, /posts
 * - Secondary locales use prefix: /bg, /bg/za-nas
 * - Redirects /en and /en/* to /* so users never see /en in the URL
 * - Rewrites / and /* (without locale) to /en/* so [locale] routes receive the request
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, api, admin, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/admin') ||
    pathname.includes('/api/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/next/') ||
    /\.(ico|png|jpg|jpeg|gif|svg|webp|woff2?)$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0] ?? ''
  const hasLocalePrefix = locales.includes(firstSegment as (typeof locales)[number])

  // Redirect /en and /en/* to /* (hide default locale from URL)
  if (firstSegment === defaultLocale) {
    const pathWithoutLocale = pathname === `/${defaultLocale}` ? '/' : pathname.slice(`/${defaultLocale}`.length) || '/'
    return NextResponse.redirect(new URL(pathWithoutLocale, request.url), 308)
  }

  // Rewrite / and /* (no locale) to /en/* so [locale] routes can match
  if (!hasLocalePrefix) {
    const pathWithLocale = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
    return NextResponse.rewrite(new URL(pathWithLocale, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
