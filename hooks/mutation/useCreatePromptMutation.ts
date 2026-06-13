import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPrompt } from "@/services/prompt"
import { queryKeys } from "@/hooks/query-keys"

export function useCreatePromptMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPrompt,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.prompts.all }),
  })
}
