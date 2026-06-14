"use client"

import { AnimatePresence, motion } from "motion/react"
import { useTranslations } from "next-intl"
import { PromptCard } from "./prompt-card"
import { useGetPromptListSuspenseQuery } from "@/hooks/queries/useGetPromptList"

export function PromptList() {
  const { data: prompts } = useGetPromptListSuspenseQuery()
  const t = useTranslations("prompts")

  if (prompts.length === 0) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-muted-foreground"
      >
        {t("empty")}
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
