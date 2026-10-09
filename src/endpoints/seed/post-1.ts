import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

import { head, lexicalRoot, mediaNode, para } from './lexical'

export type PostArgs = {
  blockImage: Media
  author?: User
}

export const post1: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  blockImage,
  author,
}) => {
  return {
    slug: 'own-the-record-open-stack',
    _status: 'published',
    authors: author ? [author] : [],
    content: lexicalRoot([
      para(
        "Every platform you publish on makes the same promise: your content is safe. What none of them promise is that it stays yours. Accounts get suspended, features get deprecated, and the export button quietly disappears the moment the pricing page changes.",
      ),
      head("You can't version what you don't own"),
      para(
        "Ownership isn't a philosophy for us; it's an engineering choice. When your schema lives in TypeScript and your data lives in a PostgreSQL you control, a migration is a versioned file, not a leap of faith. You can diff your content model the way you diff code, and roll back a bad change the way you'd revert a commit.",
      ),
      para(
        "That's the difference between renting a room and holding the title. On a hosted SaaS, your content model is whatever the vendor's API happens to expose. On an open stack, the model is the repo — portable, inspectable, and impossible to take back.",
      ),
      mediaNode(blockImage.id),
      head('Type-safe from schema to UI'),
      para(
        "We generate types from the content model, which means an editor can't invent a field the frontend doesn't understand. Drafts, revision history, and scheduled publishing mean every change has an audit trail — which is what owning the record actually costs in practice.",
      ),
      para(
        'Open source is the only way to prove that claim before you spend anything. This site is the evidence: read the code, run it locally, and decide for yourself whether the stack — or the platform — should own your memory.',
      ),
    ]),
    meta: {
      description:
        "Every platform promises your content is safe — until it isn't. Why we build on open, self-hostable stacks where the record belongs to you.",
      title: 'Own the record: why we build on an open stack',
    },
    relatedPosts: [],
    title: 'Own the record: why we build on an open stack',
  }
}
