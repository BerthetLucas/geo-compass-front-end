import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "@/services/user"
import { useRouter } from "next/navigation"

export function useDeleteUserMutation() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.clear()
      router.push("/login")
    },
  })
}
