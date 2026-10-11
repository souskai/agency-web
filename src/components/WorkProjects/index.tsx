import React from 'react'

import type { CaseStudy, Service } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import { getTranslations } from '@/i18n/translations'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { SectionShell } from '@/components/SectionShell'
import RichText from '@/components/RichText'

type ProjectCardProps = {
  featured?: boolean
  eyebrow: string
  project: CaseStudy
}

const ProjectCard: React.FC<ProjectCardProps> = ({ featured = false, eyebrow, project }) => {
  const results = project.results ?? []
  const services = (project.services ?? []).filter(
    (service): service is Service => typeof service === 'object' && service !== null,
  )

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
        <h2
          className={`mt-2 font-semibold tracking-tight ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}
        >
          {project.title}
        </h2>
        {project.summary && (
          <p className="mt-3 max-w-xl text-muted-foreground">{project.summary}</p>
        )}
        {project.content && (
          <RichText
            className="mt-6 space-y-4 text-muted-foreground"
            data={project.content}
            enableGutter={false}
            enableProse={false}
          />
        )}
        {results.length > 0 && (
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {results.map((result, index) => (
              <div key={result.id ?? index}>
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  {result.metric}
                </dt>
                <dd className="mt-1 text-lg font-semibold">{result.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {services.length > 0 && (
          <p className="label mt-6">{services.map((service) => service.title).join(' · ')}</p>
        )}
        {project.projectLink?.url && (
          <div className="mt-6">
            <CMSLink
              url={project.projectLink.url}
              label={project.projectLink.label || 'Visit live site'}
              newTab={project.projectLink.newTab ?? true}
              appearance="default"
            />
          </div>
        )}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border">
        <Media resource={project.coverImage} fill imgClassName="object-cover" />
      </div>
    </div>
  )
}

/**
 * The `/work` collection index — the featured project renders first (large),
 * then the remaining projects in featured-first / `sortOrder` order. Each card
 * is content on the left and cover image on the right. Data is passed down from
 * the page (already fetched + cached via `getCachedProjects`), so this stays a
 * plain synchronous Server Component.
 */
export const WorkProjects: React.FC<{ projects: CaseStudy[]; locale?: Locale }> = ({
  projects,
  locale = 'en',
}) => {
  const t = getTranslations(locale)

  const phaseLabels: Record<CaseStudy['phase'], string> = {
    previous: t.work.previous,
    current: t.work.current,
    future: t.work.future,
  }

  const docs = [...projects].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1
    return (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  })

  const [featured, ...rest] = docs

  return (
    <>
      {featured && (
        <SectionShell spacing="md" id={`project-${featured.slug}`}>
          <ProjectCard project={featured} featured eyebrow={t.work.featured} />
        </SectionShell>
      )}
      {rest.map((project) => (
        <SectionShell key={project.id} spacing="md" id={`project-${project.slug}`}>
          <ProjectCard project={project} eyebrow={phaseLabels[project.phase] ?? project.phase} />
        </SectionShell>
      ))}
    </>
  )
}