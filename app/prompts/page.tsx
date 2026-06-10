"use client"

import { useState } from "react"
import { motion } from "motion/react"

import { PromptsHeader } from "@/components/prompts/prompts-header"
import { PromptList } from "@/components/prompts/prompt-list"
import { PromptDialog } from "@/components/prompts/prompt-dialog"
import { usePrompts } from "@/components/prompts/use-prompts"
import type { PromptFormValues } from "@/components/prompts/prompt-form/prompt-schema"
import type { Prompt } from "@/types/prompt"
import { fadeUp } from "@/lib/motion"

export default function PromptsPage() {
  const {
    prompts,
    activeCount,
    addPrompt,
    editPrompt,
    togglePrompt,
    deletePrompt,
  } = usePrompts()
  const [addOpen, setAddOpen] = useState(false)
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null)

  const handleEdit = (values: PromptFormValues) => {
    if (!editingPrompt) return
    editPrompt(editingPrompt.id, values)
    setEditingPrompt(null)
  }

  const editDefaultValues = editingPrompt
    ? { text: editingPrompt.text }
    : undefined
  const closeEditDialog = (open: boolean) => {
    if (!open) setEditingPrompt(null)
  }

  return (
    <motion.section
      className="mx-10 flex flex-col gap-6 pb-16"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <PromptsHeader
        activeCount={activeCount}
        totalCount={prompts.length}
        onAdd={() => setAddOpen(true)}
      />

      <PromptList
        prompts={prompts}
        onEdit={setEditingPrompt}
        onToggle={togglePrompt}
        onDelete={deletePrompt}
      />

      <PromptDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        title="Add prompt"
        submitLabel="Add prompt"
        onSubmit={addPrompt}
      />

      <PromptDialog
        open={editingPrompt !== null}
        onOpenChange={closeEditDialog}
        title="Edit prompt"
        defaultValues={editDefaultValues}
        submitLabel="Save"
        onSubmit={handleEdit}
      />
    </motion.section>
  )
}
