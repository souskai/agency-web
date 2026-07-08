'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import type { VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import React from 'react'

import type {
  CaseStudy,
  LegalPage,
  Page,
  Post,
  Service,
} from '@/payload-types'
import { prefixWithLocale, useLocale } from '@/i18n/locale'

type ButtonVariantProps = VariantProps<typeof buttonVariants>

type CMSLinkType = {
  appearance?: 'inline' | ButtonVariantProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'services' | 'case-studies' | 'legal-pages'
    value: Page | Post | Service | CaseStudy | LegalPage | string | number
  } | null
  size?: ButtonVariantProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const locale = useLocale()

  let href: string | undefined
  if (type === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
    const relationTo = reference.relationTo
    const basePath =
      relationTo === 'pages' ? '' : relationTo === 'posts' ? '/posts' : `/${relationTo}`
    const slugPath = `${basePath}/${reference.value.slug}`.replace(/^\/+/, '/')
    href = prefixWithLocale(slugPath, locale)
  } else if (url) {
    href = url.startsWith('/') ? prefixWithLocale(url, locale) : url
  } else {
    href = undefined
  }

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
