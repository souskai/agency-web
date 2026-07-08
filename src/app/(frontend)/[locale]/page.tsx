import PageTemplate, { generateMetadata as generateSlugMetadata } from './[slug]/page'

type Args = {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: Args) {
  const { locale } = await params
  return PageTemplate({
    params: Promise.resolve({ locale, slug: 'home' }),
  })
}

export async function generateMetadata({ params }: Args) {
  const { locale } = await params
  return generateSlugMetadata({
    params: Promise.resolve({ locale, slug: 'home' }),
  })
}
