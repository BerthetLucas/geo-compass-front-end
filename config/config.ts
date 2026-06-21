export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined")
}

export const MAX_PROMPTS = 5

export const AVAILABLE_MODELS = [
  'google/gemini-3-flash-preview',
  'anthropic/claude-haiku-4.5',
  'openai/gpt-4o',
]
