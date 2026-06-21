import { Suspense } from "react"
import { RankingTabs } from "@/components/dashboard/ranking-tabs"
import { DailyRankingListSkeleton } from "@/components/dashboard/daily-ranking-list-skeleton"
import { NextResultCountdown } from "@/components/dashboard/next-result-countdown"
import { Badge } from "@/components/ui/badge"
import { getTranslations, getLocale } from "next-intl/server"

export default async function Page() {
  const t = await getTranslations("dashboard")
  const locale = await getLocale()

  const formattedDate = new Date().toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <section className="mx-10 mb-10 flex flex-col items-start justify-between gap-5 md:flex-row">
        <div className="mb-5 flex flex-col gap-1">
          <h1 className="text-2xl">{t("title")}</h1>
          <p>{t("subtitle")}</p>
          <Suspense>
            <NextResultCountdown />
          </Suspense>
        </div>
        <Badge variant="outline" className="p-3 capitalize">
          {formattedDate}
        </Badge>
      </section>
      <Suspense
        fallback={
          <div className="mx-10">
            <DailyRankingListSkeleton />
          </div>
        }
      >
        <RankingTabs />
      </Suspense>
    </>
  )
}
