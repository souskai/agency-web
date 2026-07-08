import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { isValidLocale, type Locale } from '@/i18n/config'

type LayoutArgs = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

async function LocaleContent({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  return (
    <>
      <Header locale={locale as Locale} />
      {children}
      <Footer locale={locale as Locale} />
    </>
  )
}

export default function LocaleLayout({ children, params }: LayoutArgs) {
  return (
    <Suspense fallback={null}>
      <LocaleContent params={params}>{children}</LocaleContent>
    </Suspense>
  )
}
