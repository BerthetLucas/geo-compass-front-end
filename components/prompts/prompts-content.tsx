"use client"

import { useState } from "react"
import { PromptsHeader } from "./prompts-header"
import { PromptList } from "./prompt-list"
import { PromptDialog } from "./prompt-dialog"
import { useGetPromptListSuspenseQuery } from "@/hooks/queries/useGetPromptList"
import { useCreatePromptMutation } from "@/hooks/mutation/useCreatePromptMutation"
import type { PromptFormValues } from "./prompt-form/prompt-schema"

export function PromptsContent() {
  const { data: prompts } = useGetPromptListSuspenseQuery()
  const createMutation = useCreatePromptMutation()
  const [addPromptModalOpen, setAddPromptModalOpen] = useState(false)

  const activeCount = prompts.filter((p) => p.isActive).length

  const handleAdd = (values: PromptFormValues) => {
    createMutation.mutate({ text: values.text })
  }

  return (
    <section className="mx-10 flex flex-col gap-6 pb-16">
      <PromptsHeader
        activeCount={activeCount}
        totalCount={prompts.length}
        onAddPromptClick={() => setAddPromptModalOpen(true)}
      />
      <PromptList prompts={prompts} />
      <PromptDialog
        open={addPromptModalOpen}
        onOpenChange={setAddPromptModalOpen}
        title="Add prompt"
        submitLabel="Add prompt"
        onSubmit={handleAdd}
      />
    </section>
  )
}
