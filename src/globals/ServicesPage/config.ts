import type { GlobalConfig } from 'payload'

import { Archive } from '@/blocks/ArchiveBlock/config'
import { AwardsList } from '@/blocks/AwardsList/config'
import { CallToActionCentered } from '@/blocks/CallToActionCentered/config'
import { ComparatorGrid } from '@/blocks/ComparatorGrid/config'
import { ContentColumns } from '@/blocks/ContentColumns/config'
import { DesignSystem } from '@/blocks/DesignSystem/config'
import { EmbedBasic } from '@/blocks/EmbedBasic/config'
import { FaqAccordion } from '@/blocks/FaqAccordion/config'
import { FeatureBento } from '@/blocks/FeatureBento/config'
import { FeatureGridBasic } from '@/blocks/FeatureGridBasic/config'
import { FeatureSteps } from '@/blocks/FeatureSteps/config'
import { FormBlock } from '@/blocks/Form/config'
import { HeroBasic } from '@/blocks/HeroBasic/config'
import { LogoBanner } from '@/blocks/LogoBanner/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { PricingCards } from '@/blocks/PricingCards/config'
import { ServicesIndex } from '@/blocks/ServicesIndex/config'
import { StatsGrid } from '@/blocks/StatsGrid/config'
import { TeamGrid } from '@/blocks/TeamGrid/config'
import { Testimonial } from '@/blocks/Testimonial/config'
import { withDbName } from '@/blocks/shared/withDbName'
import { hero } from '@/heros/config'

import { revalidateServicesPage } from './hooks/revalidateServicesPage'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      ...hero,
      name: 'hero',
      localized: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        Archive,
        AwardsList,
        // Kit blocks ship with a shared short `dbName` (`pc_*`) that is already
        // used by the `pages` collection; `services` clones them to `sc_*`. The
        // hub global does the same with its own `sp_*` identifier so it gets its
        // own tables (same slug + interfaceName, distinct storage).
        withDbName(CallToActionCentered, 'sp_cal_to_act_cen'),
        withDbName(ComparatorGrid, 'sp_com_gri'),
        withDbName(ContentColumns, 'sp_con_col'),
        DesignSystem,
        withDbName(EmbedBasic, 'sp_emb_bas'),
        withDbName(FaqAccordion, 'sp_faq_acc'),
        withDbName(FeatureBento, 'sp_fea_ben'),
        withDbName(FeatureGridBasic, 'sp_fea_gri_bas'),
        withDbName(FeatureSteps, 'sp_fea_ste'),
        FormBlock,
        withDbName(HeroBasic, 'sp_her_bas'),
        LogoBanner,
        MediaBlock,
        withDbName(PricingCards, 'sp_pri_car'),
        ServicesIndex,
        withDbName(StatsGrid, 'sp_sta_gri'),
        withDbName(TeamGrid, 'sp_tea_gri'),
        Testimonial,
      ],
      localized: true,
      admin: {
        initCollapsed: true,
      },
      label: 'Page sections',
    },
  ],
  hooks: {
    afterChange: [revalidateServicesPage],
  },
}
