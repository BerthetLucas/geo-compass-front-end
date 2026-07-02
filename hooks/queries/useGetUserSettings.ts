import { getUserSettings } from "@/services/user"
import { useSuspenseQuery } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/query-keys"
import { isDemoModeAsync } from "@/lib/demo"
import { DEMO_USER_SETTINGS } from "@/lib/demo.data"

export function useGetUserSettingsSuspenseQuery() {
  return useSuspenseQuery({
    queryKey: queryKeys.user.settings,
    queryFn: async () =>
      (await isDemoModeAsync()) ? DEMO_USER_SETTINGS : getUserSettings(),
  })
}
