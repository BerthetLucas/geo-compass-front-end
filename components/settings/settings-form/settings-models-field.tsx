import { useFormContext } from "react-hook-form"
import { useTranslations } from "next-intl"
import { SettingsFormValues } from "./settings-schema"
import { Label } from "@/components/ui/label"
import { FieldError } from "@/components/ui/field"
import { useGetLlmModelsQuery } from "@/hooks/queries/useGetLlmModels"

export function SettingsModelsField() {
  const { register, formState } = useFormContext<SettingsFormValues>()
  const t = useTranslations("settings")
  const { data: availableModels } = useGetLlmModelsQuery()

  return (
    <div className="flex flex-col gap-2">
      {availableModels.map((model) => (
        <div key={model} className="flex items-center gap-3">
          <input
            id={`model-${model}`}
            type="checkbox"
            value={model}
            className="h-4 w-4 rounded border-border accent-primary"
            {...register("selectedModels")}
          />
          <Label htmlFor={`model-${model}`}>{model}</Label>
        </div>
      ))}
      <FieldError errors={[formState.errors.selectedModels]}>
        {formState.errors.selectedModels && t("models.minError")}
      </FieldError>
    </div>
  )
}
