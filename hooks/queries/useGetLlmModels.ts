import { useSuspenseQuery } from "@tanstack/react-query"
import { getLlmModels } from "@/services/llm"
import { queryKeys } from "@/hooks/query-keys"
import { isDemoModeAsync } from "@/lib/demo"
import { DEMO_MODELS } from "@/lib/demo.data"

export const useGetLlmModelsQuery = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.llm.models,
    queryFn: async () =>
      (await isDemoModeAsync()) ? DEMO_MODELS : getLlmModels(),
  })
}
