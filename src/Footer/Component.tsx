import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

import { getLocalizedPath, type Locale } from '@/i18n/config'

export async function Footer({ locale = 'en' }: { locale?: Locale }) {
  const footerData: Footer = await getCachedGlobal('footer', 1, locale)

  const columns = footerData?.columns || []
  const legalLine = footerData?.legalLine
  const socialLinks = footerData?.socialLinks || []

  const homeHref = getLocalizedPath(locale, '/')

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <Link className="flex items-center shrink-0" href={homeHref}>
            <Logo />
          </Link>

          {columns.length > 0 && (
            <nav className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-3">
                  {column.heading && (
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      {column.heading}
                    </span>
                  )}
                  <ul className="flex flex-col gap-2">
                    {column.links?.map((item, i) => (
                      <li key={i}>
                        <CMSLink className="text-white hover:underline" {...item.link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}

          <div className="flex flex-col gap-4 md:items-end">
            <ThemeSelector />
            {socialLinks.length > 0 && (
              <ul className="flex gap-4">
                {socialLinks.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.url ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-white transition-colors"
                      aria-label={item.platform ?? 'Social link'}
                    >
                      {item.platform}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {legalLine && (
          <p className="text-sm text-muted-foreground border-t border-border pt-6">
            {legalLine}
          </p>
        )}
      </div>
    </footer>
  )
}
