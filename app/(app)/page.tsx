import { Suspense } from "react"
import { DailyRankingList } from "@/components/dashboard/daily-ranking-list"
import { DailyRankingListSkeleton } from "@/components/dashboard/daily-ranking-list-skeleton"
import { HistoricRankingSection } from "@/components/dashboard/historic-ranking-section"
import { Badge } from "@/components/ui/badge"
import { mockPeriodRanking } from "@/mocks/ranking"

export default function Page() {
  const formattedDate = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <section className="mx-10 mb-10 flex flex-col items-start justify-between gap-5 md:flex-row">
        <div className="mb-5 flex flex-col gap-1">
          <h1 className="text-2xl">Rankings</h1>
          <p>Les résultats du jour</p>
        </div>
        <Badge variant="outline" className="p-3 capitalize">
          {formattedDate}
        </Badge>
      </section>
      <Suspense fallback={<DailyRankingListSkeleton />}>
        <DailyRankingList />
      </Suspense>
      <HistoricRankingSection data={mockPeriodRanking} />
    </>
  )
}
