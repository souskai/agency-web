import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="souskai"
      width={140}
      height={34}
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      src="/souskai-logo.svg"
    />
  )
}
