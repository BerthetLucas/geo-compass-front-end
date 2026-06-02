export interface LlmRequest {
  models: string[]
}

export interface LlmResponse {
  model: string
  text: string
  durationMs: number
}
