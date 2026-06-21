import { useMutation, useQueryClient } from "@tanstack/react-query"
import { triggerLlmRun, triggerRankingCompute } from "@/services/llm"
import { queryKeys } from "@/hooks/query-keys"
import { AVAILABLE_MODELS } from "@/config/config"

export function useRunManualGeneration() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await triggerLlmRun(AVAILABLE_MODELS)
      await triggerRankingCompute()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ranking.daily })
      queryClient.invalidateQueries({ queryKey: queryKeys.ranking.models })
    },
  })
}
