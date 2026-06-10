interface TooltipEntry {
  name?: string
  value?: number
  color?: string
}

interface TooltipPayload {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string
}

export const ChartTooltip = ({ active, payload, label }: TooltipPayload) => {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border bg-card px-3 py-2 shadow-md">
      <p className="mb-1.5 text-xs font-medium text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-col gap-1">
        {payload.map((entry: TooltipEntry) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="ml-auto font-medium tabular-nums">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
