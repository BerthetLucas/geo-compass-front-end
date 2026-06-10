import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface DailyBrandRankCardProps {
  rank: number
  brandName: string
  trend?: "up" | "down"
  mentionsNbr: number
}

export const DailyBrandRankCard = ({
  rank,
  brandName,
  trend,
  mentionsNbr,
}: DailyBrandRankCardProps) => {
  return (
    <Card className="flex w-full flex-row items-center justify-between p-5">
      <div className="flex gap-3">
        <Badge variant="outline">{rank}</Badge>
        <p>{brandName}</p>
      </div>
      <div className="flex gap-2">
        {trend === "down" && (
          <Badge variant="destructive">
            <ArrowBigDown />
          </Badge>
        )}
        {trend === "up" && (
          <Badge variant="default">
            <ArrowBigUp />
          </Badge>
        )}
        <p>{mentionsNbr} mentions</p>
      </div>
    </Card>
  )
}
