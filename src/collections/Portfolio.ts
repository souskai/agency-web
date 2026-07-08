import type { CollectionConfig } from 'payload'

import { revalidateTag } from 'next/cache'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { slugField } from 'payload'

const mediaTypeOptions = [
  { label: 'Video', value: 'video' },
  { label: 'Image', value: 'image' },
  { label: 'Editorial', value: 'editorial' },
] as const

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'mediaType', 'featured', 'publishedAt'],
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
      name: 'mediaType',
      type: 'select',
      required: true,
      defaultValue: 'image',
      options: [...mediaTypeOptions],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Primary asset (image or video file)',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        description: 'YouTube / Vimeo embed URL (use when mediaType is video)',
        condition: (_, siblingData) => siblingData?.mediaType === 'video',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'customers',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in homepage or featured sections',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      ({ req: { context } }) => {
        if (!context?.disableRevalidate) {
          revalidateTag('portfolio', 'max')
        }
      },
    ],
    afterDelete: [
      ({ req: { context } }) => {
        if (!context?.disableRevalidate) {
          revalidateTag('portfolio', 'max')
        }
      },
    ],
  },
}
