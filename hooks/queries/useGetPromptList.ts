import { getAllPrompts } from "@/services/prompt"
import { useSuspenseQuery } from "@tanstack/react-query"
import { queryKeys } from "@/hooks/query-keys"

export const useGetPromptListSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: queryKeys.prompts.all,
    queryFn: getAllPrompts,
  })
}
