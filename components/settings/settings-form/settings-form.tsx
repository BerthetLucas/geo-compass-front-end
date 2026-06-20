"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Field } from "@/components/ui/field"
import { useTranslations } from "next-intl"
import { useSettingsForm } from "./use-settings-form"
import type { SettingsFormValues } from "./settings-schema"
import type { UserSettings } from "@/types/user"
import { FormProvider } from "react-hook-form"
import { SettingsApiKeyLabel } from "./settings-api-key-field"

interface SettingsFormProps {
  settings: UserSettings
  onSubmit: (values: SettingsFormValues) => void
  onDeleteApiKey: () => void
  isSubmitting?: boolean
  isDemo?: boolean
}

export function SettingsForm({
  settings,
  onSubmit,
  onDeleteApiKey,
  isSubmitting = false,
  isDemo = false,
}: SettingsFormProps) {
  const t = useTranslations("settings")

  const methods = useSettingsForm({
    emailNotifications: settings.emailNotifications,
  })

  const { handleSubmit, register } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Field>
          <div className="flex items-center gap-3">
            <input
              id="email-notifications"
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded border-border accent-primary"
              {...register("emailNotifications")}
              disabled={isDemo}
            />
            <Label htmlFor="email-notifications">
              {t("emailNotifications.label")}
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("emailNotifications.description")}
          </p>
        </Field>
        <Field>
          <Label>{t("openRouterApiKey.label")}</Label>
          <SettingsApiKeyLabel
            hasOpenRouterApiKey={settings.hasOpenRouterApiKey}
            onDeleteApiKey={onDeleteApiKey}
            isSubmitting={isSubmitting}
            isDemo={isDemo}
          />
        </Field>

        {!isDemo && (
          <div className="flex justify-end">
            <Button type="submit" size="sm" disabled={isSubmitting}>
              {t("save")}
            </Button>
          </div>
        )}
      </form>
    </FormProvider>
  )
}
