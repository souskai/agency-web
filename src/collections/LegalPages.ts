import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { revalidateTag } from 'next/cache'

import { anyone } from '@/access/anyone'
import { hasRole } from '@/access/hasRole'
import { slugField } from 'payload'

export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  access: {
    create: hasRole(['admin', 'editor']),
    delete: hasRole(['admin', 'editor']),
    read: anyone,
    update: hasRole(['admin', 'editor']),
  },
  admin: {
    defaultColumns: ['title', 'slug', 'lastUpdated'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'lastUpdated',
      type: 'date',
      admin: {
        description: 'Effective or last updated date (e.g. for legal disclaimer)',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      ({ req: { context } }) => {
        if (!context?.disableRevalidate) {
          revalidateTag('legal-pages', 'max')
        }
      },
    ],
    afterDelete: [
      ({ req: { context } }) => {
        if (!context?.disableRevalidate) {
          revalidateTag('legal-pages', 'max')
        }
      },
    ],
  },
}
