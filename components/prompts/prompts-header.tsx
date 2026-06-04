"use client"

import { motion } from "motion/react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeUp } from "@/lib/motion"

interface PromptsHeaderProps {
  activeCount: number
  totalCount: number
  onAdd: () => void
}

export function PromptsHeader({
  activeCount,
  totalCount,
  onAdd,
}: PromptsHeaderProps) {
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
      <Button size="sm" onClick={onAdd}>
        <Plus className="size-4" />
        Add prompt
      </Button>
    </motion.div>
  )
}
