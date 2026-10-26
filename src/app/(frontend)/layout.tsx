import type { Metadata, Viewport } from 'next'

import { fontDisplay, fontMono, fontSans } from '@/config/fonts'
import { cn } from '@/utilities/ui'
import React, { Suspense } from 'react'

import { AdminBarWrapper } from '@/components/AdminBar/AdminBarWrapper'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'

import type { SiteSetting } from '@/payload-types'

import './globals.css'

const FALLBACK_SITE_NAME = 'Souskai'

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

/**
 * Real profile URLs only. A bare domain (`https://x.com`) shipped as `sameAs`
 * in structured data is worse than shipping none.
 */
const collectSameAs = (links: SiteSetting['socialLinks']): string[] =>
  (links ?? [])
    .map((link) => link?.url)
    .filter((url): url is string => {
      if (!url) return false
      try {
        const { hostname, pathname } = new URL(url)
        return hostname.includes('.') && pathname.replace(/\/+$/, '').length > 0
      } catch {
        return false
      }
    })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = (await getCachedGlobal('site-settings', 1)) as SiteSetting
  const siteName = siteSettings?.siteName || FALLBACK_SITE_NAME
  const serverUrl = getServerSideURL()
  const sameAs = collectSameAs(siteSettings?.socialLinks)

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: serverUrl,
      logo: `${serverUrl}/icon-512.png`,
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: serverUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${serverUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  const favicon =
    siteSettings?.favicon &&
    typeof siteSettings.favicon === 'object' &&
    'url' in siteSettings.favicon
      ? getServerSideURL() + (siteSettings.favicon.url ?? '')
      : null

  return (
    <html
      className={cn(fontSans.variable, fontDisplay.variable, fontMono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        {favicon ? (
          <link href={favicon} rel="icon" />
        ) : (
          <>
            <link href="/favicon.ico" rel="icon" sizes="32x32" />
            <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
            <link href="/favicon-48.png" rel="icon" type="image/png" sizes="48x48" />
            <link href="/icon.png" rel="icon" type="image/png" sizes="512x512" />
          </>
        )}
        <link href="/apple-icon.png" rel="apple-touch-icon" sizes="180x180" />
      </head>
      <body>
        <Providers>
          <Suspense fallback={null}>
            <AdminBarWrapper />
          </Suspense>
          <div className="pt-[var(--header-height)]">{children}</div>
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = (await getCachedGlobal('site-settings', 1)) as SiteSetting
  const twitterCreator = siteSettings?.twitterHandle ? `@${siteSettings.twitterHandle}` : undefined

  return {
    metadataBase: new URL(getServerSideURL()),
    openGraph: await mergeOpenGraph(),
    twitter: {
      card: 'summary_large_image',
      site: twitterCreator,
      creator: twitterCreator,
    },
  }
}
