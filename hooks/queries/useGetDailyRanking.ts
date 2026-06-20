import { useSuspenseQuery } from "@tanstack/react-query"
import { getGeoDailyRanking } from "@/services/geo"
import { queryKeys } from "@/hooks/query-keys"
import { isDemoMode } from "@/lib/demo"
import { DEMO_DAILY_RANKING } from "@/lib/demo.data"

export const useGetDailyRankingSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.ranking.daily,
    queryFn: () => isDemoMode() ? Promise.resolve(DEMO_DAILY_RANKING) : getGeoDailyRanking(),
  })
}
