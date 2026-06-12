import { Suspense } from "react"
import { HistoricRankingSection } from "@/components/dashboard/historic-ranking-section"

export default function HistoricPage() {
  return (
    <>
      <section className="mx-10 mb-10 flex flex-col gap-1">
        <h1 className="text-2xl">History</h1>
        <p>Ranking evolution over the period</p>
      </section>
      <Suspense>
        <HistoricRankingSection />
      </Suspense>
    </>
  )
}
