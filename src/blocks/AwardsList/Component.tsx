import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { Award, AwardsListBlock } from '@/payload-types'

function groupAwardsByYear(awards: Award[]): Map<number, Award[]> {
  const byYear = new Map<number, Award[]>()
  for (const a of awards) {
    const y = a.year ?? 0
    if (!byYear.has(y)) byYear.set(y, [])
    byYear.get(y)!.push(a)
  }
  const sorted = new Map([...byYear.entries()].sort((a, b) => b[0] - a[0]))
  return sorted
}

export const AwardsListBlockComponent: React.FC<AwardsListBlock> = async ({
  heading,
  limit = 10,
}) => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'awards',
    depth: 1,
    limit: limit ?? 10,
    sort: '-year,sortOrder',
  })
  const awards = result.docs as Award[]
  if (!awards.length) return null

  const byYear = groupAwardsByYear(awards)

  return (
    <section className="container">
      {heading && (
        <h2 className="mb-6 text-center text-lg font-semibold text-muted-foreground">
          {heading}
        </h2>
      )}
      <div className="flex flex-col gap-8">
        {[...byYear.entries()].map(([year, items]) => (
          <div key={year}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              {year}
            </h3>
            <ul className="flex flex-col gap-2">
              {items.map((award) => {
                const image =
                  typeof award.image === 'object' && award.image?.url
                    ? award.image.url
                    : null
                const line = [
                  award.awardName,
                  award.category,
                  award.projectName,
                ]
                  .filter(Boolean)
                  .join(' — ')
                return (
                  <li
                    key={award.id}
                    className="flex items-center gap-3 border-b border-border pb-2 last:border-0"
                  >
                    {image && (
                      <img
                        src={image}
                        alt=""
                        className="h-8 w-8 shrink-0 object-contain"
                      />
                    )}
                    <span className="min-w-0 flex-1 text-sm">{line}</span>
                    {award.link && (
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="View award"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
