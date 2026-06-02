import type { PromptResponse } from "@/types/prompt"

export const mockPrompts: PromptResponse[] = [
  {
    text: "Which AI company do you think is leading the market right now?",
    isActive: true,
  },
  {
    text: "What are the top 5 AI brands you trust the most?",
    isActive: true,
  },
  {
    text: "Name an AI assistant you use regularly.",
    isActive: false,
  },
  {
    text: "Which AI company has the best reputation for safety?",
    isActive: true,
  },
]
