import { getUserSettings } from "@/services/user"
import { useSuspenseQuery } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/query-keys"

export function useGetUserSettingsSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: queryKeys.user.settings,
    queryFn: getUserSettings,
  })
}
