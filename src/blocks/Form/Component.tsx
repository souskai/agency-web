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
    <SectionShell>
      <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-border/70 bg-card/35 px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <FormProvider {...formMethods}>
          {!hasSubmitted ? (
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-5">
                <p className="label w-fit">Get in touch</p>
                {enableIntro && introContent && (
                  <RichText
                    className="[&_h2]:text-4xl [&_h2]:font-medium [&_h2]:tracking-tight [&_p]:max-w-md [&_p]:text-muted-foreground sm:[&_h2]:text-5xl"
                    data={introContent}
                    enableGutter={false}
                  />
                )}
                <p className="text-sm text-muted-foreground">Fields marked * are required.</p>
              </div>
              <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <Field
                          key={index}
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      )
                    }
                    return null
                  })}
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
                <Button className="h-12 w-full" form={formID} type="submit" variant="default">
                  {submitButtonLabel}
                </Button>
                {isLoading && (
                  <p aria-live="polite" className="text-sm text-muted-foreground">
                    Sending, please wait…
                  </p>
                )}
              </form>
            </div>
          ) : confirmationType === 'message' ? (
            <div role="status" aria-live="polite" tabIndex={-1}>
              <RichText data={confirmationMessage} />
            </div>
          ) : null}
        </FormProvider>
      </div>
    </SectionShell>
  )
}
