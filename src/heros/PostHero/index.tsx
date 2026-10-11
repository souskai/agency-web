import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { BackgroundLayers } from '@/components/BackgroundLayers'
import { CategoryIcon } from '@/components/CategoryIcon'
import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { postBackgroundForIndex, primaryCategorySlug } from '@/utilities/postBackground'
import { cn } from '@/utilities/ui'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const categorySlug = primaryCategorySlug(categories)

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div
        className={cn(
          'container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] pb-8',
          heroImage && typeof heroImage !== 'string' && 'text-white',
        )}
      >
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="label mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 heading-1">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="label">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="label">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[60vh] select-none">
        {/* order-cycled SectionShell gradient — always present */}
        <BackgroundLayers preset={postBackgroundForIndex(0)} />
        {/* hero image covers the gradient when uploaded */}
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            className="absolute inset-0"
            fill
            priority
            imgClassName="object-cover"
            resource={heroImage}
          />
        )}
        {/* legibility scrim — only over a hero image, so light gradient text stays dark */}
        {heroImage && typeof heroImage !== 'string' && (
          <div className="absolute inset-0 bg-black/40" />
        )}
        {/* category icon — always on top of image or gradient */}
        {categorySlug && (
          <CategoryIcon
            className="absolute right-8 top-20 h-40 w-40 text-foreground/10 pointer-events-none"
            category={categorySlug}
          />
        )}
      </div>
    </div>
  )
}
