"use client"

import { useGetUserSettingsSuspenseQuery } from "@/hooks/queries/useGetUserSettings"
import { useUpdateUserSettingsMutation } from "@/hooks/mutation/useUpdateUserSettingsMutation"
import { SettingsForm } from "./settings-form/settings-form"
import type { SettingsFormValues } from "./settings-form/settings-schema"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export function SettingsContent() {
  const t = useTranslations("settings")
  const { data: settings } = useGetUserSettingsSuspenseQuery()
  const { mutate, isPending } = useUpdateUserSettingsMutation()

  function handleSubmit(values: SettingsFormValues) {
    mutate(
      {
        emailNotifications: values.emailNotifications,
        ...(values.openRouterApiKey
          ? { openRouterApiKey: values.openRouterApiKey }
          : {}),
      },
      { onSuccess: () => toast.success(t("saveSuccess")) }
    )
  }

  function handleDeleteApiKey() {
    mutate(
      { openRouterApiKey: null },
      { onSuccess: () => toast.success(t("saveSuccess")) }
    )
  }

  return (
    <section className="mx-10 flex flex-col gap-6 pb-16">
      <div>
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{settings.email}</p>
      </div>
      <SettingsForm
        settings={settings}
        onSubmit={handleSubmit}
        onDeleteApiKey={handleDeleteApiKey}
        isSubmitting={isPending}
      />
    </section>
  )
}
