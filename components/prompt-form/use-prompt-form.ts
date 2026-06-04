import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { promptSchema, type PromptFormValues } from "./prompt-schema"

export function usePromptForm(defaultValues?: Partial<PromptFormValues>) {
  return useForm<PromptFormValues>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      text: "",
      ...defaultValues,
    },
  })
}
