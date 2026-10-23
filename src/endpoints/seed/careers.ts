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

export const careers: () => RequiredDataFromCollectionSlug<'pages'> = () => {
  const layout: PageBlock[] = [
    {
      blockName: 'Why we are building',
      blockType: 'contentColumns',
      eyebrow: "Why we're building",
      title: 'Less energy. More honesty.',
      paragraphs: [
        {
          text: 'A typical WordPress site ships a plugin stack heavy enough to render a paragraph. Every extra megabyte is electricity. We build on Payload CMS and Next.js because a typed, server-rendered platform does the same job with a fraction of the compute — fewer plugins, fewer round trips, less burned to say the same thing.',
        },
        {
          text: "The ad-funded playbook — harvest everything, price it dynamically, hope nobody reads the policy — is not the web we want to work on. We take on fintech and AI products where being wrong has consequences, and every engagement starts with data sovereignty: your schema, your database, your audit trail.",
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
      blockName: 'The work',
      blockType: 'featureGridBasic',
      eyebrow: 'The work',
      title: 'Problems worth your next five years',
      description:
        "We're deliberately narrow. These are the problems we take on, and the standard we hold them to.",
      items: [
        {
          title: 'Fintech you can audit',
          description:
            "Payments, ledgers, and KYC flows where a wrong number is someone's rent. Tests, logs, and an audit trail come standard.",
        },
        {
          title: 'AI you can trust',
          description:
            "Assistants and retrieval that cite their sources and keep customer data inside the customer's account.",
        },
        {
          title: 'Data sovereignty by default',
          description:
            'Schemas and databases that belong to the client — exportable, migratable, and readable years after handover.',
        },
        {
          title: 'A smaller footprint',
          description:
            'Server components, edge caching, and no plugin sprawl: the same result with a fraction of the compute.',
        },
      ],
    },
    {
      blockName: 'How we hire',
      blockType: 'featureSteps',
      eyebrow: 'Hiring',
      title: 'A conversation, not a gauntlet',
      items: [
        {
          title: 'Intro call',
          description:
            'Thirty minutes. You tell us what you want to build and how you like to work. No trick questions.',
        },
        {
          title: 'Paid work sample',
          description:
            'A small, real problem from our backlog, scoped to a few hours and paid at your rate.',
        },
        {
          title: 'Meet the team',
          description: 'The people you would actually work with. You interview us too.',
        },
        {
          title: 'Offer and first week',
          description: 'Clear scope, fair rate, and a real project with a named mentor.',
        },
      ],
    },
    {
      blockName: 'Careers FAQ',
      blockType: 'faqAccordion',
      eyebrow: 'Questions',
      title: 'The things people actually ask',
      items: [
        {
          question: 'Do you hire juniors?',
          answer:
            "Yes — with a real mentor and a real project. We would rather grow one person properly than hire three to bill them out.",
        },
        {
          question: 'Remote or office?',
          answer:
            "Remote-first with overlapping hours. We care that the work lands, not where your desk is.",
        },
        {
          question: 'Do you take contract work?',
          answer: "Sometimes. Tell us what you're excellent at and we'll be honest about fit.",
        },
        {
          question: "What's the stack?",
          answer:
            "TypeScript, Next.js App Router, Payload CMS, PostgreSQL. We'll teach you the parts you haven't touched.",
        },
      ],
    },
    {
      blockName: 'Careers CTA',
      blockType: 'callToActionCentered',
      title: 'Nothing open that fits? Write anyway.',
      description: "We keep a short list of people we'd build with before a role exists.",
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Start a conversation',
            url: '/contact',
          },
        },
      ],
    },
  ]

  return {
    slug: 'careers',
    _status: 'published',
    hero: {
      type: 'lowImpact',
      richText: richRoot([
        heading('Help us take the web back.', 'h1'),
        paragraph(
          "We're a small studio building fintech and AI products that answer to their users, not to an ad auction. If you want your work to cost the planet less and respect the people using it, we should talk.",
        ),
      ]),
    },
    layout,
    meta: {
      description:
        'Join a small studio building fintech and AI products that respect their users and the planet — Payload CMS, Next.js, and data sovereignty by default.',
      title: 'Careers',
    },
    title: 'Careers',
  }
}