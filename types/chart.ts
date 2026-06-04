export interface TooltipEntry {
  name?: string
  value?: number
  color?: string
}

export interface TooltipPayload {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string
}
