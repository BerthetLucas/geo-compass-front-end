import { Suspense } from "react"
import { PromptsContent } from "@/components/prompts/prompts-content"

export default async function PromptsPage() {
  return (
    <Suspense>
      <PromptsContent />
    </Suspense>
  )
}
