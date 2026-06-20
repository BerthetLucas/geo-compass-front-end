"use client"

import { motion } from "motion/react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeUp } from "@/lib/motion"
import { useGetPromptListSuspenseQuery } from "@/hooks/queries/useGetPromptList"
import { useTranslations } from "next-intl"
import { MAX_PROMPTS } from "@/config/config"

interface PromptsHeaderProps {
  onAddPromptClick: () => void
  isDemo?: boolean
}

export function PromptsHeader({
  onAddPromptClick,
  isDemo,
}: PromptsHeaderProps) {
  const { data: prompts } = useGetPromptListSuspenseQuery()
  const t = useTranslations("prompts")
  const totalCount = prompts.length
  const activeCount = prompts.filter((p) => p.isActive).length
  const isLimitReachOrDemo = isDemo || activeCount >= MAX_PROMPTS

  return (
    <motion.div
      className="flex flex-col gap-4"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("stats", { activeCount, totalCount })}
          </p>
        </div>
        {!isLimitReachOrDemo && (
          <Button size="sm" onClick={onAddPromptClick}>
            <Plus className="size-4" />
            {t("addPrompt")}
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-1.5 rounded-lg border bg-muted/40 px-4 py-3">
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>
    </motion.div>
  )
}
