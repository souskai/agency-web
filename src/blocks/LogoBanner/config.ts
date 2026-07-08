import type { Block } from 'payload'

export const LogoBanner: Block = {
  slug: 'logoBanner',
  interfaceName: 'LogoBannerBlock',
  fields: [
    {
      name: 'displayType',
      type: 'select',
      required: true,
      defaultValue: 'customers',
      options: [
        { label: 'Customers / Clients', value: 'customers' },
        { label: 'Technologies / Partners', value: 'technologies' },
      ],
      admin: {
        description: 'Which collection to show (featured items or all)',
      },
    },
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Optional section heading (e.g. "Our clients", "Technology partners")',
      },
    },
  ],
  labels: {
    plural: 'Logo Banners',
    singular: 'Logo Banner',
  },
}
