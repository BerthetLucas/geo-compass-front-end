"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { cardHoverSpring } from "@/lib/motion"

interface DailyBrandRankCardProps {
  rank: number
  brandName: string
  mentionsNbr: number
  maxMentions: number
}

const RANK_ACCENT: Record<number, string> = {
  1: "bg-primary text-primary-foreground ring-primary/30",
  2: "bg-primary/70 text-primary-foreground ring-primary/20",
  3: "bg-primary/45 text-primary-foreground ring-primary/15",
}

const RANK_GLOW: Record<number, string> = {
  1: "dark:shadow-[0_0_12px_oklch(0.68_0.19_162_/_0.35)]",
}

export const DailyBrandRankCard = ({
  rank,
  brandName,
  mentionsNbr,
  maxMentions,
}: DailyBrandRankCardProps) => {
  const t = useTranslations("dashboard")
  const share = maxMentions > 0 ? (mentionsNbr / maxMentions) * 100 : 0
  const accent =
    RANK_ACCENT[rank] ?? "bg-muted text-muted-foreground ring-border"
  const glow = RANK_GLOW[rank] ?? ""

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={cardHoverSpring}
    >
      <Card
        className="group relative flex w-full flex-row items-center gap-4 overflow-hidden p-4 transition-shadow duration-300"
        style={{
          boxShadow: "var(--shadow-card)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "var(--shadow-card-hover)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "var(--shadow-card)"
        }}
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-md font-heading text-sm font-semibold tabular-nums ring-1",
            accent,
            glow
          )}
        >
          {rank}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="truncate font-heading text-sm font-medium">
            {brandName}
          </span>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-primary/60 to-primary"
              initial={{ width: 0 }}
              animate={{ width: `${share}%` }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: rank * 0.05 }}
            />
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <span className="font-mono text-xl font-semibold tabular-nums">
            {mentionsNbr}
          </span>
          <span className="text-xs text-muted-foreground">{t("mentionsLabel")}</span>
        </div>
      </Card>
    </motion.div>
  )
}
