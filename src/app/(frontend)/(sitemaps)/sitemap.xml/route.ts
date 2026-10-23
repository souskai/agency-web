import { getServerSideSitemapIndex } from 'next-sitemap'

import { getServerSideURL } from '@/utilities/getURL'

export async function GET() {
  const url = getServerSideURL()

  return getServerSideSitemapIndex([
    `${url}/pages-sitemap.xml`,
    `${url}/posts-sitemap.xml`,
  ])
}