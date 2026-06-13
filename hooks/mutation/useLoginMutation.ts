import { useMutation } from "@tanstack/react-query"
import { login } from "@/services/auth"

export function useLoginMutation() {
  return useMutation({
    mutationFn: login,
  })
}
