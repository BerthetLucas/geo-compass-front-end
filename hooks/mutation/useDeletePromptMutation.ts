import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePrompt } from "@/services/prompt"
import { queryKeys } from "@/hooks/query-keys"

export function useDeletePromptMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deletePrompt({ id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.prompts.all }),
  })
}
