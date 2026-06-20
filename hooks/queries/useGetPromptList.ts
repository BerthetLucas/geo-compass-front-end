import { getAllPrompts } from "@/services/prompt"
import { useSuspenseQuery } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/query-keys"
import { isDemoMode } from "@/lib/demo"
import { DEMO_PROMPTS } from "@/lib/demo.data"

export const useGetPromptListSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.prompts.all,
    queryFn: () => isDemoMode() ? Promise.resolve(DEMO_PROMPTS) : getAllPrompts(),
  })
}
