import { getGeoRankingByPeriod } from "@/services/geo"
import { useSuspenseQuery } from "@tanstack/react-query"
import type { DailyRanking } from "@/types/ranking"
import { queryKeys } from "@/hooks/query-keys"
import { isDemoMode } from "@/lib/demo"
import { DEMO_HISTORIC } from "@/lib/demo.data"

export const useGetRankingHistoricSuspenseQuery = (
  startDate?: string,
  endDate?: string,
) => {
  return useSuspenseQuery<DailyRanking[]>({
    queryKey: queryKeys.ranking.historic(startDate ?? "", endDate ?? ""),
    queryFn: () =>
      isDemoMode()
        ? Promise.resolve(DEMO_HISTORIC)
        : getGeoRankingByPeriod({ startDate, endDate }),
  })
}
