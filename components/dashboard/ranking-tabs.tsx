"use client"

import { useState, Suspense } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DailyRankingList } from "./daily-ranking-list"
import { ModelRankingList } from "./model-ranking-list"
import { DailyRankingListSkeleton } from "./daily-ranking-list-skeleton"
import { useGetAvailableModelsSuspenseQuery } from "@/hooks/queries/useGetAvailableModels"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

export const RankingTabs = () => {
  const { data: models } = useGetAvailableModelsSuspenseQuery()
  const t = useTranslations("dashboard")
  const [tab, setTab] = useState("global")
  const [visited, setVisited] = useState<Set<string>>(new Set(["global"]))

  const handleTabChange = (value: string) => {
    setTab(value)
    setVisited((prev) => new Set([...prev, value]))
  }

  const tabClass = (value: string) =>
    cn("animate-in duration-150 fade-in", tab !== value && "hidden")

  const triggerClass =
    "rounded-none border-b-2 border-transparent pb-3 font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"

  return (
    <Tabs value={tab} onValueChange={handleTabChange} className="mx-10">
      <TabsList className="mb-6 h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger value="global" className={triggerClass}>
          {t("global")}
        </TabsTrigger>
        {models.map((model) => (
          <TabsTrigger key={model} value={model} className={triggerClass}>
            {model}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className={tabClass("global")}>
        <Suspense fallback={<DailyRankingListSkeleton />}>
          <DailyRankingList />
        </Suspense>
      </div>
      {models.map(
        (model) =>
          visited.has(model) && (
            <div key={model} className={tabClass(model)}>
              <Suspense fallback={<DailyRankingListSkeleton />}>
                <ModelRankingList model={model} />
              </Suspense>
            </div>
          )
      )}
    </Tabs>
  )
}
