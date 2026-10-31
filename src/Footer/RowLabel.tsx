'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type FooterColumn = NonNullable<Footer['columns']>[number]
type FooterLegalLink = NonNullable<Footer['legalLinks']>[number]

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<FooterColumn | FooterLegalLink>()

  const heading = (data?.data as FooterColumn | undefined)?.heading
  const linkLabel = (data?.data as FooterLegalLink | undefined)?.link?.label
  const label =
    heading ||
    linkLabel ||
    (data.rowNumber !== undefined ? `Row ${data.rowNumber + 1}` : 'Row')

  return <div>{label}</div>
}
