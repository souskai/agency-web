import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Customer, LogoBannerBlock, Technology } from '@/payload-types'

import { cn } from '@/utilities/ui'

async function LogoBannerBlockInner({
  displayType,
  heading,
}: Pick<LogoBannerBlock, 'displayType' | 'heading'>) {
  const payload = await getPayload({ config: configPromise })
  const collection = displayType === 'customers' ? 'customers' : 'technologies'

  const result = await payload.find({
    collection,
    depth: 1,
    limit: 24,
    sort: 'sortOrder',
    where:
      displayType === 'customers'
        ? { featured: { equals: true } }
        : {},
  })

  const docs = result.docs as (Customer | Technology)[]
  const items = docs.filter((d) => d.logo && typeof d.logo === 'object')

  if (items.length === 0) return null

  return (
    <section className="container">
      {heading && (
        <h2 className="mb-6 text-center text-lg font-semibold text-muted-foreground">
          {heading}
        </h2>
      )}
      <ul className="flex flex-wrap items-center justify-center gap-8">
        {items.map((item) => {
          const logo = typeof item.logo === 'object' ? item.logo : null
          const src = logo?.url
          const name = 'name' in item ? item.name : null
          const url = 'website' in item ? item.website : null

          return (
            <li key={item.id}>
              {url ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
                  aria-label={name ?? undefined}
                >
                  {src && (
                    <img
                      src={src}
                      alt={name ?? ''}
                      className="h-8 w-auto max-w-[8rem] object-contain"
                    />
                  )}
                </a>
              ) : (
                src && (
                  <img
                    src={src}
                    alt={name ?? ''}
                    className={cn(
                      'h-8 w-auto max-w-[8rem] object-contain opacity-80',
                    )}
                  />
                )
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export const LogoBannerBlockComponent: React.FC<LogoBannerBlock> = async (props) => {
  const inner = await LogoBannerBlockInner({
    displayType: props.displayType,
    heading: props.heading,
  })
  return (
    <div className="border-border border-y bg-muted/30 py-8">
      {inner}
    </div>
  )
}
