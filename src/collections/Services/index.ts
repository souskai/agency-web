import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { hasRole } from '@/access/hasRole'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { Archive } from '@/blocks/ArchiveBlock/config'
import { AwardsList } from '@/blocks/AwardsList/config'
import { Banner } from '@/blocks/Banner/config'
import { CallToActionCentered } from '@/blocks/CallToActionCentered/config'
import { Code } from '@/blocks/Code/config'
import { ComparatorGrid } from '@/blocks/ComparatorGrid/config'
import { ContentColumns } from '@/blocks/ContentColumns/config'
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
import { StatsGrid } from '@/blocks/StatsGrid/config'
import { TeamGrid } from '@/blocks/TeamGrid/config'
import { Testimonial } from '@/blocks/Testimonial/config'
import { hero } from '@/heros/config'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { revalidateDelete, revalidateService } from './hooks/revalidateService'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

const serviceIconOptions = [
  { label: 'Brain (AI)', value: 'brain' },
  { label: 'Code', value: 'code' },
  { label: 'Palette', value: 'palette' },
  { label: 'Layout', value: 'layout' },
  { label: 'Megaphone', value: 'megaphone' },
  { label: 'Rocket', value: 'rocket' },
  { label: 'Shield', value: 'shield' },
  { label: 'Zap', value: 'zap' },
  { label: 'Globe', value: 'globe' },
  { label: 'Smartphone', value: 'smartphone' },
]

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  access: {
    create: hasRole(['admin', 'editor']),
    delete: hasRole(['admin', 'editor']),
    read: authenticatedOrPublished,
    update: hasRole(['admin', 'editor']),
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'services',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'services',
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
          label: 'Hero',
          fields: [{ ...hero, name: 'hero', localized: true }],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                description: 'Short elevator pitch for the service',
              },
            },
            {
              name: 'icon',
              type: 'select',
              options: serviceIconOptions,
              admin: {
                description: 'Lucide icon name for UI (e.g. cards, lists)',
              },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'features',
              type: 'array',
              admin: {
                description: 'Key features or benefits',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                },
              ],
            },
            {
              name: 'content',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: 'Full content',
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                Archive,
                AwardsList,
                CallToActionCentered,
                ComparatorGrid,
                ContentColumns,
                EmbedBasic,
                FaqAccordion,
                FeatureBento,
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
              localized: true,
              admin: {
                initCollapsed: true,
              },
              label: 'Page sections',
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'relatedServices',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => (id ? { id: { not_in: [id] } } : true),
            },
          ],
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
              hasGenerateFn: true,
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
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first',
      },
    },
    slugField({ localized: true }),
  ],
  hooks: {
    afterChange: [revalidateService],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
