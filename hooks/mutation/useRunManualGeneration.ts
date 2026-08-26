import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { triggerLlmRun, triggerRankingCompute } from "@/services/llm"
import { queryKeys } from "@/hooks/query-keys"

export function useRunManualGeneration() {
  const t = useTranslations("dashboard")
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      await triggerLlmRun()
      await triggerRankingCompute()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ranking.daily })
      queryClient.invalidateQueries({ queryKey: queryKeys.ranking.models })
      queryClient.invalidateQueries({ queryKey: ["model-ranking"] })
    },
    onError: () => {
      toast.error(t("generateError"))
    },
  })
}
