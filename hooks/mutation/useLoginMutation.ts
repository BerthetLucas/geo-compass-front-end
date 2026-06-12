import { useMutation } from "@tanstack/react-query"
import { login } from "@/services/auth/auth"

export function useLoginMutation() {
  return useMutation({
    mutationFn: login,
  })
}
