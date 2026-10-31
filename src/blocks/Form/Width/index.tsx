import * as React from 'react'

import { cn } from '@/utilities/ui'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className }) => {
  // The form-builder `width` prop (N% max-width inside a single column) is
  // intentionally dropped: it produced orphaned half-width fields. Every field
  // now spans its column, and `space-y-2` supplies the label/input/error rhythm
  // for every field type in one place.
  return <div className={cn('space-y-2', className)}>{children}</div>
}
