import { RequiredDataFromCollectionSlug } from 'payload'
import type { PostArgs } from './post-1'

import { head, lexicalRoot, mediaNode, para } from './lexical'

export const post3: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  blockImage,
  author,
}) => {
  return {
    slug: 'real-cost-of-a-rented-website',
    _status: 'published',
    authors: author ? [author] : [],
    content: lexicalRoot([
      para(
        "The cheapest website is the one where the vendor owns the upside. '$29 a month' looks like a bargain until you price the parts that aren't in the invoice: the content you can't fully export, the redesign you can't scope, and the leverage you hand over the moment you sign up.",
      ),
      head('Add up what the platform keeps'),
      para(
        'Every platform extracts value from your inertia. Your data trains their models. Your audience feeds their ad network. Your content model is their pricing tiers. None of that appears on the bill, but you pay for all of it.',
      ),
      para(
        "The counter is arithmetic, not ideology. Own the code and you own the exit: audits cost a day, migrations cost a deployment, and switching vendors costs nothing because you were never locked to one. Rent, and every improvement you pay for makes leaving more expensive.",
      ),
      mediaNode(blockImage.id),
      head('Sovereignty is just good unit economics'),
      para(
        "The real cost of a rented website is optionality — the thing you give up to save a little time today. Open, self-hostable infrastructure isn't a political statement. It's the only deal where the value you build compounds for you instead of for the platform.",
      ),
    ]),
    meta: {
      description:
        "The clearest way to see platform risk is to price it. What 'just $29/month' actually costs when the platform owns your content, your data, and your leverage.",
      title: 'The real cost of a rented website',
    },
    relatedPosts: [],
    title: 'The real cost of a rented website',
  }
}
