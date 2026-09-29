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
      title: 'Posts',
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
    common: {
      readMore: 'Read more',
      minRead: 'min read',
    },
  },
  bg: {
    nav: {
      posts: 'Публикации',
      search: 'Търсене',
      home: 'Начало',
    },
    posts: {
      title: 'Публикации',
      pageTitle: 'Страница',
      pagination: 'Страница {current} от {total}',
      noResults: 'Няма намерени публикации.',
    },
    search: {
      title: 'Търсене',
      placeholder: 'Търсене...',
      noResults: 'Няма намерени резултати.',
    },
    services: {
      related: 'Свързани услуги',
      title: 'Услуги',
      intro: 'От стратегия до стартиране — разгледайте какво създаваме и как го изграждаме.',
      noResults: 'Няма намерени услуги.',
    },
    common: {
      readMore: 'Прочети още',
      minRead: 'мин четене',
    },
  },
} satisfies Record<Locale, Record<string, Record<string, string>>>

export type TranslationKey = keyof (typeof translations)['en']

export function getTranslations(locale: Locale) {
  return translations[locale] ?? translations.en
}
