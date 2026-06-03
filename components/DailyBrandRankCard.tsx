import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card } from "./ui/card"

interface DailyBrandRankCardProps {
  rank: number
  brandName: string
  up?: boolean
  down?: boolean
  mentionsNbr: number
}

export const DailyBrandRankCard = ({
  rank,
  brandName,
  up,
  down,
  mentionsNbr,
}: DailyBrandRankCardProps) => {
  return (
    <Card className="flex w-full flex-row items-center justify-between p-5">
      <div className="flex gap-3">
        <Badge variant="outline">{rank}</Badge>
        <p>{brandName}</p>
      </div>
      <div className="flex gap-2">
        {down && (
          <Badge variant="destructive">
            <ArrowBigDown />
          </Badge>
        )}
        {up && (
          <Badge variant="default">
            <ArrowBigUp />
          </Badge>
        )}
        <p>{mentionsNbr} mentions</p>
      </div>
    </Card>
  )
}
