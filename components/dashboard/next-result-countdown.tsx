"use client"

import { Clock, Info } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCountdownTo2AMParis } from "@/hooks/use-countdown-to-2am-paris"
import { useGetPromptListSuspenseQuery } from "@/hooks/queries/useGetPromptList"
import { Card } from "@/components/ui/card"

export function NextResultCountdown() {
  const t = useTranslations("dashboard")
  const countdown = useCountdownTo2AMParis()
  const { data: prompts } = useGetPromptListSuspenseQuery()

  if (!prompts.length)
    return (
      <Card className="mt-4 flex flex-row p-4">
        <Info className="mt-0.5 size-4" />
        <p className="flex items-center font-bold">{t("addPrompt")}</p>
      </Card>
    )

  if (!countdown) return null

  return (
    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Clock className="size-3.5" />
      {t("nextResult")}{" "}
      <span className="font-mono font-medium text-foreground">{countdown}</span>
    </p>
  )
}
