import { useMutation } from "@tanstack/react-query"
import { register } from "@/services/auth"

export function useRegisterMutation() {
  return useMutation({
    mutationFn: register,
  })
}
