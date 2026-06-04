"use client"

import { useState } from "react"
import { motion } from "motion/react"

import { PromptsHeader } from "@/components/prompts/prompts-header"
import { PromptList } from "@/components/prompts/prompt-list"
import { PromptDialog } from "@/components/prompts/prompt-dialog"
import type { Prompt } from "@/components/prompts/types"
import type { PromptFormValues } from "@/components/prompt-form/prompt-schema"
import { mockPrompts } from "@/mocks/prompts"
import { fadeUp } from "@/lib/motion"

function seedPrompts(): Prompt[] {
  return mockPrompts.map((p, i) => ({ id: String(i + 1), ...p }))
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>(seedPrompts)
  const [addOpen, setAddOpen] = useState(false)
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null)

  const handleAdd = (values: PromptFormValues) => {
    setPrompts((prev) => [
      ...prev,
      { id: String(Date.now()), text: values.text, isActive: true },
    ])
  }

  const handleEdit = (values: PromptFormValues) => {
    if (!editingPrompt) return
    setPrompts((prev) =>
      prev.map((p) =>
        p.id === editingPrompt.id ? { ...p, text: values.text } : p
      )
    )
    setEditingPrompt(null)
  }

  const handleToggle = (id: string) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    )
  }

  const handleDelete = (id: string) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id))
  }

  const activeCount = prompts.filter((p) => p.isActive).length
  const editDialogOpen = editingPrompt !== null
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
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      <PromptDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        title="Add prompt"
        submitLabel="Add prompt"
        onSubmit={handleAdd}
      />

      <PromptDialog
        open={editDialogOpen}
        onOpenChange={closeEditDialog}
        title="Edit prompt"
        defaultValues={editDefaultValues}
        submitLabel="Save"
        onSubmit={handleEdit}
      />
    </motion.section>
  )
}
