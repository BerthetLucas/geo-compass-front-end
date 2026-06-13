"use client"

import { motion } from "motion/react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeUp } from "@/lib/motion"
import { useGetPromptListSuspenseQuery } from "@/hooks/queries/useGetPromptList"

interface PromptsHeaderProps {
  activeCount: number
  totalCount: number
  onAddPromptClick: () => void
}

export function PromptsHeader({
  activeCount,
  totalCount,
  onAddPromptClick,
}: PromptsHeaderProps) {
  const { data: prompts } = useGetPromptListSuspenseQuery()
  const MAX_PROMPTS = 5

  const isLimitReach = prompts.length >= MAX_PROMPTS

  return (
    <motion.div
      className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Prompts</h1>
        <p className="text-sm text-muted-foreground">
          {activeCount} active · {totalCount} total — queried against every
          selected model
        </p>
      </div>
      {!isLimitReach && (
        <Button size="sm" onClick={onAddPromptClick}>
          <Plus className="size-4" />
          Add prompt
        </Button>
      )}
    </motion.div>
  )
}
