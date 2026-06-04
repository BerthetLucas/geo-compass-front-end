"use client"

import { AnimatePresence, motion } from "motion/react"
import { PromptCard } from "./prompt-card"
import type { Prompt } from "./types"

interface PromptListProps {
  prompts: Prompt[]
  onEdit: (prompt: Prompt) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      delay: i * 0.06,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const },
  },
}

export function PromptList({
  prompts,
  onEdit,
  onToggle,
  onDelete,
}: PromptListProps) {
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
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <PromptCard
              prompt={prompt}
              onEdit={onEdit}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
