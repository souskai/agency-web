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
      blockType: 'stats',
      items: [
        { label: 'Projects Delivered', value: '150+' },
        { label: 'Happy Clients', value: '80+' },
        { label: 'Team Members', value: '35' },
        { label: 'Awards Won', value: '12' },
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
    {
      blockName: 'What We Do',
      blockType: 'content',
      columns: [
        { richText: richRoot([heading('What We Do')]), size: 'full' },
        {
          enableLink: false,
          richText: richRoot([
            heading('Strategy', 'h3'),
            paragraph('Research-driven strategies that align business goals with user needs.'),
          ]),
          size: 'oneThird',
        },
        {
          enableLink: false,
          richText: richRoot([
            heading('Design', 'h3'),
            paragraph('Human-centred design systems and interfaces that delight users.'),
          ]),
          size: 'oneThird',
        },
        {
          enableLink: false,
          richText: richRoot([
            heading('Engineering', 'h3'),
            paragraph('Robust, scalable code built with modern frameworks and best practices.'),
          ]),
          size: 'oneThird',
        },
      ],
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
      blockType: 'cta',
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
      richText: richRoot([
        heading('Ready to Work Together?', 'h3'),
        paragraph('Let\u2019s discuss your next project. We\u2019d love to hear from you.'),
      ]),
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
