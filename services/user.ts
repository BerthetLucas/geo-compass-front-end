import apiClient from "@/lib/api"
import { UserSettings, UpdateUserSettingsRequest } from "@/types/user"

export async function getUserSettings(): Promise<UserSettings> {
  const response = await apiClient.get<UserSettings>("/users/me")
  return response.data
}

export async function updateUserSettings(
  data: UpdateUserSettingsRequest
): Promise<UserSettings> {
  const response = await apiClient.put<UserSettings>("/users/me", data)
  return response.data
}
