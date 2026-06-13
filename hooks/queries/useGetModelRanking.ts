import { useSuspenseQuery } from "@tanstack/react-query"
import { getGeoModelRanking } from "@/services/geo"
import { queryKeys } from "@/hooks/query-keys"

export const useGetModelRankingSuspenseQuery = (model: string) => {
  return useSuspenseQuery({
    queryKey: queryKeys.ranking.model(model),
    queryFn: () => getGeoModelRanking(model),
  })
}
