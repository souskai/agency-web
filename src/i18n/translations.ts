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
    designSystem: {
      title: 'Дизайн система',
      intro:
        'Живите дизайн токени, които оформят този сайт — цвят, типография, радиус, сянка и движение. Всяка стойност се чете от работещия CSS, така че тази страница не може да се размине с реалната тема.',
      liveNote: 'Превключете светла/тъмна тема в хедъра — всяка стойност по-долу се преизчислява от живите токени.',
      colorsTitle: 'Цветове',
      colorsSemantic: 'Семантични роли (shadcn/ui)',
      typographyTitle: 'Типография',
      typeScaleTitle: 'Мащаб на типографията',
      radiusTitle: 'Радиус',
      shadowsTitle: 'Сенки',
      motionTitle: 'Движение',
      componentsTitle: 'Компоненти',
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
