import React, { Fragment } from 'react'

import type { Locale } from '@/i18n/config'
import type { Page, Service, ServicesPage } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { AwardsListBlockComponent } from '@/blocks/AwardsList/Component'
import { CallToActionCenteredBlock } from '@/blocks/CallToActionCentered/Component'
import { ComparatorGridBlock } from '@/blocks/ComparatorGrid/Component'
import { ContentColumnsBlock } from '@/blocks/ContentColumns/Component'
import { DesignSystemBlock } from '@/blocks/DesignSystem/Component'
import { EmbedBasicBlock } from '@/blocks/EmbedBasic/Component'
import { FaqAccordionBlock } from '@/blocks/FaqAccordion/Component'
import { FeatureBentoBlock } from '@/blocks/FeatureBento/Component'
import { FeatureGridBasicBlock } from '@/blocks/FeatureGridBasic/Component'
import { FeatureStepsBlock } from '@/blocks/FeatureSteps/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroBasicBlock } from '@/blocks/HeroBasic/Component'
import { LogoBannerBlockComponent } from '@/blocks/LogoBanner/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PricingCardsBlock } from '@/blocks/PricingCards/Component'
import { ServicesIndexBlock, type ServicesIndexService } from '@/blocks/ServicesIndex/Component'
import { StatsGridBlock } from '@/blocks/StatsGrid/Component'
import { TeamGridBlock } from '@/blocks/TeamGrid/Component'
import { TestimonialBlockComponent } from '@/blocks/Testimonial/Component'

const blockComponents = {
  archive: ArchiveBlock,
  awardsList: AwardsListBlockComponent,
  callToActionCentered: CallToActionCenteredBlock,
  comparatorGrid: ComparatorGridBlock,
  contentColumns: ContentColumnsBlock,
  designSystem: DesignSystemBlock,
  embedBasic: EmbedBasicBlock,
  faqAccordion: FaqAccordionBlock,
  featureBento: FeatureBentoBlock,
  featureGridBasic: FeatureGridBasicBlock,
  featureSteps: FeatureStepsBlock,
  formBlock: FormBlock,
  heroBasic: HeroBasicBlock,
  logoBanner: LogoBannerBlockComponent,
  mediaBlock: MediaBlock,
  pricingCards: PricingCardsBlock,
  servicesIndex: ServicesIndexBlock,
  statsGrid: StatsGridBlock,
  teamGrid: TeamGridBlock,
  testimonial: TestimonialBlockComponent,
}

type LayoutBlock =
  | NonNullable<Page['layout']>[number]
  | NonNullable<Service['layout']>[number]
  | NonNullable<ServicesPage['layout']>[number]

export const RenderBlocks: React.FC<{
  blocks: LayoutBlock[]
  /** Forwarded to blocks that render collection data (e.g. `servicesIndex`). */
  locale?: Locale
  /** Forwarded to blocks that render collection data (e.g. `servicesIndex`). */
  services?: ServicesIndexService[]
}> = (props) => {
  const { blocks, locale, services } = props

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
                <BlockWithProps
                  key={index}
                  {...block}
                  disableInnerContainer
                  locale={locale}
                  services={services}
                />
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
