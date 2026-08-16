import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { AwardsListBlockComponent } from '@/blocks/AwardsList/Component'
import { CallToActionCenteredBlock } from '@/blocks/CallToActionCentered/Component'
import { ContentColumnsBlock } from '@/blocks/ContentColumns/Component'
import { FaqAccordionBlock } from '@/blocks/FaqAccordion/Component'
import { FeatureGridBasicBlock } from '@/blocks/FeatureGridBasic/Component'
import { FeatureStepsBlock } from '@/blocks/FeatureSteps/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroBasicBlock } from '@/blocks/HeroBasic/Component'
import { LogoBannerBlockComponent } from '@/blocks/LogoBanner/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { StatsGridBlock } from '@/blocks/StatsGrid/Component'
import { TestimonialBlockComponent } from '@/blocks/Testimonial/Component'

const blockComponents = {
  archive: ArchiveBlock,
  awardsList: AwardsListBlockComponent,
  callToActionCentered: CallToActionCenteredBlock,
  contentColumns: ContentColumnsBlock,
  faqAccordion: FaqAccordionBlock,
  featureGridBasic: FeatureGridBasicBlock,
  featureSteps: FeatureStepsBlock,
  formBlock: FormBlock,
  heroBasic: HeroBasicBlock,
  logoBanner: LogoBannerBlockComponent,
  mediaBlock: MediaBlock,
  statsGrid: StatsGridBlock,
  testimonial: TestimonialBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const BlockWithProps = Block as React.FC<Record<string, unknown>>
              return (
                <div className="my-16" key={index}>
                  <BlockWithProps {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
