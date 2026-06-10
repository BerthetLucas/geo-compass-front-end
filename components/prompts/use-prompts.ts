"use client"

import { useState } from "react"

import { mockPrompts } from "@/mocks/prompts"
import type { Prompt } from "@/types/prompt"
import type { PromptFormValues } from "./prompt-form/prompt-schema"

function seedPrompts(): Prompt[] {
  return mockPrompts.map((p, i) => ({ id: String(i + 1), ...p }))
}

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>(seedPrompts)

  const addPrompt = (values: PromptFormValues) => {
    setPrompts((prev) => [
      ...prev,
      { id: String(Date.now()), text: values.text, isActive: true },
    ])
  }

  const editPrompt = (id: string, values: PromptFormValues) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, text: values.text } : p))
    )
  }

  const togglePrompt = (id: string) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    )
  }

  const deletePrompt = (id: string) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id))
  }

  const activeCount = prompts.filter((p) => p.isActive).length

  return {
    prompts,
    activeCount,
    addPrompt,
    editPrompt,
    togglePrompt,
    deletePrompt,
  }
}
