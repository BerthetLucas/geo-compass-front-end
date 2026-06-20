import apiClient from "@/lib/api"
import { AddPromptRequest, Prompt, UpdatePromptRequest } from "@/types/prompt"

export async function getAllPrompts(): Promise<Prompt[]> {
  const response = await apiClient.get("/prompt")
  return response.data
}

export async function createPrompt(data: AddPromptRequest): Promise<void> {
  await apiClient.post("/prompt", data)
}

export async function updatePrompt(
  id: number,
  data: UpdatePromptRequest,
): Promise<void> {
  await apiClient.put(`/prompt/${id}`, data)
}

export async function deletePrompt(id: number): Promise<void> {
  await apiClient.post("/prompt/delete", { id })
}
