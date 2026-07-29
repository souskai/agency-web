import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <div className={clsx('flex items-center gap-2 max-w-56.25 w-full h-12.75', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 80 80"
        fill="none"
        role="img"
        aria-label="SousKai web development agency logo"
        className="h-full w-auto shrink-0"
      >
        {/* Hexagonal badge */}
        <path
          d="M40 12 L66 27 L66 53 L40 68 L14 53 L14 27 Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Left code bracket */}
        <path
          d="M32 34 L26 40 L32 46"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Right code bracket */}
        <path
          d="M48 34 L54 40 L48 46"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Forward slash */}
        <path
          d="M44 34 L36 46"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <span className="font-display font-bold tracking-tight text-[1.625rem] leading-none whitespace-nowrap">
        Souskai
      </span>
    </div>
  )
}
