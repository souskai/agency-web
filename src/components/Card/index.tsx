'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { BackgroundLayers } from '@/components/BackgroundLayers'
import { CategoryIcon } from '@/components/CategoryIcon'
import { Media } from '@/components/Media'
import { postBackgroundForIndex, primaryCategorySlug } from '@/utilities/postBackground'
import { prefixWithLocale, useLocale } from '@/i18n/locale'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  backgroundIndex?: number
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { backgroundIndex, className, doc, relationTo, showCategories, title: titleFromProps } = props

  const locale = useLocale()
  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const categorySlug = primaryCategorySlug(categories)

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const baseHref = relationTo && slug ? `/${relationTo}/${slug}` : '#'
  const href = baseHref !== '#' ? prefixWithLocale(baseHref, locale) : baseHref

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {/* order-cycled SectionShell gradient — always present; image covers it when a meta.image is set */}
        <BackgroundLayers preset={postBackgroundForIndex(backgroundIndex ?? 0)} />
        {metaImage && typeof metaImage !== 'string' && (
          <Media className="absolute inset-0" fill imgClassName="object-cover" resource={metaImage} />
        )}
        {/* category icon — always on top of image or gradient */}
        {categorySlug && (
          <CategoryIcon
            className="absolute right-4 top-4 h-16 w-16 text-foreground/10 pointer-events-none"
            category={categorySlug}
          />
        )}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>}
      </div>
    </article>
  )
}
