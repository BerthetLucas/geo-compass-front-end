import { useSuspenseQuery } from "@tanstack/react-query"
import { getGeoModelRanking } from "@/services/geo"
import { queryKeys } from "@/hooks/query-keys"
import { isDemoMode } from "@/lib/demo"
import { DEMO_MODEL_RANKING } from "@/lib/demo.data"

export const useGetModelRankingSuspenseQuery = (model: string) => {
  return useSuspenseQuery({
    queryKey: queryKeys.ranking.model(model),
    queryFn: () => isDemoMode() ? Promise.resolve(DEMO_MODEL_RANKING) : getGeoModelRanking(model),
  })
}
