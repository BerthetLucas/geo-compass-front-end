import { useSuspenseQuery } from "@tanstack/react-query"
import { getGeoDailyRanking } from "@/services/geo"
import { queryKeys } from "@/hooks/query-keys"

export const useGetDailyRankingSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.ranking.daily,
    queryFn: getGeoDailyRanking,
  })
}
