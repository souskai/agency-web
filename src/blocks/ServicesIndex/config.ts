import type { Block } from 'payload'

/**
 * Field-less block that renders the collection-driven services index
 * (icon + title + summary cards) inside the `/services` hub layout.
 *
 * There are no admin-managed fields — the cards are derived at runtime from the
 * `services` collection (see `src/blocks/ServicesIndex/Component.tsx`). Keeping
 * it as a block (rather than hardcoding the grid into the page) means the hub's
 * section order stays fully authorable and reorder-safe, matching the child
 * service pages where every section is a block.
 */
export const ServicesIndex: Block = {
  slug: 'servicesIndex',
  interfaceName: 'ServicesIndexBlock',
  fields: [],
  labels: {
    plural: 'Services Index Blocks',
    singular: 'Services Index',
  },
}