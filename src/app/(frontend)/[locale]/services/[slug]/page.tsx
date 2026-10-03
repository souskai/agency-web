import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React, { cache } from 'react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { RenderHero } from '@/heros/RenderHero'
import { getLocalizedPath, isValidLocale, type Locale } from '@/i18n/config'
import { getTranslations } from '@/i18n/translations'
import { generateMeta } from '@/utilities/generateMeta'
import type { Service } from '@/payload-types'

import PageClient from './page.client'

type Args = {
  params: Promise<{ locale: string; slug?: string }>
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const locales: Locale[] = ['en', 'bg']
    const allParams: { locale: string; slug: string }[] = []

    for (const locale of locales) {
      const services = await payload.find({
        collection: 'services',
        draft: false,
        limit: 1000,
        locale,
        overrideAccess: false,
        pagination: false,
        select: { slug: true },
      })
      const slugs = services.docs.map((doc) => ({ locale, slug: doc.slug as string }))
      allParams.push(...slugs)
    }

    // Next.js 16 Cache Components require at least one param for build-time validation
    if (allParams.length === 0) {
      return [{ locale: 'en', slug: 'placeholder' }]
    }
    return allParams
  } catch {
    return [{ locale: 'en', slug: 'placeholder' }]
  }
}

export default async function Service({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale: localeParam, slug = '' } = await paramsPromise
  const locale = isValidLocale(localeParam) ? localeParam : 'en'
  const decodedSlug = decodeURIComponent(slug)
  const url = getLocalizedPath(locale, `/services/${decodedSlug}`)
  const service = await queryServiceBySlug({ slug: decodedSlug, locale })

  if (!service) return <PayloadRedirects url={url} />

  const t = getTranslations(locale)
  const relatedServices = (service.relatedServices ?? []).filter(
    (related): related is Service => typeof related === 'object',
  )

  return (
    <article className="pt-16 pb-16">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <RenderHero {...service.hero} icon={service.icon} />

      <div className="container">
        {service.features && service.features.length > 0 && (
          <div className="grid gap-4 pb-10 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-5">
                <h2 className="text-base font-semibold">{feature.title}</h2>
                {feature.description && (
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {service.content && (
          <RichText className="max-w-[48rem]" data={service.content} enableGutter={false} />
        )}

        {relatedServices.length > 0 && (
          <div className="mt-12 border-t border-border pt-8">
            <h2 className="text-xl font-semibold">{t.services.related}</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {relatedServices.map((related) => (
                <li key={related.id}>
                  <Link
                    href={getLocalizedPath(locale, `/services/${related.slug}`)}
                    className="inline-flex rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {related.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale: localeParam, slug = '' } = await paramsPromise
  const locale = isValidLocale(localeParam) ? localeParam : 'en'
  const decodedSlug = decodeURIComponent(slug)
  const service = await queryServiceBySlug({ slug: decodedSlug, locale })

  return generateMeta({ doc: service })
}

const queryServiceBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    draft,
    depth: 1,
    limit: 1,
    locale,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
