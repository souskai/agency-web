import type { CollectionConfig } from 'payload'

import { hasRole } from '../../access/hasRole'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { AwardsList } from '../../blocks/AwardsList/config'
import { CallToActionCentered } from '../../blocks/CallToActionCentered/config'
import { ContentColumns } from '../../blocks/ContentColumns/config'
import { FaqAccordion } from '../../blocks/FaqAccordion/config'
import { FeatureGridBasic } from '../../blocks/FeatureGridBasic/config'
import { FeatureSteps } from '../../blocks/FeatureSteps/config'
import { FormBlock } from '../../blocks/Form/config'
import { HeroBasic } from '../../blocks/HeroBasic/config'
import { LogoBanner } from '../../blocks/LogoBanner/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { PricingCards } from '../../blocks/PricingCards/config'
import { StatsGrid } from '../../blocks/StatsGrid/config'
import { TeamGrid } from '../../blocks/TeamGrid/config'
import { Testimonial } from '../../blocks/Testimonial/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: hasRole(['admin', 'editor']),
    delete: hasRole(['admin', 'editor']),
    // `authenticatedOrPublished` returns everything to any logged-in user
    // (including the `viewer` role used for client demos) and only published
    // docs to anonymous visitors — exactly what we want.
    read: authenticatedOrPublished,
    update: hasRole(['admin', 'editor']),
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [{ ...hero, name: 'hero', localized: true }],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Archive,
                AwardsList,
                CallToActionCentered,
                ContentColumns,
                FaqAccordion,
                FeatureGridBasic,
                FeatureSteps,
                FormBlock,
                HeroBasic,
                LogoBanner,
                MediaBlock,
                PricingCards,
                StatsGrid,
                TeamGrid,
                Testimonial,
              ],
              required: true,
              localized: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField({ localized: true }),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
