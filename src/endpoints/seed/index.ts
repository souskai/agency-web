import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import type { Service } from '@/payload-types'

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
    data: { siteName: 'Souskai', socialLinks: [] },
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
    layout?: NonNullable<Service['layout']>
  }[] = [
    {
      title: 'Web Development',
      slug: 'web-development',
      summary:
        'Type-safe web platforms on Payload CMS + Next.js that you own outright — schema, database, and code.',
      icon: 'code',
      features: [
        { title: 'Headless CMS', description: 'Payload CMS, Sanity, and Contentful integrations.' },
        { title: 'Performance', description: 'Core Web Vitals optimisation and edge deployment.' },
      ],
      layout: [
        {
          blockName: 'Built to be cited',
          blockType: 'contentColumns',
          eyebrow: 'Web development',
          title: 'Built to be cited.',
          paragraphs: [
            {
              text: "Most sites answer questions nobody asked, then go dark when the editor who built them leaves. We build differently: a platform you own outright — schema, database, and code — so the record survives the people who made it.",
            },
            {
              text: 'Payload CMS models your content in TypeScript. Next.js App Router serves it from the edge. PostgreSQL on Neon keeps every row in your account. One type-safe codebase from schema to deploy.',
            },
            {
              text: 'The proof is this site — it is open source, so you can read the schema and the components before you hire us.',
            },
          ],
          links: [
            {
              link: {
                type: 'custom',
                appearance: 'default',
                label: 'Read the code',
                url: 'https://github.com/souskai/agency-web',
              },
            },
          ],
        },
        {
          blockName: 'Every layer wired',
          blockType: 'featureGridBasic',
          eyebrow: 'The stack',
          title: 'Every layer wired, typed, and owned',
          description:
            'A platform is not a page. Every layer below is wired to the one above, so a schema change never silently breaks the front end.',
          items: [
            {
              title: 'Schema becomes TypeScript',
              description:
                'Payload generates your types from the content model. Rename a field and the build fails — not the page.',
            },
            {
              title: 'Server components by default',
              description:
                'React Server Components ship less JavaScript to the browser, so pages render fast and hydrate with almost nothing.',
            },
            {
              title: 'PostgreSQL you control',
              description:
                'Neon gives you real migrations, real backups, and real query access. Your rows, exported on your terms.',
            },
            {
              title: 'Cache invalidation, not evasion',
              description:
                'Next.js cache tags, invalidated by Payload afterChange hooks — content updates instantly without disabling the cache.',
            },
            {
              title: 'Edge rendering',
              description:
                'Static and server-rendered routes on Vercel edge, with Core Web Vitals measured in CI on real devices.',
            },
            {
              title: 'CI gates every merge',
              description:
                'Type checks, lint, and previews run before anything reaches production. Nothing ships unverified.',
            },
          ],
        },
        {
          blockName: 'Proof',
          blockType: 'statsGrid',
          eyebrow: 'Proof',
          title: 'Facts to point at, not adjectives',
          description:
            'The numbers below are properties of the stack we ship, not promises we hope to keep.',
          metrics: [
            { value: '100%', label: 'TypeScript, end to end' },
            { value: '0', label: 'plugins to patch' },
            { value: '1', label: 'repo you own' },
            { value: 'sub-second', label: 'edge responses, measured' },
          ],
        },
        {
          blockName: 'What ships',
          blockType: 'featureBento',
          eyebrow: 'What ships',
          title: 'Not a theme — a platform you extend',
          items: [
            {
              title: 'The schema is the type system',
              description:
                'Define content once in Payload and the TypeScript types, the admin forms, and the page components all agree. No schema drift, no guesswork.',
            },
            {
              title: 'A block library, not a page builder',
              description:
                'Sections are reusable blocks your editors drop into any page. The tenth page costs less than the first.',
            },
            {
              title: 'Live preview',
              description:
                'Editors see drafts render in real time — responsive, on real data — before anything is published.',
            },
            {
              title: 'Forms and captures',
              description:
                'Native form builder with your own storage. No third-party form tax, no data leaving your account.',
            },
            {
              title: 'Redirects and search',
              description:
                '301s, sitemaps, and search live in your config, versioned in the repo with the rest of the platform.',
            },
          ],
        },
        {
          blockName: 'How the work lands',
          blockType: 'featureSteps',
          eyebrow: 'Process',
          title: 'How the work lands',
          items: [
            {
              title: 'Schema & content model first',
              description:
                'We model your content in TypeScript before pixels, so the site can grow without a redesign.',
            },
            {
              title: 'Component design in code',
              description:
                'Shadcn UI + Tailwind, built as reusable blocks your team edits in a visual admin.',
            },
            {
              title: 'Deploy on the edge',
              description:
                'Vercel edge caching, sub-second responses, and Core Web Vitals measured — not promised.',
            },
            {
              title: 'Documented handover',
              description:
                'You get the repo, the database, and the docs — schema notes, deploy steps, and an architecture map.',
            },
          ],
        },
        {
          blockName: 'Web development FAQ',
          blockType: 'faqAccordion',
          eyebrow: 'FAQ',
          title: 'Questions we get before kickoff',
          items: [
            {
              question: 'Will we own the code?',
              answer: 'Yes — full repository access, your license, your accounts. You can hand it to any team tomorrow.',
            },
            {
              question: 'How fast?',
              answer:
                'We measure per-route Core Web Vitals in CI; targets are set before launch, not after.',
            },
            {
              question: 'Can you migrate an existing site?',
              answer: 'Yes — content, redirects, and SEO metadata migrate first; design follows.',
            },
            {
              question: 'What happens if we part ways?',
              answer:
                'The platform keeps running. The code, the database, and the hosting live in your accounts, not ours.',
            },
            {
              question: 'Why Payload CMS and not WordPress?',
              answer:
                'WordPress couples content to a plugin ecosystem you do not control. Payload keeps your schema in your code, typed and versioned.',
            },
          ],
        },
        {
          blockName: 'Web development CTA',
          blockType: 'callToActionCentered',
          title: 'Build the record. Own the record.',
          links: [
            {
              link: {
                type: 'custom',
                appearance: 'default',
                label: 'Start a project',
                url: '/contact',
              },
            },
            {
              link: {
                type: 'custom',
                appearance: 'outline',
                label: 'Read the code',
                url: 'https://github.com/souskai/agency-web',
              },
            },
          ],
        },
      ],
    },
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
      layout: [
        {
          blockName: 'Where you are today',
          blockType: 'contentColumns',
          eyebrow: 'Digital strategy',
          title: 'Strategy is an architecture decision, not a slide deck.',
          paragraphs: [
            {
              text: "Most digital strategies stop at a deck. Ours starts with what you're actually running: a WordPress site held together by plugins, a page builder nobody can maintain, or a SaaS CMS that charges per record and keeps your content behind an API you don't control.",
            },
            {
              text: 'We audit what you have — content model, front end, hosting, and who can change what — then map it to a platform you own: Payload CMS, Next.js App Router, and PostgreSQL in your account.',
            },
            {
              text: 'No plugin patch treadmill, no per-record content pricing, no PHP and JavaScript split-brain. One type-safe codebase from schema to edge.',
            },
          ],
        },
        {
          blockName: 'Current stack audit',
          blockType: 'featureGridBasic',
          eyebrow: 'Current stack',
          title: 'Signs your platform is costing you more than it should',
          description:
            'Every incumbent stack gives off the same early-warning signals. If a few of these sound familiar, your strategy has a measurement gap.',
          items: [
            {
              title: 'Plugin bloat and patch treadmill',
              description:
                'A WordPress build with thirty-plus plugins turns every security patch into a compatibility lottery, and the site breaks in ways no one can reproduce.',
            },
            {
              title: "Content you can't model",
              description:
                'Page builders store design, not data. Reusing a component means copy-paste, and a redesign means rebuilding every page by hand.',
            },
            {
              title: 'Mixed PHP and JavaScript',
              description:
                'Templates, plugins, and theme code share one runtime, so new hires ramp slowly and every audit gets expensive.',
            },
            {
              title: "A database you don't control",
              description:
                "Shared hosting with an opaque database and no query access means you can't export, report, or migrate without asking a vendor.",
            },
            {
              title: 'Per-record pricing and lock-in',
              description:
                'SaaS headless CMS bills scale with content volume, and the content model is their schema — not yours.',
            },
            {
              title: 'Unknown numbers',
              description:
                "If you can't answer 'what is our TTFB, LCP, and monthly hosting cost?', your strategy has a measurement gap.",
            },
          ],
        },
        {
          blockName: 'Onboarding',
          blockType: 'featureSteps',
          eyebrow: 'Onboarding',
          title: 'From first call to first deploy',
          description:
            'A fixed, five-step path from the first call to a platform your team can run without us.',
          items: [
            {
              title: 'Discovery and audit',
              description:
                'We inventory your current site, content, analytics, and integrations — and agree the KPIs the platform must move.',
            },
            {
              title: 'Schema and content model',
              description:
                'We design your collections, fields, access rules, and localization in Payload before any UI exists. The data model is the plan.',
            },
            {
              title: 'Design system in the repo',
              description:
                'Tokens, components, and shadcn/ui primitives live in your codebase, not a vendor tool — so design and build never drift.',
            },
            {
              title: 'Build in reviewable increments',
              description:
                'Every change ships behind a preview URL with type checks and lint in CI. You review the real page, not a mockup.',
            },
            {
              title: 'Launch, measure, iterate',
              description:
                'We deploy to the edge, wire cache tags for instant content updates, and hand over the repo, the database, and the docs.',
            },
          ],
        },
        {
          blockName: 'Engineering standard',
          blockType: 'featureGridBasic',
          eyebrow: 'How we build',
          title: 'The engineering standard behind every engagement',
          description:
            'The practices that keep a strategy alive once it hits production — not just in the kickoff deck.',
          items: [
            {
              title: 'Type safety end to end',
              description:
                'Payload generates your TypeScript types from the schema. A renamed field breaks the build, not the page.',
            },
            {
              title: 'Caching you can control',
              description:
                'Next.js App Router cache tags, invalidated by Payload afterChange hooks — content updates instantly without disabling the cache.',
            },
            {
              title: 'Previews and CI on every change',
              description:
                'Draft previews, lint, and type checks gate every merge. Nothing reaches production unverified.',
            },
            {
              title: 'Performance budgets',
              description:
                'Core Web Vitals targets are agreed up front and measured on real devices — not just a Lighthouse screenshot.',
            },
            {
              title: 'You own the platform',
              description:
                'Your repository, your PostgreSQL database, your hosting account. No per-seat tax to keep the lights on.',
            },
            {
              title: 'Documented handover',
              description:
                'Schema notes, deploy steps, and an architecture map — so any team can pick up the code.',
            },
          ],
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
      layout: [
        {
          blockName: 'Why hire us',
          blockType: 'contentColumns',
          eyebrow: 'UI/UX design',
          title: 'Why hire us for UI/UX before development?',
          paragraphs: [
            {
              text: "User-centric approach — we design backwards from the person's task: journeys, states, and edge cases mapped before a single component is styled, so the interface answers the question it is actually asked.",
            },
            {
              text: '1:1 CMS mapping — every component we draw has a matching Payload field group. The admin form and the page component are the same object, so no design that engineering cannot ship and no content an editor cannot change.',
            },
            {
              text: 'Scalable architectures — tokens, variants, and composition rules come before pages. New sections assemble from existing primitives, so the tenth page costs less than the first and the system survives a rebrand.',
            },
          ],
        },
        {
          blockName: 'Design directly in code',
          blockType: 'faqAccordion',
          eyebrow: 'Method',
          title: 'Why we design directly in code',
          description:
            'Static mockups promise a perfect layout; the web is fluid, dynamic, and unpredictable. We design in the browser instead, so responsiveness, hover states, micro-interactions, and fluid type are baked in from day one — not patched in afterwards.',
          items: [
            {
              question: 'Why not start with static design files?',
              answer:
                'A picture of a layout hides the parts that decide quality: how it reflows at 375px, what happens on hover and focus, how a twelve-word headline wraps next to a three-word one. We would rather answer those questions in the browser than discover them after handoff.',
            },
            {
              question: 'Who designs the page?',
              answer:
                'The same engineers who build it. They have the UI/UX depth to set spacing, alignment, and hierarchy directly in the medium the work ships in — so the design and the implementation never drift apart.',
            },
            {
              question: 'How does that fit a block-based CMS?',
              answer:
                'Every block we design is a living component with a matching Payload field group, not a picture of one. We see how CMS data flows into the UI and test editorial limits — short headline versus long, one card versus six — as we build.',
            },
            {
              question: 'How do we review the work?',
              answer:
                'On a real staging URL, not a clickable image. What you approve is what goes live, and there is no duplicate effort translating a static picture into Tailwind or CSS.',
            },
          ],
        },
        {
          blockName: 'Design system',
          blockType: 'designSystem',
        },
        {
          blockName: 'What actually ships',
          blockType: 'featureGridBasic',
          eyebrow: 'Deliverables',
          title: 'What actually ships',
          description:
            'Design in code is not a metaphor. Every engagement ends with these artifacts in your repository, versioned with the site.',
          items: [
            {
              title: 'Design tokens',
              description:
                'Color, type, spacing, and radius as CSS variables in one @theme source — light and dark from a single definition.',
            },
            {
              title: 'Component library',
              description:
                'shadcn/ui primitives plus reusable blocks, documented so any editor can assemble a page without design help.',
            },
            {
              title: 'Admin parity',
              description:
                'Each block exposes its own Payload field group, so the form an editor fills mirrors the component on the page.',
            },
            {
              title: 'Motion spec',
              description:
                'Low-frequency, purposeful motion with reduced-motion fallbacks — no decoration that fights the user.',
            },
            {
              title: 'Accessibility pass',
              description:
                'Contrast, focus order, and keyboard paths are part of the component spec, not a post-launch audit.',
            },
            {
              title: 'Docs & handover',
              description:
                'A token map and block inventory, so the next team inherits the system — not a pile of files.',
            },
          ],
        },
        {
          blockName: 'From tokens to handover',
          blockType: 'featureSteps',
          eyebrow: 'Process',
          title: 'From tokens to handover',
          items: [
            {
              title: 'Audit & inventory',
              description:
                'We map the existing pages, content model, and brand assets to find what is reusable and what must be rebuilt.',
            },
            {
              title: 'Tokens & theme',
              description:
                'Color, type, spacing, and radius are defined once in code, then mirrored for anyone working in a design tool.',
            },
            {
              title: 'Components in code',
              description:
                'Blocks are built as living components with their own Payload fields — never as static pictures of components.',
            },
            {
              title: 'Handover & governance',
              description:
                'You receive the repo, the token map, and the docs. Design and build stay in one type-safe codebase.',
            },
          ],
        },
        {
          blockName: 'Design CTA',
          blockType: 'callToActionCentered',
          title: 'Design as code, not decoration.',
          links: [
            {
              link: {
                type: 'custom',
                appearance: 'default',
                label: 'Start a project',
                url: '/contact',
              },
            },
          ],
        },
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
        layout: s.layout ?? [],
        hero: {
          type: 'lowImpact',
          richText: lexRichText([lexHeading(s.title, 'h1'), lexParagraph(s.summary)]),
        },
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

  const [homePage, contactPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: home(),
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
          {
            link: { type: 'custom', label: 'Services', url: '/services' },
            children: serviceDocs.map((s) => ({
              link: {
                type: 'reference' as const,
                label: s.title,
                reference: { relationTo: 'services' as const, value: s.id },
              },
            })),
          },
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
        legalLine: `© ${new Date().getFullYear()} Souskai. All rights reserved.`,
        socialLinks: [
          { platform: 'twitter', url: 'https://x.com' },
          { platform: 'linkedin', url: 'https://linkedin.com' },
          { platform: 'github', url: 'https://github.com' },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'services-page',
      data: {
        hero: {
          type: 'heroGrid',
          richText: lexRichText([lexHeading('Choose the work. Own the platform.', 'h1')]),
          links: [
            {
              link: {
                type: 'custom',
                appearance: 'default',
                label: 'Start a project',
                url: '/contact',
              },
            },
            {
              link: {
                type: 'custom',
                appearance: 'outline',
                label: 'See our thinking',
                url: '/posts',
              },
            },
          ],
          eyebrow: 'What we build',
          description:
            'Three engagements, one standard: type-safe architecture, a schema you control, and code any team can pick up. Plug in at strategy, design, or the full build — or chain all three from first principles to production.',
        },
      },
    }),
  ])

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'Souskai',
      siteDescription:
        'We engineer modern, type-safe web platforms using Payload CMS and Next.js. We open-sourced the code running this exact site to prove our standards.',
      contactEmail: 'info@souskai.com',
      contactPhone: '+1 (758) 721-3630',
      address: 'Saint Lucia\nAtlanta, USA\nToronto, Canada',
      socialLinks: [
        { platform: 'twitter', url: 'https://x.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
        { platform: 'github', url: 'https://github.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
      ],
    },
  })

  /* ------------------------------------------------------------------
   * Publish pages — created as drafts above so the globals could
   * reference them without a cross-connection FK visibility race (Neon).
   * ------------------------------------------------------------------ */

  payload.logger.info(`— Publishing pages...`)

  for (const page of [homePage, contactPage]) {
    await payload.update({
      collection: 'pages',
      id: page.id,
      data: { _status: 'published' as const },
      req,
    })
  }

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
