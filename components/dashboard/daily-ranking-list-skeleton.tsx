import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const DailyBrandRankCardSkeleton = () => (
  <Card className="flex w-full flex-row items-center justify-between p-5">
    <div className="flex gap-3">
      <Skeleton className="h-6 w-8 rounded-full" />
      <Skeleton className="h-6 w-32" />
    </div>
    <Skeleton className="h-6 w-24" />
  </Card>
)

export const DailyRankingListSkeleton = () => (
  <section className="mx-10 flex flex-col gap-5">
    {Array.from({ length: 5 }).map((_, i) => (
      <DailyBrandRankCardSkeleton key={i} />
    ))}
  </section>
)
