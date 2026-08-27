export interface UserSettings {
  emailNotifications: boolean
  hasOpenRouterApiKey: boolean
  email: string
  selectedModels: string[]
}

export interface UpdateUserSettingsRequest {
  emailNotifications?: boolean
  openRouterApiKey?: string | null
  selectedModels?: string[]
}
