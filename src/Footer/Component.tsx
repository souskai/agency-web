import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { FooterDecor } from './Decor'

import { getLocalizedPath, type Locale } from '@/i18n/config'

export async function Footer({ locale = 'en' }: { locale?: Locale }) {
  const footerData: Footer = await getCachedGlobal('footer', 1, locale)

  const columns = footerData?.columns || []
  const legalLine = footerData?.legalLine

  const homeHref = getLocalizedPath(locale, '/')

  return (
    <footer className="relative mt-auto border-t border-border text-foreground">
      <FooterDecor />
      <div className="container relative py-8 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <Link className="flex items-center shrink-0" href={homeHref}>
            <Logo />
          </Link>

          {columns.length > 0 && (
            <nav className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-3">
                  {column.heading && <span className="label">{column.heading}</span>}
                  <ul className="flex flex-col gap-2">
                    {column.links?.map((item, i) => (
                      <li key={i}>
                        <CMSLink className="hover:underline" {...item.link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}
        </div>

        {legalLine && (
          <p className="text-sm text-muted-foreground border-t border-border pt-6">{legalLine}</p>
        )}
      </div>
    </footer>
  )
}
