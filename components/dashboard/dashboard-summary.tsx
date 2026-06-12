import { Crown, Boxes } from "lucide-react"
import { motion } from "motion/react"
import { Card } from "@/components/ui/card"
import { fadeUp } from "@/lib/motion"
import type { BrandRanking } from "@/types/ranking"

interface DashboardSummaryProps {
  rankings: BrandRanking[]
}

const STAT_ICON = "size-4 text-primary"

export const DashboardSummary = ({ rankings }: DashboardSummaryProps) => {
  const leader = rankings.find((r) => r.rank === 1) ?? rankings[0]

  const stats = [
    {
      label: "Today's leader",
      value: leader?.brand ?? "—",
      hint: leader ? `${leader.mentions} mentions` : undefined,
      icon: Crown,
    },
    {
      label: "Brands cited",
      value: rankings.length.toString(),
      hint: "across your prompts",
      icon: Boxes,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {stats.map(({ label, value, hint, icon: Icon }) => (
        <motion.div key={label} variants={fadeUp}>
          <Card className="flex flex-col gap-3 p-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon className={STAT_ICON} />
              <span>{label}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="truncate font-heading text-2xl font-semibold tracking-tight">
                {value}
              </span>
              {hint && (
                <span className="text-xs text-muted-foreground">{hint}</span>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
