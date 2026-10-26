import type { Locale } from './config'

/**
 * UI translations for the frontend. Used for labels, buttons, headings, etc.
 * CMS content comes from Payload localization.
 */
export const translations = {
  en: {
    nav: {
      posts: 'Posts',
      search: 'Search',
      home: 'Home',
    },
    posts: {
      title: 'Insights',
      pageTitle: 'Page',
      pagination: 'Page {current} of {total}',
      noResults: 'No posts found.',
    },
    search: {
      title: 'Search',
      placeholder: 'Search...',
      noResults: 'No results found.',
    },
    services: {
      related: 'Related services',
      title: 'Services',
      intro: 'From strategy to launch — explore what we build and how we build it.',
      noResults: 'No services found.',
    },
    work: {
      title: 'Work',
      intro: 'Previous, current, and future engagements — the record of what we build.',
      featured: 'Featured',
      previous: 'Previous',
      current: 'Current',
      future: 'Future',
    },
    designSystem: {
      title: 'Design System',
      intro:
        'The live design tokens that style this site — color, type, radius, shadow, and motion. Every value is read from the running CSS, so this page can never drift from the real theme.',
      liveNote: 'Toggle light / dark in the header — every value below re-resolves from the live tokens.',
      colorsTitle: 'Colors',
      colorsSemantic: 'Semantic roles (shadcn/ui)',
      typographyTitle: 'Typography',
      typeScaleTitle: 'Type scale',
      radiusTitle: 'Radius',
      shadowsTitle: 'Shadows',
      motionTitle: 'Motion',
      componentsTitle: 'Components',
    },
    common: {
      readMore: 'Read more',
      minRead: 'min read',
    },
  },
} satisfies Record<Locale, Record<string, Record<string, string>>>

export type TranslationKey = keyof (typeof translations)['en']

export function getTranslations(locale: Locale) {
  return translations[locale] ?? translations.en
}
