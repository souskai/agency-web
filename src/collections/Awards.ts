import type { CollectionConfig } from 'payload'

import { revalidateTag } from 'next/cache'

import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Awards: CollectionConfig = {
  slug: 'awards',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['awardName', 'year', 'projectName'],
    useAsTitle: 'awardName',
  },
  fields: [
    {
      name: 'year',
      type: 'number',
      required: true,
      min: 2020,
      validate: (val: number | null | undefined) => {
        if (val == null) return true
        const y = Number(val)
        const maxYear = new Date().getFullYear() + 1
        if (!Number.isInteger(y) || y < 2020 || y > maxYear) {
          return `Enter a valid year (YYYY) between 2020 and ${maxYear}`
        }
        return true
      },
      admin: {
        description: 'Year the award was received (YYYY, 2020 onward)',
      },
    },
    {
      name: 'awardName',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the award',
      },
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        description: 'Category or discipline',
      },
    },
    {
      name: 'projectName',
      type: 'text',
      admin: {
        description: 'Project or work this award relates to',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      filterOptions: () => true,
      admin: {
        description: 'Optional badge or logo. Upload a new file or choose from existing Media.',
      },
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'Link to award details',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      admin: {
        description: 'Lower numbers appear first within the same year',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      ({ req: { context } }) => {
        if (!context?.disableRevalidate) {
          revalidateTag('awards', 'max')
        }
      },
    ],
    afterDelete: [
      ({ req: { context } }) => {
        if (!context?.disableRevalidate) {
          revalidateTag('awards', 'max')
        }
      },
    ],
  },
}
