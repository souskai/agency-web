import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { revalidateTag } from 'next/cache'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { slugField } from 'payload'

const demoTypeOptions = [
  { label: 'Voice Assistant', value: 'voice-assistant' },
  { label: 'Workflow (e.g. N8N)', value: 'workflow' },
  { label: 'Chatbot', value: 'chatbot' },
  { label: 'Custom', value: 'custom' },
] as const

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Coming Soon', value: 'coming-soon' },
  { label: 'Archived', value: 'archived' },
] as const

export const Demos: CollectionConfig = {
  slug: 'demos',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'demoType', 'status', 'sortOrder'],
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
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'What the demo does',
      },
    },
    {
      name: 'demoType',
      type: 'select',
      required: true,
      defaultValue: 'custom',
      options: [...demoTypeOptions],
      admin: {
        description: 'Drives which frontend component renders the interactive part',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'embedUrl',
      type: 'text',
      admin: {
        description: 'Optional iframe URL for externally hosted demos',
      },
    },
    {
      name: 'content',
      type: 'richText',
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
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [...statusOptions],
      admin: {
        position: 'sidebar',
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
  ],
  hooks: {
    afterChange: [
      ({ req: { context } }) => {
        if (!context?.disableRevalidate) {
          revalidateTag('demos', 'max')
        }
      },
    ],
    afterDelete: [
      ({ req: { context } }) => {
        if (!context?.disableRevalidate) {
          revalidateTag('demos', 'max')
        }
      },
    ],
  },
}
