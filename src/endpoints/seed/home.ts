import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Page } from '@/payload-types'

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

export const home: () => RequiredDataFromCollectionSlug<'pages'> = () => {
  const layout: PageBlock[] = [
    {
      blockName: 'What we do',
      blockType: 'contentColumns',
      eyebrow: 'What we do',
      title: 'One senior team, from first sketch to shipped product.',
      paragraphs: [
        {
          text: 'Strategy, brand, design, and engineering in one small team of full-stack developers. The people who shape how your story looks are the same people who design the database behind it — no handoffs, no translation layer, no juniors learning on your budget.',
        },
        {
          text: 'You get the polish of a design studio and the discipline of a product team: a site that looks the part, reads clearly, and still holds up when real traffic finds it.',
        },
      ],
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'See how we work',
            url: '/services',
          },
        },
      ],
    },
    {
      blockName: 'Positioning',
      blockType: 'comparatorGrid',
      title: 'Own your stack, or keep renting it',
      description:
        'You keep the schema, the database, and the code. The incumbents keep you on theirs.',
      plans: [
        { name: 'Payload CMS + Next.js', badge: 'Souskai', highlighted: true },
        { name: 'Legacy monolith (WordPress)' },
        { name: 'SaaS headless (Contentful / Sanity)' },
      ],
      features: [
        {
          feature: 'Content model',
          values: [
            { label: 'Your schema, versioned in TypeScript' },
            { label: 'Plugin sprawl, patch treadmill' },
            { label: "Schema locked to a vendor's pricing tiers" },
          ],
        },
        {
          feature: 'Data',
          values: [
            { label: 'Native PostgreSQL (Neon) — your data, your rows' },
            { label: 'Opaque shared hosting' },
            { label: 'Content you rent, not own' },
          ],
        },
        {
          feature: 'Speed',
          values: [
            { label: 'App Router + edge caching, measured Core Web Vitals' },
            { label: 'Slow TTFB, monolithic deploys' },
            { label: "GraphQL layers you can't tune" },
          ],
        },
        {
          feature: 'Ownership',
          values: [
            { label: 'You keep the code, the DB, the license' },
            { label: "A stack you can't audit" },
            { label: 'Lock-in by per-record pricing' },
          ],
        },
      ],
    },
    {
      blockName: 'Pillars',
      blockType: 'featureGridBasic',
      eyebrow: 'What you keep',
      title: 'Own the code. Own the data. Own the archive.',
      description:
        'Three things no platform can take back when you build on a sovereign stack.',
      items: [
        {
          title: 'Own the code',
          description:
            'The repo is public. Next.js App Router + Payload CMS, fully typed. No mystery layer between you and your platform.',
        },
        {
          title: 'Own the data',
          description:
            'PostgreSQL on Neon. Your schema, your migrations, your backup story — real exports, not exports-you-hope-work.',
        },
        {
          title: 'Own the archive',
          description:
            "Drafts, revision history, self-hosted content. Your institutional memory lives on infrastructure you control, not a platform that can de-platform you.",
        },
      ],
    },
    {
      blockName: 'CTA',
      blockType: 'callToActionCentered',
      title: 'We open-sourced this site so you can audit our standards before you hire us.',
      description: 'Read the repo, not our adjectives.',
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Read the code',
            url: 'https://github.com/souskai/agency-web',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'Start a project',
            url: '/contact',
          },
        },
      ],
    },
  ]

  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'heroGrid',
      richText: richRoot([heading('Websites you own, not rent.', 'h1')]),
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
      eyebrow: 'Engineering-led web studio',
      description:
        'We design and build custom websites on Payload CMS — fast, considered, and built to last. You keep your content, your data, and your code.',
    },
    layout,
    meta: {
      description:
        'Engineering-led studio building type-safe Payload CMS + Next.js platforms you own outright — schema, database, and code. This site is open source: the proof is the codebase.',
      title: 'Souskai — Sovereign Web Platforms on Payload CMS + Next.js',
    },
    title: 'Home',
  }
}
