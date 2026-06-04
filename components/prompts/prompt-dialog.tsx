"use client"

import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PromptForm } from "@/components/prompt-form/prompt-form"
import type { PromptFormValues } from "@/components/prompt-form/prompt-schema"

interface PromptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  defaultValues?: Partial<PromptFormValues>
  submitLabel: string
  onSubmit: (values: PromptFormValues) => void
}

export function PromptDialog({
  open,
  onOpenChange,
  title,
  defaultValues,
  submitLabel,
  onSubmit,
}: PromptDialogProps) {
  const handleSubmit = (values: PromptFormValues) => {
    onSubmit(values)
    onOpenChange(false)
  }

  return (
    <DialogRoot open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <PromptForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={submitLabel}
        />
      </DialogContent>
    </DialogRoot>
  )
}
