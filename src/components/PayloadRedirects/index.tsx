import type React from 'react'
import type { Page, Post } from '@/payload-types'

import { getCachedDocumentById } from '@/utilities/getDocument'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { notFound, redirect } from 'next/navigation'
import { defaultLocale, getLocalizedPath, isValidLocale, type Locale } from '@/i18n/config'

interface Props {
  disableNotFound?: boolean
  url: string
}

/** Extract locale from URL path like /about (en) or /bg/posts/slug (bg) */
function getLocaleFromUrl(url: string): Locale {
  const segments = url.replace(/^\//, '').split('/').filter(Boolean)
  const first = segments[0]
  return first && isValidLocale(first) ? first : defaultLocale
}

/** URLs to try when matching redirects (full path and legacy paths without locale) */
function getUrlsToTry(url: string): string[] {
  const normalized = url.startsWith('/') ? url : `/${url}`
  const withoutLeadingSlash = normalized.replace(/^\//, '')
  const segments = withoutLeadingSlash.split('/').filter(Boolean)
  const first = segments[0]
  const urls = [normalized]
  if (first && isValidLocale(first) && segments.length > 1) {
    urls.push(`/${segments.slice(1).join('/')}`)
  }
  return urls
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({ disableNotFound, url }) => {
  const redirects = await getCachedRedirects()
  const urlsToTry = getUrlsToTry(url)
  const locale = getLocaleFromUrl(url)

  const redirectItem = redirects.find((r) => urlsToTry.some((u) => r.from === u))

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect(redirectItem.to.url)
    }

    let redirectUrl: string

    const refValue = redirectItem.to?.reference?.value
    const collection = redirectItem.to?.reference?.relationTo
    if ((typeof refValue === 'string' || typeof refValue === 'number') && collection) {
      const document = (await getCachedDocumentById(
        collection,
        refValue,
        undefined,
        locale,
      )) as Page | Post
      const slug = document?.slug
      const path =
        collection === 'pages'
          ? slug === 'home'
            ? '/'
            : `/${slug}`
          : `/posts/${slug}`
      redirectUrl = getLocalizedPath(locale, path)
    } else {
      const slug =
        typeof refValue === 'object' && refValue !== null
          ? (refValue as { slug?: string })?.slug
          : ''
      const path =
        collection === 'pages'
          ? slug === 'home'
            ? '/'
            : `/${slug}`
          : `/posts/${slug}`
      redirectUrl = getLocalizedPath(locale, path)
    }

    if (redirectUrl) redirect(redirectUrl)
  }

  if (disableNotFound) return null

  notFound()
}
