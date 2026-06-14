"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { useTranslations } from "next-intl"
import { usePromptForm } from "./use-prompt-form"
import type { PromptFormValues } from "./prompt-schema"

interface PromptFormProps {
  onSubmit: (values: PromptFormValues) => void
  onCancel?: () => void
  defaultValues?: Partial<PromptFormValues>
  submitLabel?: string
  isSubmitting?: boolean
}

export function PromptForm({
  onSubmit,
  onCancel,
  defaultValues,
  submitLabel,
  isSubmitting = false,
}: PromptFormProps) {
  const t = useTranslations("prompts")
  const { register, formState, reset, handleSubmit } = usePromptForm(defaultValues)

  const handlePromptSubmit = handleSubmit((values) => {
    onSubmit(values)
    reset()
  })

  return (
    <form onSubmit={handlePromptSubmit} className="flex flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="prompt-text">{t("form.label")}</FieldLabel>
        <Input
          id="prompt-text"
          placeholder={t("form.placeholder")}
          autoFocus
          {...register("text")}
        />
        <FieldError errors={[formState.errors.text]} />
      </Field>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            {t("cancel")}
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          disabled={isSubmitting || formState.isSubmitting}
        >
          {submitLabel ?? t("addPrompt")}
        </Button>
      </div>
    </form>
  )
}
