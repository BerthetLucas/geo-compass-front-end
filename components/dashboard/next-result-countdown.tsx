"use client"

import { Clock } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCountdownTo2AMParis } from "@/hooks/use-countdown-to-2am-paris"

export function NextResultCountdown() {
  const t = useTranslations("dashboard")
  const countdown = useCountdownTo2AMParis()

  if (!countdown) return null

  return (
    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <Clock className="size-3.5" />
      {t("nextResult")}{" "}
      <span className="font-mono font-medium text-foreground">{countdown}</span>
    </p>
  )
}
