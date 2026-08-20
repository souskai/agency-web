import type { Metadata } from 'next'

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSettings = (await getCachedGlobal('site-settings', 1)) as SiteSetting
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
        {favicon ? (
          <link href={favicon} rel="icon" />
        ) : (
          <>
            <link href="/favicon.ico" rel="icon" sizes="32x32" />
            <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
          </>
        )}
      </head>
      <body>
        <Providers>
          <Suspense fallback={null}>
            <AdminBarWrapper />
          </Suspense>
          <div className="pt-20">{children}</div>
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
      creator: twitterCreator,
    },
  }
}
