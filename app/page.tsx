import { DailyBrandRankCard } from "@/components/DailyBrandRankCard"
import { HistoricBrandCard } from "@/components/HistoricBrandCard"
import { Badge } from "@/components/ui/badge"
import { mockBrandRankings, mockPeriodRanking } from "@/mocks/ranking"

export default function Page() {
  const today = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  const formattedDate = today.toLocaleDateString("fr-FR", options)

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
      <section className="mx-10 flex flex-col gap-5">
        {mockBrandRankings.map((brand) => (
          <DailyBrandRankCard
            key={brand.rank}
            rank={brand.rank}
            brandName={brand.brand}
            mentionsNbr={brand.mentions}
          />
        ))}
      </section>
      <section className="mx-10 mt-10 flex flex-col gap-5">
        <div className="mb-5 flex flex-col gap-1">
          <h2 className="text-xl">Historic Rankings</h2>
          <p>Les résultats des jours précédents</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {mockPeriodRanking.map((dailyRanking) => (
            <HistoricBrandCard
              key={dailyRanking.date}
              date={dailyRanking.date}
              brands={dailyRanking.rankings.map((ranking) => ranking.brand)}
            />
          ))}
        </div>
      </section>
    </>
  )
}
