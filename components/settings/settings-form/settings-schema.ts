import { z } from "zod"

export const settingsSchema = z.object({
  emailNotifications: z.boolean(),
  openRouterApiKey: z.string().optional(),
  selectedModels: z.array(z.string()).min(1),
})

export type SettingsFormValues = z.infer<typeof settingsSchema>
