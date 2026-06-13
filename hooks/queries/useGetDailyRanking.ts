import { useSuspenseQuery } from "@tanstack/react-query"
import { getGeoDailyRanking } from "@/services/geo"

export const useGetDailyRankingSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: ["daily-ranking"],
    queryFn: getGeoDailyRanking,
  })
}
