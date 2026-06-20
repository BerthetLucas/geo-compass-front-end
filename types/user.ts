export interface UserSettings {
  emailNotifications: boolean
  hasOpenRouterApiKey: boolean
  email: string
}

export interface UpdateUserSettingsRequest {
  emailNotifications?: boolean
  openRouterApiKey?: string | null
}
