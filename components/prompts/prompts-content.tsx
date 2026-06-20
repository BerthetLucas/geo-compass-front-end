"use client"

import { useState } from "react"
import { PromptsHeader } from "./prompts-header"
import { PromptList } from "./prompt-list"
import { PromptDialog } from "./prompt-dialog"
import { useCreatePromptMutation } from "@/hooks/mutation/useCreatePromptMutation"
import { useTranslations } from "next-intl"
import type { PromptFormValues } from "./prompt-form/prompt-schema"
import { isDemoMode } from "@/lib/demo"

export function PromptsContent() {
  const createMutation = useCreatePromptMutation()
  const t = useTranslations("prompts")
  const [addPromptModalOpen, setAddPromptModalOpen] = useState(false)
  const isDemo = isDemoMode()

  const handleAdd = (values: PromptFormValues) => {
    createMutation.mutate({ text: values.text })
  }

  return (
    <section className="mx-10 flex flex-col gap-6 pb-16">
      <PromptsHeader
        onAddPromptClick={() => setAddPromptModalOpen(true)}
        isDemo={isDemo}
      />
      <PromptList />
      {!isDemo && (
        <PromptDialog
          open={addPromptModalOpen}
          onOpenChange={setAddPromptModalOpen}
          title={t("addTitle")}
          submitLabel={t("addSubmit")}
          onSubmit={handleAdd}
        />
      )}
    </section>
  )
}
