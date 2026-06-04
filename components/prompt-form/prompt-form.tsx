"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

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
  submitLabel = "Add",
  isSubmitting = false,
}: PromptFormProps) {
  const { register, formState, reset, handleSubmit } =
    usePromptForm(defaultValues)

  const handlePromptSubmit = handleSubmit((values) => {
    onSubmit(values)
    reset()
  })

  return (
    <form onSubmit={handlePromptSubmit} className="flex flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="prompt-text">Prompt</FieldLabel>
        <Input
          id="prompt-text"
          placeholder="What are the best running shoes for marathon training?"
          autoFocus
          {...register("text")}
        />
        <FieldError errors={[formState.errors.text]} />
      </Field>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          disabled={isSubmitting || formState.isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
