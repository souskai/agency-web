import type { CollectionConfig } from 'payload'

import { revalidateTag } from 'next/cache'

import { anyone } from '@/access/anyone'
import { hasRole } from '@/access/hasRole'

export const Customers: CollectionConfig = {
  slug: 'customers',
  access: {
    create: hasRole(['admin', 'editor']),
    delete: hasRole(['admin', 'editor']),
    read: anyone,
    update: hasRole(['admin', 'editor']),
  },
  admin: {
    defaultColumns: ['name', 'featured', 'sortOrder'],
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
      admin: {
        description: 'Client or partner website URL',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show in homepage or featured banner',
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
          revalidateTag('customers', 'max')
        }
      },
    ],
    afterDelete: [
      ({ req: { context } }) => {
        if (!context?.disableRevalidate) {
          revalidateTag('customers', 'max')
        }
      },
    ],
  },
}
