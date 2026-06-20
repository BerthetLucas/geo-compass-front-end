import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { settingsSchema, type SettingsFormValues } from "./settings-schema"

export function useSettingsForm(defaultValues: Partial<SettingsFormValues>) {
  return useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      emailNotifications: false,
      openRouterApiKey: "",
      ...defaultValues,
    },
  })
}
