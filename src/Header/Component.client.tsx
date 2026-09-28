'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'
import { HeaderDecor } from './Decor'
import { HeaderNav } from './Nav'
import { MobileNav } from './MobileNav'
import { prefixWithLocale, useLocale } from '@/i18n/locale'
import type { Locale } from '@/i18n/config'

interface HeaderClientProps {
  data: Header
  locale?: Locale
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const locale = useLocale()
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed left-0 right-0 z-40 h-20 bg-background border-b border-border text-foreground transition-transform duration-300 top-[var(--admin-bar-height,0px)] ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <HeaderDecor />
      <div className="container relative py-4">
        <div className="grid grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
          <Link className="w-fit" href={prefixWithLocale('/', locale)}>
            <Logo loading="eager" priority="high" />
          </Link>
          <HeaderNav data={data} />
          <div className="flex items-center justify-end gap-2">
            {data.ctaButtons?.map(({ link }, i) => (
              <CMSLink key={i} {...link} size="sm" className="hidden md:inline-flex" />
            ))}
            <div className="hidden md:flex">
              <ThemeToggle />
            </div>
            <MobileNav data={data} />
          </div>
        </div>
      </div>
    </header>
  )
}
