import type { CollectionConfig } from 'payload'

import { revalidateTag } from 'next/cache'

import { anyone } from '@/access/anyone'
import { hasRole } from '@/access/hasRole'

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  access: {
    create: hasRole(['admin', 'editor']),
    delete: hasRole(['admin', 'editor']),
    read: anyone,
    update: hasRole(['admin', 'editor']),
  },
  admin: {
    defaultColumns: ['name', 'category', 'sortOrder'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'tool',
      options: [
        { label: 'Partner', value: 'partner' },
        { label: 'Framework', value: 'framework' },
        { label: 'Platform', value: 'platform' },
        { label: 'Tool', value: 'tool' },
      ],
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
          revalidateTag('technologies', 'max')
        }
      },
    ],
    afterDelete: [
      ({ req: { context } }) => {
        if (!context?.disableRevalidate) {
          revalidateTag('technologies', 'max')
        }
      },
    ],
  },
}
