import type { GlobalConfig } from 'payload'

import { hasRole } from '@/access/hasRole'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: hasRole(['admin', 'editor']),
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      localized: true,
      maxRows: 4,
      admin: {
        description: 'Footer link columns (e.g. Services, Company, Legal)',
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          admin: {
            description: 'Column heading',
          },
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            link({
              appearances: false,
            }),
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
    {
      name: 'legalLine',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g. © 2026 Souskai. All rights reserved.',
      },
    },
    {
      name: 'legalLinks',
      type: 'array',
      localized: true,
      maxRows: 4,
      admin: {
        description: 'Legal links shown at the right of the copyright line.',
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
