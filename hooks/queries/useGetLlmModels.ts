import { useSuspenseQuery } from "@tanstack/react-query"
import { getLlmModels } from "@/services/llm"
import { queryKeys } from "@/hooks/query-keys"
import { isDemoModeAsync } from "@/lib/demo"
import { DEMO_MODELS } from "@/lib/demo.data"

// Full pickable model catalog for the settings page's model-selection
// checkboxes. NOT the same as useGetAvailableModelsSuspenseQuery, which
// returns only models with existing ranking data for a given date.
export const useGetLlmModelsQuery = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.llm.models,
    queryFn: async () =>
      (await isDemoModeAsync()) ? DEMO_MODELS : getLlmModels(),
  })
}
