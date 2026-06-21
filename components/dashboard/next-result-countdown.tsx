"use client"

import { Clock, Info, Play } from "lucide-react"
import { useTranslations } from "next-intl"
import { useGetPromptListSuspenseQuery } from "@/hooks/queries/useGetPromptList"
import { useGetDailyRankingSuspenseQuery } from "@/hooks/queries/useGetDailyRanking"
import { useRunManualGeneration } from "@/hooks/mutation/useRunManualGeneration"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { isDemoMode } from "@/lib/demo"

export function NextResultCountdown() {
  const t = useTranslations("dashboard")
  const { data: prompts } = useGetPromptListSuspenseQuery()
  const { data: rankings } = useGetDailyRankingSuspenseQuery()
  const { mutate: runGeneration, isPending } = useRunManualGeneration()

  const hasActivePrompts = prompts.some((p) => p.isActive)

  if (!prompts.length)
    return (
      <Card className="mt-4 flex flex-row gap-2 p-4">
        <Info className="mt-0.5 size-4 shrink-0" />
        <p className="flex items-center font-bold">{t("addPrompt")}</p>
      </Card>
    )

  if (hasActivePrompts && rankings.length === 0 && !isDemoMode())
    return (
      <Card className="mt-4 flex flex-row items-center gap-3 p-4">
        <Info className="mt-0.5 size-4 shrink-0" />
        <p className="text-sm">{t("generateDescription")}</p>
        <Button
          size="sm"
          onClick={() => runGeneration()}
          disabled={isPending}
        >
          <Play className="size-3.5" />
          {isPending ? t("generating") : t("generateData")}
        </Button>
      </Card>
    )

  return (
    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Clock className="size-3.5" />
      {t("nextResult")}
    </p>
  )
}
