import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePrompt } from "@/services/prompt"
import type { UpdatePromptRequest } from "@/types/prompt"
import { queryKeys } from "@/hooks/query-keys"

export function useUpdatePromptMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePromptRequest }) =>
      updatePrompt(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.prompts.all }),
  })
}
