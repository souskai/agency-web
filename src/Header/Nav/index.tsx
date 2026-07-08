'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

import { prefixWithLocale } from '@/i18n/locale'
import type { Locale } from '@/i18n/config'

export const HeaderNav: React.FC<{ data: HeaderType; locale?: Locale }> = ({
  data,
  locale = 'en',
}) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
      <Link href={prefixWithLocale('/search', locale)}>
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
