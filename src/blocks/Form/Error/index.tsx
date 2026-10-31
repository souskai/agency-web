'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'

export const Error = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <div
        id={`${name}-error`}
        role="alert"
        className="text-sm text-destructive"
      >
        {(errors[name]?.message as string) || 'This field is required'}
      </div>
  )
}
