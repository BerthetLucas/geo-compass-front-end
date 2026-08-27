import { useFormContext, useWatch } from "react-hook-form"
import { useTranslations } from "next-intl"
import { motion } from "motion/react"
import { Bot, Check } from "lucide-react"
import { SettingsFormValues } from "./settings-schema"
import { FieldError } from "@/components/ui/field"
import { fadeUp, stagger } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { useGetLlmModelsQuery } from "@/hooks/queries/useGetLlmModels"

export function SettingsModelsField() {
  const { register, formState, control } = useFormContext<SettingsFormValues>()
  const t = useTranslations("settings")
  const { data: availableModels } = useGetLlmModelsQuery()
  const selected = useWatch({ control, name: "selectedModels" }) ?? []

  return (
    <div className="flex flex-col gap-2">
      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {availableModels.map((model) => {
          const isSelected = selected.includes(model)
          return (
            <motion.label
              key={model}
              variants={fadeUp}
              htmlFor={`model-${model}`}
              className={cn(
                "relative flex cursor-pointer flex-col items-start gap-2 rounded-lg border p-3 transition-colors",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border hover:border-primary/40"
              )}
            >
              <input
                id={`model-${model}`}
                type="checkbox"
                value={model}
                className="sr-only"
                {...register("selectedModels")}
              />
              <span
                className={cn(
                  "absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity",
                  isSelected ? "opacity-100" : "opacity-0"
                )}
              >
                <Check className="h-3 w-3" />
              </span>
              <Bot className="h-6 w-6 text-foreground" />
              <span className="text-sm font-medium">{model}</span>
            </motion.label>
          )
        })}
      </motion.div>
      <FieldError errors={[formState.errors.selectedModels]}>
        {formState.errors.selectedModels && t("models.minError")}
      </FieldError>
    </div>
  )
}
