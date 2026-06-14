import { Suspense } from "react"
import { HistoricRankingSection } from "@/components/dashboard/historic-ranking-section"
import { getTranslations } from "next-intl/server"

export default async function HistoricPage() {
  const t = await getTranslations("historic")

  return (
    <>
      <section className="mx-10 mb-10 flex flex-col gap-1">
        <h1 className="text-2xl">{t("title")}</h1>
        <p>{t("subtitle")}</p>
      </section>
      <Suspense>
        <HistoricRankingSection />
      </Suspense>
    </>
  )
}
