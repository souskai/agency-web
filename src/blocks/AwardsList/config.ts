import type { Block } from 'payload'

export const AwardsList: Block = {
  slug: 'awardsList',
  interfaceName: 'AwardsListBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'e.g. Awards & Recognition',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 10,
      admin: {
        description: 'Max awards to show',
      },
    },
  ],
  labels: {
    plural: 'Awards Lists',
    singular: 'Awards List',
  },
}
