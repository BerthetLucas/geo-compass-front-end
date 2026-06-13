import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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

export const DailyBrandRankCard = ({
  rank,
  brandName,
  mentionsNbr,
  maxMentions,
}: DailyBrandRankCardProps) => {
  const share = maxMentions > 0 ? (mentionsNbr / maxMentions) * 100 : 0
  const accent =
    RANK_ACCENT[rank] ?? "bg-muted text-muted-foreground ring-border"

  return (
    <Card className="group relative flex w-full flex-row items-center gap-4 overflow-hidden p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-md font-heading text-sm font-semibold tabular-nums ring-1",
          accent
        )}
      >
        {rank}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="truncate font-heading text-sm font-medium">
          {brandName}
        </span>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-linear-to-r from-primary/60 to-primary transition-[width] duration-500 ease-out"
            style={{ width: `${share}%` }}
          />
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end">
        <span className="font-mono text-base font-semibold tabular-nums">
          {mentionsNbr}
        </span>
        <span className="text-xs text-muted-foreground">mentions</span>
      </div>
    </Card>
  )
}
