import { z } from "zod"

export const settingsSchema = z.object({
  emailNotifications: z.boolean(),
  openRouterApiKey: z.string().optional(),
})

export type SettingsFormValues = z.infer<typeof settingsSchema>
