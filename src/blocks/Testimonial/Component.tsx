import React from 'react'

import type { Testimonial as TestimonialType, TestimonialBlock } from '@/payload-types'

import { cn } from '@/utilities/ui'

function SingleTestimonial({ t }: { t: TestimonialType }) {
  const quote = typeof t.quote === 'string' ? t.quote : null
  if (!quote) return null

  return (
    <blockquote className="panel">
      <p className="text-lg italic">&ldquo;{quote}&rdquo;</p>
      {(t.authorName || t.company) && (
        <footer className="mt-4 text-sm text-muted-foreground">
          — {t.authorName}
          {t.company && `, ${t.company}`}
        </footer>
      )}
    </blockquote>
  )
}

export const TestimonialBlockComponent: React.FC<TestimonialBlock> = ({ testimonials, layout }) => {
  const list = testimonials?.filter(
    (t): t is TestimonialType => typeof t === 'object' && t !== null && 'quote' in t,
  )
  if (!list?.length) return null

  const isCarousel = layout === 'carousel'

  return (
    <section className="container">
      <div
        className={cn(
          'flex gap-6',
          isCarousel ? 'overflow-x-auto snap-x snap-mandatory pb-4' : 'flex-col',
        )}
      >
        {list.map((t, i) => (
          <div key={t.id ?? i} className={cn(isCarousel && 'min-w-[min(100%,24rem)] snap-center')}>
            <SingleTestimonial t={t} />
          </div>
        ))}
      </div>
    </section>
  )
}
