import type { GlobalConfig } from 'payload'

import { hero } from '@/heros/config'

import { revalidateServicesPage } from './hooks/revalidateServicesPage'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      ...hero,
      name: 'hero',
      localized: true,
    },
  ],
  hooks: {
    afterChange: [revalidateServicesPage],
  },
}
