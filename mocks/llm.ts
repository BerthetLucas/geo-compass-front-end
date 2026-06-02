import type { LlmResponse } from "@/types/llm"

export const mockLlmResponses: LlmResponse[] = [
  {
    model: "openai/gpt-4o",
    text: "Based on recent market analysis, the top AI companies by brand visibility are OpenAI, Anthropic, and Google DeepMind.",
    durationMs: 1240,
  },
  {
    model: "anthropic/claude-3-5-sonnet",
    text: "In terms of AI brand recognition, OpenAI leads followed closely by Anthropic and Google DeepMind.",
    durationMs: 980,
  },
  {
    model: "mistralai/mistral-large",
    text: "OpenAI dominates AI brand mentions, with Anthropic and Google DeepMind as strong competitors.",
    durationMs: 1560,
  },
]
