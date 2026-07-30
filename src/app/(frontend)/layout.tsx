import type { Metadata } from 'next'

import { fontDisplay, fontMono, fontSans } from '@/config/fonts'
import { cn } from '@/utilities/ui'
import React, { Suspense } from 'react'

import { AdminBarWrapper } from '@/components/AdminBar/AdminBarWrapper'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={cn(fontSans.variable, fontDisplay.variable, fontMono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
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

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
