"use client"

import { useState, Suspense } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DailyRankingList } from "./daily-ranking-list"
import { ModelRankingList } from "./model-ranking-list"
import { DailyRankingListSkeleton } from "./daily-ranking-list-skeleton"
import { useGetAvailableModelsSuspenseQuery } from "@/hooks/queries/useGetAvailableModels"
import { useTranslations } from "next-intl"
import { tabFade } from "@/lib/motion"

export const RankingTabs = () => {
  const { data: models } = useGetAvailableModelsSuspenseQuery()
  const t = useTranslations("dashboard")
  const [tab, setTab] = useState("global")

  return (
    <Tabs value={tab} onValueChange={setTab} className="mx-10">
      <TabsList className="mb-6 h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="global"
          className="rounded-none border-b-2 border-transparent pb-3 font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
        >
          {t("global")}
        </TabsTrigger>
        {models.map((model) => (
          <TabsTrigger
            key={model}
            value={model}
            className="rounded-none border-b-2 border-transparent pb-3 font-medium data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            {model}
          </TabsTrigger>
        ))}
      </TabsList>

      <AnimatePresence mode="wait">
        <motion.div key={tab} {...tabFade}>
          {tab === "global" ? (
            <Suspense fallback={<DailyRankingListSkeleton />}>
              <DailyRankingList />
            </Suspense>
          ) : (
            <Suspense fallback={<DailyRankingListSkeleton />}>
              <ModelRankingList model={tab} />
            </Suspense>
          )}
        </motion.div>
      </AnimatePresence>
    </Tabs>
  )
}
