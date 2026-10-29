'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import RichText from '@/components/RichText'
import { SectionShell } from '@/components/SectionShell'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  // Anti-spam guard inputs (consumed by `formSpamGuard` on the server).
  const startedAtInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input = startedAtInputRef.current
    if (input) input.value = String(Date.now())
  }, [])

  const onSubmit = useCallback(
    (data: FormFieldBlock[], event?: React.BaseSyntheticEvent) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        let honeypot = ''
        let startedAt = 0
        const formEl = event?.currentTarget as HTMLFormElement | undefined
        if (formEl) {
          const formData = new FormData(formEl)
          honeypot = String(formData.get('__honeypot') ?? '')
          startedAt = Number(formData.get('__started_at') || 0)
        }

        const dataToSend = [
          ...Object.entries(data).map(([name, value]) => ({
            field: name,
            value,
          })),
          { field: '__honeypot', value: honeypot },
          { field: '__started_at', value: String(startedAt) },
        ]

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: String(req.status),
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <SectionShell className="lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <div role="status" aria-live="polite" tabIndex={-1}>
              <RichText data={confirmationMessage} />
            </div>
          )}
          {isLoading && !hasSubmitted && (
            <p aria-live="polite" className="text-sm text-muted-foreground">
              Sending, please wait…
            </p>
          )}
          {error && (
            <div
              aria-live="polite"
              className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error.status === '429'
                ? 'Too many submissions — please wait a minute and try again.'
                : 'Something went wrong sending your message. Please try again or email us directly.'}
            </div>
          )}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div
                aria-hidden="true"
                className="absolute h-px w-px overflow-hidden whitespace-nowrap -left-[9999px]"
              >
                <label htmlFor="__honeypot">Leave this field empty</label>
                <input
                  id="__honeypot"
                  name="__honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  type="text"
                />
              </div>
              <input ref={startedAtInputRef} type="hidden" name="__started_at" />
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button form={formID} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </SectionShell>
  )
}
