import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePrompt } from "@/services/prompt"
import { queryKeys } from "@/hooks/query-keys"

export function useDeletePromptMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePrompt,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.prompts.all }),
  })
}
