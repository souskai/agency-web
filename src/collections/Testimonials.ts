import type { CollectionConfig } from 'payload'

import { revalidateTag } from 'next/cache'

import { anyone } from '@/access/anyone'
import { hasRole } from '@/access/hasRole'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: hasRole(['admin', 'editor']),
    delete: hasRole(['admin', 'editor']),
    read: anyone,
    update: hasRole(['admin', 'editor']),
  },
  admin: {
    defaultColumns: ['authorName', 'company', 'featured'],
    useAsTitle: 'authorName',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
    },
    {
      name: 'authorRole',
      type: 'text',
      admin: {
        description: 'e.g. CEO & Founder',
      },
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'caseStudy',
      type: 'relationship',
      relationTo: 'case-studies',
      admin: {
        description: 'Optional link to a case study',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show in homepage or carousel',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      ({ req: { context } }) => {
        if (!context?.disableRevalidate) {
          revalidateTag('testimonials', 'max')
        }
      },
    ],
    afterDelete: [
      ({ req: { context } }) => {
        if (!context?.disableRevalidate) {
          revalidateTag('testimonials', 'max')
        }
      },
    ],
  },
}
