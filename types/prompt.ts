export interface Prompt {
  id: number
  text: string
  isActive: boolean
}

export interface AddPromptRequest {
  text: string
}

export interface UpdatePromptRequest {
  text?: string
  isActive?: boolean
}
