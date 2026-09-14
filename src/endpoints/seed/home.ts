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
      blockName: 'Services',
      blockType: 'featureBento',
      eyebrow: 'Our Expertise',
      title: 'Turning your ideas into applications',
      description:
        'Custom web and mobile development, from first sketch to launch and beyond.',
      items: [
        {
          title: 'Web Application',
          description:
            'Your needs are unique, and so are our solutions. To reach and engage your target audience, we develop high-performance, custom web applications that perfectly meet your specific requirements and constraints.',
        },
        {
          title: 'Mobile Application',
          description:
            'Our development process puts the end-user first. Your mobile app is optimized for user retention and engagement, featuring a user-friendly interface that reflects your brand identity.',
        },
        {
          title: 'Corporate Website',
          description:
            'A corporate website is the foundation of your digital presence. It embodies your company’s online image and must be carefully crafted, prioritizing seamless navigation, captivating design, reliable features, mobile responsiveness, and SEO optimization.',
        },
        {
          title: 'UI/UX Design',
          description:
            'A well-thought-out UI/UX design is essential to capture your users’ attention. We create interfaces that combine aesthetics and ergonomics while ensuring an intuitive and engaging user experience. Using Figma and the Adobe Suite, we bring your vision to life with dynamic and immersive mockups.',
        },
        {
          title: 'Maintenance',
          description:
            'Maintaining your digital solutions is crucial to ensuring their long-term performance and security. At Souskai, we offer comprehensive maintenance services, including preventive, evolutionary, and corrective maintenance for your web and mobile applications.',
        },
        {
          title: 'Hosting',
          description:
            'We know that every project is unique. That’s why we offer custom web hosting solutions tailored to your company’s specific needs, whether for small websites or large-scale enterprise applications.',
        },
      ],
    },
    {
      blockName: 'Testimonials Heading',
      blockType: 'contentColumns',
      eyebrow: 'Social proof',
      title: 'What our clients say 🐝',
      paragraphs: [
        {
          text: '5/5 based on 15 Google reviews',
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
      blockName: 'The Agency',
      blockType: 'contentColumns',
      eyebrow: 'Who we are',
      title: 'The Souskai agency',
      paragraphs: [
        {
          text: 'Souskai and its team stand out through a strong passion for solving complex problems and delivering innovative solutions. Located in Strasbourg, our digital agency is made up of deeply passionate experts who continuously train in the latest technologies and programming languages. This is how we deliver cutting-edge, custom-built solutions tailored to your goals.',
        },
      ],
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
      blockName: 'CTA',
      blockType: 'callToActionCentered',
      title: 'Do you have a digital project that requires expert guidance?',
      description: 'Let’s talk about your timeline, tech stack, and goals.',
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Contact Us',
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
      richText: richRoot([
        heading('Turn your ideas into digital successes', 'h1'),
      ]),
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Contact Us',
            url: '/contact',
          },
        },
      ],
      eyebrow: 'Spice up your digital presence',
      description:
        'Souskai, your web agency for custom web and mobile app design and development.',
    },
    layout,
    meta: {
      description: 'Souskai — custom web and mobile app design and development agency.',
      image: heroImage.id,
      title: 'Souskai Digital | Custom Web & Mobile Development Agency',
    },
    title: 'Home',
  }
}
