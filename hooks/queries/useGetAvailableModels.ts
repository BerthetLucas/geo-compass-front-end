import { useSuspenseQuery } from "@tanstack/react-query"
import { getGeoAvailableModels } from "@/services/geo"
import { queryKeys } from "@/hooks/query-keys"

export const useGetAvailableModelsSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.ranking.models,
    queryFn: () => getGeoAvailableModels(),
  })
}
