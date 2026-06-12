import { getGeoRankingByPeriod } from "@/services/geo"
import { useSuspenseQuery } from "@tanstack/react-query"
import type { DailyRanking } from "@/types/ranking"

export const useGetRankingHistoricSuspenseQuery = (
  startDate?: string,
  endDate?: string
) => {
  return useSuspenseQuery<DailyRanking[]>({
    queryKey: ["historic-ranking", startDate, endDate],
    queryFn: () => getGeoRankingByPeriod({ startDate, endDate }),
  })
}
