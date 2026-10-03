import React from 'react'

import type { Page } from '@/payload-types'

import { BackgroundLayers } from '@/components/BackgroundLayers'
import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <section className="container mt-16">
      <div className="relative overflow-hidden ring-1 ring-foreground/10">
        <BackgroundLayers preset="grid-fade" />
        <div className="relative z-10 px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
          <div className="max-w-3xl">
            {children || (richText && <RichText data={richText} enableGutter={false} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
