import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const StatCardSkeleton = () => (
  <Card className="flex flex-col gap-3 p-5">
    <Skeleton className="h-4 w-28" />
    <Skeleton className="h-8 w-20" />
  </Card>
)

const RankCardSkeleton = () => (
  <Card className="flex w-full flex-row items-center gap-4 p-4">
    <Skeleton className="size-9 rounded-md" />
    <div className="flex flex-1 flex-col gap-1.5">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-1.5 w-full rounded-full" />
    </div>
    <Skeleton className="h-8 w-14" />
  </Card>
)

export const DailyRankingListSkeleton = () => (
  <div className="flex flex-col gap-8">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <RankCardSkeleton key={i} />
      ))}
    </div>
  </div>
)
