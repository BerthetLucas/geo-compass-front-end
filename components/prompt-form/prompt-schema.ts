import { z } from "zod"

export const promptSchema = z.object({
  text: z
    .string()
    .min(1, "Prompt cannot be empty")
    .max(500, "Prompt must be 500 characters or fewer"),
})

export type PromptFormValues = z.infer<typeof promptSchema>
