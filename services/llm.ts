import apiClient from "@/lib/api"

export async function triggerLlmRun(models: string[]): Promise<void> {
  await apiClient.post("/llm", { models })
}

export async function triggerRankingCompute(): Promise<void> {
  await apiClient.post("/ranking/compute")
}
