import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, Page } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
  testimonialIds?: (string | number)[]
}

type PageBlock = NonNullable<Page['layout']>[number]

/* ------------------------------------------------------------------ */
/* Lexical helper – builds a minimal richText node                     */
/* ------------------------------------------------------------------ */

type LexicalNode = { type: string; version: number; [k: string]: unknown }

function heading(text: string, tag: 'h1' | 'h2' | 'h3' = 'h2'): LexicalNode {
  return {
    type: 'heading',
    children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    tag,
    version: 1,
  }
}

function paragraph(text: string): LexicalNode {
  return {
    type: 'paragraph',
    children: [{ type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 }],
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

function richRoot(children: LexicalNode[]) {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
  testimonialIds = [],
}) => {
  const layout: PageBlock[] = [
    {
      blockName: 'Agency Stats',
      blockType: 'statsGrid',
      title: 'Results that speak for themselves',
      metrics: [
        { value: '150+', label: 'Projects Delivered' },
        { value: '80+', label: 'Happy Clients' },
        { value: '35', label: 'Team Members' },
        { value: '12', label: 'Awards Won' },
      ],
    },
    {
      blockName: 'What We Do',
      blockType: 'contentColumns',
      eyebrow: 'Capabilities',
      title: 'What We Do',
      paragraphs: [
        {
          text: 'Strategy — Research-driven strategies that align business goals with user needs.',
        },
        {
          text: 'Design — Human-centred design systems and interfaces that delight users.',
        },
        {
          text: 'Engineering — Robust, scalable code built with modern frameworks and best practices.',
        },
      ],
    },
    {
      blockName: 'Our Clients',
      blockType: 'logoBanner',
      displayType: 'customers',
      heading: 'Trusted By',
    },
    {
      blockName: 'Technology Partners',
      blockType: 'logoBanner',
      displayType: 'technologies',
      heading: 'Built With',
    },
  ]

  if (testimonialIds.length > 0) {
    layout.push({
      blockName: 'What Clients Say',
      blockType: 'testimonial',
      testimonials: testimonialIds as number[],
      layout: 'carousel',
    })
  }

  layout.push(
    {
      blockName: 'Media Block',
      blockType: 'mediaBlock',
      media: metaImage.id,
    },
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      categories: [],
      introContent: richRoot([
        heading('Latest Insights', 'h3'),
        paragraph(
          'Stay up to date with our latest thinking on design, technology, and digital strategy.',
        ),
      ]),
      populateBy: 'collection',
      relationTo: 'posts',
    },
    {
      blockName: 'Awards & Recognition',
      blockType: 'awardsList',
      heading: 'Awards & Recognition',
      limit: 10,
    },
    {
      blockName: 'CTA',
      blockType: 'callToActionCentered',
      title: 'Ready to Work Together?',
      description: 'Let’s discuss your next project. We’d love to hear from you.',
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Start a Project',
            url: '/contact',
          },
        },
      ],
    },
  )

  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'heroGrid',
      links: [
        { link: { type: 'custom', appearance: 'default', label: 'See Portfolio', url: '/posts' } },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'Get a free consultation',
            url: '/contact',
          },
        },
      ],
      eyebrow: 'Leading Digital Agency',
      description:
        'Souskai Digital helps ambitious brands design, build, and scale digital experiences that drive real results \u2014 from web and SEO to AI-powered marketing.',
      richText: richRoot([
        heading('Turning strategy, creativity, and data into measurable business growth', 'h1'),
      ]),
    },
    layout,
    meta: {
      description: 'A full-service digital agency delivering strategy, design, and engineering.',
      image: heroImage.id,
      title: 'Agency — Digital Experiences',
    },
    title: 'Home',
  }
}
