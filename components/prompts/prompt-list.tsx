"use client"

import { AnimatePresence, motion } from "motion/react"
import { PromptCard } from "./prompt-card"
import type { Prompt } from "@/types/prompt"

interface PromptListProps {
  prompts: Prompt[]
}

export function PromptList({ prompts }: PromptListProps) {
  if (prompts.length === 0) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-muted-foreground"
      >
        No prompts yet. Add one above.
      </motion.p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence initial={true} mode="popLayout">
        {prompts.map((prompt, i) => (
          <motion.div
            key={prompt.id}
            custom={i}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <PromptCard prompt={prompt} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
