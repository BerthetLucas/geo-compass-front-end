import apiClient from "@/lib/api"

export async function getLlmModels(): Promise<string[]> {
  const response = await apiClient.get<string[]>("/llm/models")
  return response.data
}

export async function triggerLlmRun(): Promise<void> {
  await apiClient.post("/llm")
}

export async function triggerRankingCompute(): Promise<void> {
  await apiClient.post("/ranking/compute")
}
