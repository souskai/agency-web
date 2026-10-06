import type { Block } from 'payload'

/**
 * A field-less block that renders the live design-system showcase.
 *
 * The content is not CMS-managed — every rendered value is read from the
 * running CSS custom properties at runtime (see `src/components/DesignSystem`),
 * and the section copy comes from the localized `t.designSystem` slice. This
 * keeps the showcase on the UX/UI service page without duplicating token data
 * in the database or in JS.
 */
export const DesignSystem: Block = {
  slug: 'designSystem',
  interfaceName: 'DesignSystemBlock',
  fields: [],
  labels: {
    plural: 'Design System Blocks',
    singular: 'Design System',
  },
}
