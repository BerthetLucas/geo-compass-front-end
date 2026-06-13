import { getGeoRankingByPeriod } from "@/services/geo"
import { useSuspenseQuery } from "@tanstack/react-query"
import type { DailyRanking } from "@/types/ranking"
import { queryKeys } from "@/hooks/query-keys"

export const useGetRankingHistoricSuspenseQuery = (
  startDate?: string,
  endDate?: string,
) => {
  return useSuspenseQuery<DailyRanking[]>({
    queryKey: queryKeys.ranking.historic(startDate ?? "", endDate ?? ""),
    queryFn: () => getGeoRankingByPeriod({ startDate, endDate }),
  })
}
