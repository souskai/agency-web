'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type FooterColumn = NonNullable<Footer['columns']>[number]

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<FooterColumn>()

  const heading = data?.data?.heading
  const label = heading
    ? `Column ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${heading}`
    : 'Column'

  return <div>{label}</div>
}
