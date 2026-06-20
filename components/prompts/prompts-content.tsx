"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { PromptsHeader } from "./prompts-header"
import { PromptList } from "./prompt-list"
import { PromptDialog } from "./prompt-dialog"
import { useCreatePromptMutation } from "@/hooks/mutation/useCreatePromptMutation"
import { useTranslations } from "next-intl"
import type { PromptFormValues } from "./prompt-form/prompt-schema"
import { isDemoMode } from "@/lib/demo"
import { Card } from "@/components/ui/card"

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
      {isDemo && (
        <Card className="flex flex-row items-start gap-3 border-destructive/20 bg-destructive/5 px-4 py-4 text-sm text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-destructive" />
          <p>
            En mode démo, les prompts sont en lecture seule et ne peuvent pas
            être modifiés.
          </p>
        </Card>
      )}
    </section>
  )
}
