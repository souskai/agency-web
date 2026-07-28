import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { contact as contactPageData } from './contact-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

// Delete order matters: collections that reference media (e.g. customers.logo_id, technologies.logo) must be
// cleared before media, otherwise FK constraints or ON DELETE SET NULL can violate NOT NULL.
const collections: CollectionSlug[] = [
  'form-submissions',
  'search',
  'pages',
  'posts',
  'case-studies',
  'services',
  'portfolio',
  'demos',
  'awards',
  'testimonials',
  'team-members',
  'customers',
  'technologies',
  'legal-pages',
  'categories',
  'forms',
  'media',
]

const globals: GlobalSlug[] = ['header', 'footer']

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

type LexicalNode = { type: string; version: number; [k: string]: unknown }

function lexHeading(text: string, tag: 'h1' | 'h2' | 'h3' = 'h2'): LexicalNode {
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

function lexParagraph(text: string): LexicalNode {
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

function lexRichText(children: LexicalNode[]) {
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

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  payload.logger.info(`— Clearing collections and globals...`)

  await payload.updateGlobal({
    slug: 'header',
    data: { navItems: [], ctaButtons: [] },
    depth: 0,
    context: { disableRevalidate: true },
  })
  await payload.updateGlobal({
    slug: 'footer',
    data: { columns: [], socialLinks: [] },
    depth: 0,
    context: { disableRevalidate: true },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    // `siteName` is required by the schema, so it must not be empty during clearing.
    data: { siteName: 'Agency Name', socialLinks: [] },
    depth: 0,
    context: { disableRevalidate: true },
  })

  // Delete collections sequentially to avoid Postgres deadlocks (parallel deletes can lock tables in conflicting order).
  for (const collection of collections) {
    await payload.db.deleteMany({ collection, req, where: {} })
  }

  const versionedCollections = collections.filter((c) =>
    Boolean(payload.collections[c].config.versions),
  )
  for (const collection of versionedCollections) {
    await payload.db.deleteVersions({ collection, req, where: {} })
  }

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: { email: { equals: 'demo-author@example.com' } },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
        roles: ['admin'],
      },
      draft: false,
    }),
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: { title: category, slug: category },
      }),
    ),
  ])

  /* ------------------------------------------------------------------
   * Agency collections – Customers, Testimonials, Awards
   * ------------------------------------------------------------------ */

  payload.logger.info(`— Seeding customers...`)

  const customerNames = [
    'Acme Corp',
    'Globex Industries',
    'Initech',
    'Umbrella Co',
    'Stark Enterprises',
    'Wayne Industries',
  ]

  await Promise.all(
    customerNames.map((name, i) =>
      payload.create({
        collection: 'customers',
        context: { disableRevalidate: true },
        data: {
          name,
          logo: image1Doc.id,
          website: `https://example.com/${name.toLowerCase().replace(/\s+/g, '-')}`,
          featured: true,
          sortOrder: i + 1,
        },
      }),
    ),
  )

  payload.logger.info(`— Seeding technologies...`)

  const techEntries: { name: string; category: 'framework' | 'platform' | 'tool' | 'partner' }[] = [
    { name: 'Next.js', category: 'framework' },
    { name: 'React', category: 'framework' },
    { name: 'Payload CMS', category: 'platform' },
    { name: 'Vercel', category: 'platform' },
    { name: 'Figma', category: 'tool' },
    { name: 'TypeScript', category: 'tool' },
  ]

  await Promise.all(
    techEntries.map((t, i) =>
      payload.create({
        collection: 'technologies',
        context: { disableRevalidate: true },
        data: {
          name: t.name,
          logo: image2Doc.id,
          category: t.category,
          sortOrder: i + 1,
        },
      }),
    ),
  )

  payload.logger.info(`— Seeding testimonials...`)

  const testimonialData = [
    {
      quote:
        'They transformed our digital presence completely. The team delivered a world-class platform on time and exceeded every expectation.',
      authorName: 'Sarah Chen',
      authorRole: 'VP of Product',
      company: 'Globex Industries',
      featured: true,
    },
    {
      quote:
        'Working with this agency was a game-changer. Their strategic approach to UX resulted in a 40% increase in conversions.',
      authorName: 'Marcus Rivera',
      authorRole: 'CEO',
      company: 'Initech',
      featured: true,
    },
    {
      quote:
        'From branding to development, the quality of work was outstanding. They truly understand how to build products that users love.',
      authorName: 'Emily Nakamura',
      authorRole: 'Head of Design',
      company: 'Stark Enterprises',
      featured: true,
    },
  ]

  const testimonialDocs = []
  for (const t of testimonialData) {
    const doc = await payload.create({
      collection: 'testimonials',
      context: { disableRevalidate: true },
      data: t,
    })
    testimonialDocs.push(doc)
  }

  payload.logger.info(`— Seeding awards...`)

  const awardData = [
    {
      year: 2025,
      awardName: 'Webby Award',
      category: 'Best Visual Design',
      projectName: 'Globex Rebrand',
      sortOrder: 1,
    },
    {
      year: 2025,
      awardName: 'Awwwards SOTD',
      category: 'Site of the Day',
      projectName: 'Initech Platform',
      sortOrder: 2,
    },
    {
      year: 2024,
      awardName: 'iF Design Award',
      category: 'Digital Interfaces',
      projectName: 'Umbrella Dashboard',
      sortOrder: 1,
    },
    {
      year: 2024,
      awardName: 'CSS Design Awards',
      category: 'Best UX Design',
      projectName: 'Wayne Analytics',
      sortOrder: 2,
    },
    {
      year: 2023,
      awardName: 'Red Dot Award',
      category: 'Brands & Communication Design',
      projectName: 'Acme Identity System',
      sortOrder: 1,
    },
    {
      year: 2023,
      awardName: 'FWA of the Month',
      category: 'Innovation',
      projectName: 'Stark AR Experience',
      sortOrder: 2,
    },
  ]

  await Promise.all(
    awardData.map((a) =>
      payload.create({
        collection: 'awards',
        context: { disableRevalidate: true },
        data: a,
      }),
    ),
  )

  /* ------------------------------------------------------------------
   * Team Members
   * ------------------------------------------------------------------ */

  payload.logger.info(`— Seeding team members...`)

  const teamData = [
    {
      name: 'Alex Morgan',
      role: 'Creative Director',
      bio: 'Leads the design vision with 12 years of brand and digital experience.',
    },
    {
      name: 'Jordan Lee',
      role: 'Lead Engineer',
      bio: 'Full-stack engineer specialising in React, Node.js, and cloud infrastructure.',
    },
    {
      name: 'Priya Sharma',
      role: 'UX Researcher',
      bio: 'Turns user insights into actionable design decisions through qualitative and quantitative research.',
    },
    {
      name: 'Sam Torres',
      role: 'Project Manager',
      bio: 'Keeps projects on track, on budget, and aligned with client goals.',
    },
    {
      name: 'Taylor Kim',
      role: 'Motion Designer',
      bio: 'Creates compelling animations and interactive experiences for web and mobile.',
    },
  ]

  await Promise.all(
    teamData.map((member, i) =>
      payload.create({
        collection: 'team-members',
        context: { disableRevalidate: true },
        data: {
          ...member,
          photo: image3Doc.id,
          sortOrder: i + 1,
          socialLinks: [{ platform: 'linkedin' as const, url: 'https://linkedin.com/in/example' }],
        },
      }),
    ),
  )

  /* ------------------------------------------------------------------
   * Services
   * ------------------------------------------------------------------ */

  payload.logger.info(`— Seeding services...`)

  type ServiceIcon =
    | 'brain'
    | 'code'
    | 'palette'
    | 'layout'
    | 'megaphone'
    | 'rocket'
    | 'shield'
    | 'zap'
    | 'globe'
    | 'smartphone'

  const servicesData: {
    title: string
    slug: string
    summary: string
    icon: ServiceIcon
    features: { title: string; description: string }[]
  }[] = [
    {
      title: 'Digital Strategy',
      slug: 'digital-strategy',
      summary:
        'Data-driven strategies that align business goals with user needs and market opportunities.',
      icon: 'brain',
      features: [
        {
          title: 'Market Research',
          description: 'Competitive analysis and user persona development.',
        },
        {
          title: 'Roadmap Planning',
          description: 'Phased delivery plans tied to measurable KPIs.',
        },
      ],
    },
    {
      title: 'UX/UI Design',
      slug: 'ux-ui-design',
      summary:
        'Human-centred design systems and interfaces that delight users and drive engagement.',
      icon: 'palette',
      features: [
        { title: 'Design Systems', description: 'Scalable component libraries and design tokens.' },
        { title: 'Prototyping', description: 'Interactive prototypes for rapid user testing.' },
      ],
    },
    {
      title: 'Web Development',
      slug: 'web-development',
      summary: 'Robust, scalable code built with modern frameworks and best practices.',
      icon: 'code',
      features: [
        { title: 'Headless CMS', description: 'Payload CMS, Sanity, and Contentful integrations.' },
        { title: 'Performance', description: 'Core Web Vitals optimisation and edge deployment.' },
      ],
    },
  ]

  const serviceDocs = []
  for (const s of servicesData) {
    const doc = await payload.create({
      collection: 'services',
      depth: 0,
      context: { disableRevalidate: true },
      data: {
        title: s.title,
        slug: s.slug,
        summary: s.summary,
        icon: s.icon,
        features: s.features,
        _status: 'published',
        coverImage: imageHomeDoc.id,
        content: lexRichText([
          lexHeading(s.title),
          lexParagraph(s.summary),
          lexParagraph(
            'Our team brings deep expertise and a proven track record to every engagement. We work collaboratively with your stakeholders to ensure the solution meets real-world needs.',
          ),
        ]),
        sortOrder: servicesData.indexOf(s) + 1,
      },
    })
    serviceDocs.push(doc)
  }

  /* ------------------------------------------------------------------
   * Case Studies
   * ------------------------------------------------------------------ */

  payload.logger.info(`— Seeding case studies...`)

  const caseStudiesData = [
    {
      title: 'Globex Platform Redesign',
      slug: 'globex-platform-redesign',
      summary: 'A complete digital overhaul that increased online conversions by 40%.',
      results: [
        { metric: 'Conversion Rate', value: '+40%' },
        { metric: 'Page Load Time', value: '1.2s' },
        { metric: 'User Satisfaction', value: '94%' },
      ],
      testimonial: {
        quote:
          'The new platform exceeded all our expectations and paid for itself within three months.',
        authorName: 'Sarah Chen',
        authorRole: 'VP of Product',
      },
    },
    {
      title: 'Initech Brand Identity',
      slug: 'initech-brand-identity',
      summary: 'A fresh identity system that unified the brand across 12 markets.',
      results: [
        { metric: 'Brand Recognition', value: '+65%' },
        { metric: 'Markets Unified', value: '12' },
      ],
      testimonial: {
        quote: 'They captured our brand essence perfectly and gave us a system that scales.',
        authorName: 'Marcus Rivera',
        authorRole: 'CEO',
      },
    },
  ]

  for (const cs of caseStudiesData) {
    await payload.create({
      collection: 'case-studies',
      depth: 0,
      context: { disableRevalidate: true },
      data: {
        title: cs.title,
        slug: cs.slug,
        _status: 'published',
        summary: cs.summary,
        coverImage: image1Doc.id,
        results: cs.results,
        services: serviceDocs.map((s) => s.id),
        testimonial: cs.testimonial,
        content: lexRichText([
          lexHeading(cs.title),
          lexParagraph(cs.summary),
          lexHeading('The Challenge', 'h3'),
          lexParagraph(
            'The client needed a modern, scalable solution that could serve millions of users while maintaining brand consistency across every touchpoint.',
          ),
          lexHeading('Our Approach', 'h3'),
          lexParagraph(
            'We combined research-driven strategy with iterative design and agile development to deliver measurable results within a tight timeline.',
          ),
        ]),
      },
    })
  }

  /* ------------------------------------------------------------------
   * Legal Pages
   * ------------------------------------------------------------------ */

  payload.logger.info(`— Seeding legal pages...`)

  const legalPagesData = [
    {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      content: lexRichText([
        lexHeading('Privacy Policy'),
        lexParagraph(
          'This is a placeholder privacy policy. Replace this content with your actual privacy policy before going live.',
        ),
        lexHeading('Data We Collect', 'h3'),
        lexParagraph(
          'We collect only the data necessary to provide our services, including contact information submitted through forms.',
        ),
        lexHeading('How We Use Your Data', 'h3'),
        lexParagraph(
          'Your data is used solely for the purpose for which it was collected and is never sold to third parties.',
        ),
      ]),
    },
    {
      title: 'Terms of Service',
      slug: 'terms-of-service',
      content: lexRichText([
        lexHeading('Terms of Service'),
        lexParagraph(
          'This is a placeholder terms of service. Replace this content with your actual terms before going live.',
        ),
        lexHeading('Acceptable Use', 'h3'),
        lexParagraph(
          'By using this website, you agree to use it in a lawful manner and in accordance with these terms.',
        ),
      ]),
    },
    {
      title: 'Cookie Policy',
      slug: 'cookie-policy',
      content: lexRichText([
        lexHeading('Cookie Policy'),
        lexParagraph(
          'This site uses only strictly necessary cookies for admin authentication. No tracking or analytics cookies are set for public visitors.',
        ),
      ]),
    },
  ]

  for (const lp of legalPagesData) {
    await payload.create({
      collection: 'legal-pages',
      context: { disableRevalidate: true },
      data: {
        title: lp.title,
        slug: lp.slug,
        content: lp.content,
        lastUpdated: new Date().toISOString(),
      },
    })
  }

  /* ------------------------------------------------------------------
   * Demos
   * ------------------------------------------------------------------ */

  payload.logger.info(`— Seeding demos...`)

  const demosData = [
    {
      title: 'AI Chatbot Assistant',
      slug: 'ai-chatbot-assistant',
      summary:
        'An intelligent chatbot that answers product questions and guides users through the sales funnel.',
      demoType: 'chatbot' as const,
      status: 'active' as const,
    },
    {
      title: 'Voice-Powered Search',
      slug: 'voice-powered-search',
      summary: 'Search your product catalogue using natural language voice commands.',
      demoType: 'voice-assistant' as const,
      status: 'active' as const,
    },
    {
      title: 'Automated Onboarding Workflow',
      slug: 'automated-onboarding-workflow',
      summary:
        'An N8N-powered workflow that automates client onboarding from form submission to project kickoff.',
      demoType: 'workflow' as const,
      status: 'coming-soon' as const,
    },
  ]

  await Promise.all(
    demosData.map((demo, i) =>
      payload.create({
        collection: 'demos',
        context: { disableRevalidate: true },
        data: {
          title: demo.title,
          slug: demo.slug,
          summary: demo.summary,
          demoType: demo.demoType,
          status: demo.status,
          coverImage: image2Doc.id,
          sortOrder: i + 1,
          content: lexRichText([lexHeading(demo.title), lexParagraph(demo.summary)]),
        },
      }),
    ),
  )

  /* ------------------------------------------------------------------
   * Portfolio
   * ------------------------------------------------------------------ */

  payload.logger.info(`— Seeding portfolio items...`)

  const portfolioData = [
    {
      title: 'Globex Annual Report 2024',
      slug: 'globex-annual-report-2024',
      mediaType: 'editorial' as const,
      description:
        'A digital-first annual report combining data visualisation with immersive storytelling.',
      featured: true,
    },
    {
      title: 'Umbrella Dashboard UI',
      slug: 'umbrella-dashboard-ui',
      mediaType: 'image' as const,
      description:
        'A real-time analytics dashboard designed for pharmaceutical supply chain monitoring.',
      featured: true,
    },
    {
      title: 'Stark Brand Film',
      slug: 'stark-brand-film',
      mediaType: 'video' as const,
      description:
        'A 90-second brand film showcasing innovation across the Stark product ecosystem.',
      featured: false,
    },
    {
      title: 'Wayne Analytics Platform',
      slug: 'wayne-analytics-platform',
      mediaType: 'image' as const,
      description:
        'End-to-end redesign of a financial analytics platform serving 50K+ daily active users.',
      featured: true,
    },
  ]

  await Promise.all(
    portfolioData.map((item) =>
      payload.create({
        collection: 'portfolio',
        context: { disableRevalidate: true },
        data: {
          title: item.title,
          slug: item.slug,
          mediaType: item.mediaType,
          description: item.description,
          featured: item.featured,
          media: image3Doc.id,
          publishedAt: new Date().toISOString(),
        },
      }),
    ),
  )

  /* ------------------------------------------------------------------
   * Posts
   * ------------------------------------------------------------------ */

  payload.logger.info(`— Seeding posts...`)

  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: { relatedPosts: [post2Doc.id, post3Doc.id] },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: { relatedPosts: [post1Doc.id, post3Doc.id] },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: { relatedPosts: [post1Doc.id, post2Doc.id] },
  })

  /* ------------------------------------------------------------------
   * Contact form & Pages
   * ------------------------------------------------------------------ */

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
  })

  payload.logger.info(`— Seeding pages...`)

  const [_, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home({
        heroImage: imageHomeDoc,
        metaImage: image2Doc,
        testimonialIds: testimonialDocs.map((t) => t.id),
      }),
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
    }),
  ])

  /* ------------------------------------------------------------------
   * Globals – Header & Footer
   * ------------------------------------------------------------------ */

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          { link: { type: 'custom', label: 'Services', url: '/services' } },
          { link: { type: 'custom', label: 'Work', url: '/posts' } },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: { relationTo: 'pages', value: contactPage.id },
            },
          },
        ],
        ctaButtons: [
          {
            link: { type: 'custom', appearance: 'default', label: 'Get a Quote', url: '/contact' },
          },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        columns: [
          {
            heading: 'Agency',
            links: [
              { link: { type: 'custom', label: 'About', url: '/about' } },
              { link: { type: 'custom', label: 'Blog', url: '/posts' } },
              { link: { type: 'custom', label: 'Careers', url: '/careers' } },
            ],
          },
          {
            heading: 'Services',
            links: serviceDocs.map((s) => ({
              link: {
                type: 'reference' as const,
                label: s.title,
                reference: { relationTo: 'services' as const, value: s.id },
              },
            })),
          },
          {
            heading: 'Legal',
            links: [
              {
                link: {
                  type: 'custom',
                  label: 'Privacy Policy',
                  url: '/legal-pages/privacy-policy',
                },
              },
              {
                link: {
                  type: 'custom',
                  label: 'Terms of Service',
                  url: '/legal-pages/terms-of-service',
                },
              },
              {
                link: { type: 'custom', label: 'Cookie Policy', url: '/legal-pages/cookie-policy' },
              },
            ],
          },
          {
            heading: 'Connect',
            links: [
              {
                link: {
                  type: 'reference' as const,
                  label: 'Contact Us',
                  reference: { relationTo: 'pages' as const, value: contactPage.id },
                },
              },
              { link: { type: 'custom', label: 'Admin', url: '/admin' } },
            ],
          },
        ],
        legalLine: `© ${new Date().getFullYear()} Agency Name. All rights reserved.`,
        socialLinks: [
          { platform: 'twitter', url: 'https://x.com' },
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'github', url: 'https://github.com' },
        ],
      },
    }),
  ])

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Agency Name',
      siteDescription:
        'A full-service digital agency delivering strategy, design, and engineering.',
      contactEmail: 'hello@agency.example',
      contactPhone: '+1 (555) 123-4567',
      address: '123 Innovation Drive\nSan Francisco, CA 94105',
      socialLinks: [
        { platform: 'twitter', url: 'https://x.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'github', url: 'https://github.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
      ],
    },
  })

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
