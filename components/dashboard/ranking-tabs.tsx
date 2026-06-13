"use client"

import { Suspense } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DailyRankingList } from "./daily-ranking-list"
import { ModelRankingList } from "./model-ranking-list"
import { DailyRankingListSkeleton } from "./daily-ranking-list-skeleton"
import { useGetAvailableModelsSuspenseQuery } from "@/hooks/queries/useGetAvailableModels"

export const RankingTabs = () => {
  const { data: models } = useGetAvailableModelsSuspenseQuery()

  return (
    <Tabs defaultValue="global" className="mx-10">
      <TabsList className="mb-6">
        <TabsTrigger value="global">Global</TabsTrigger>
        {models.map((model) => (
          <TabsTrigger key={model} value={model}>
            {model}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="global">
        <Suspense fallback={<DailyRankingListSkeleton />}>
          <DailyRankingList />
        </Suspense>
      </TabsContent>

      {models.map((model) => (
        <TabsContent key={model} value={model}>
          <Suspense fallback={<DailyRankingListSkeleton />}>
            <ModelRankingList model={model} />
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  )
}
