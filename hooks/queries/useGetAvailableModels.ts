import { useSuspenseQuery } from "@tanstack/react-query"
import { getGeoAvailableModels } from "@/services/geo"
import { queryKeys } from "@/hooks/query-keys"
import { isDemoModeAsync } from "@/lib/demo"
import { DEMO_MODELS } from "@/lib/demo.data"

export const useGetAvailableModelsSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.ranking.models,
    queryFn: async () =>
      (await isDemoModeAsync()) ? DEMO_MODELS : getGeoAvailableModels(),
  })
}
