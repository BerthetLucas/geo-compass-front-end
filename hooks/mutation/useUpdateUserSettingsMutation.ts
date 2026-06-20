import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUserSettings } from "@/services/user"
import { queryKeys } from "@/hooks/query-keys"

export function useUpdateUserSettingsMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateUserSettings,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.user.settings }),
  })
}
