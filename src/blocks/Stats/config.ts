import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      admin: {
        description: 'Metric label and value pairs (e.g. "Projects Delivered", "150+")',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'e.g. "150+", "98%", "12"',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Stats',
    singular: 'Stat',
  },
}
