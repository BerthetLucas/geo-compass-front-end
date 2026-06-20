import { useFormContext } from "react-hook-form"
import { SettingsFormValues } from "./settings-schema"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FieldError } from "@/components/ui/field"
import { useTranslations } from "next-intl"

interface SettingsApiKeyLabelProps {
  hasOpenRouterApiKey: boolean
  onDeleteApiKey: () => void
  isSubmitting?: boolean
  isDemo?: boolean
}

export const SettingsApiKeyLabel = ({
  hasOpenRouterApiKey,
  onDeleteApiKey,
  isSubmitting = false,
  isDemo = false,
}: SettingsApiKeyLabelProps) => {
  const { register, formState } = useFormContext<SettingsFormValues>()
  const t = useTranslations("settings")

  if (hasOpenRouterApiKey) {
    return (
      <div className="flex items-center gap-3">
        <Badge variant="secondary">{t("openRouterApiKey.active")}</Badge>
        {!isDemo && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onDeleteApiKey}
            disabled={isSubmitting}
          >
            {t("openRouterApiKey.delete")}
          </Button>
        )}
      </div>
    )
  }

  return (
    <>
      <Input
        id="open-router-api-key"
        type="password"
        placeholder={t("openRouterApiKey.placeholder")}
        {...register("openRouterApiKey")}
        disabled={isDemo}
      />
      <FieldError errors={[formState.errors.openRouterApiKey]} />
    </>
  )
}
