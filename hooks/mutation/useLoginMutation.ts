import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login } from "@/services/auth"

export function useLoginMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.clear(),
  })
}
