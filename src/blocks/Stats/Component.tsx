import React from 'react'

import type { StatsBlock } from '@/payload-types'

import { cn } from '@/utilities/ui'

export const StatsBlockComponent: React.FC<StatsBlock> = ({ items }) => {
  if (!items?.length) return null

  return (
    <section className="container">
      <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              'flex flex-col rounded-lg border border-border bg-card p-4 text-center',
            )}
          >
            <dt className="text-sm font-medium text-muted-foreground">{item.label}</dt>
            <dd className="mt-1 text-2xl font-semibold">{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
