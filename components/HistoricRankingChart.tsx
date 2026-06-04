"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import type { DailyRanking } from "@/types/ranking"

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

interface HistoricRankingChartProps {
  data: DailyRanking[]
}

const BRAND_COLORS: Record<string, string> = {
  OpenAI: "hsl(220 60% 55%)",
  Anthropic: "hsl(280 50% 60%)",
  "Google DeepMind": "hsl(340 60% 55%)",
  "Meta AI": "hsl(195 60% 50%)",
  Mistral: "hsl(35 70% 52%)",
}

const DEFAULT_COLOR = "hsl(0 0% 50%)"

function getColor(brand: string) {
  return BRAND_COLORS[brand] ?? DEFAULT_COLOR
}

function transformData(data: DailyRanking[]) {
  return data.map((day) => {
    const dateLabel = new Date(day.date).toLocaleDateString("fr-FR", {
      month: "short",
      day: "numeric",
    })
    const mentions = Object.fromEntries(
      day.rankings.map((r) => [r.brand, r.mentions])
    )
    return { date: dateLabel, ...mentions }
  })
}

function getUniqueBrands(data: DailyRanking[]) {
  const seen = new Set<string>()
  for (const day of data) {
    for (const r of day.rankings) seen.add(r.brand)
  }
  return [...seen]
}

function ChartTooltip({ active, payload, label }: TooltipPayload) {
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

export function HistoricRankingChart({ data }: HistoricRankingChartProps) {
  const chartData = transformData(data)
  const brands = getUniqueBrands(data)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={chartData}
        margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
      >
        <defs>
          {brands.map((brand) => {
            const id = `gradient-${brand.replace(/\s+/g, "-")}`
            const color = getColor(brand)
            return (
              <linearGradient key={brand} id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.18} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            )
          })}
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(var(--border))"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={<ChartTooltip />}
          cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
          iconType="circle"
          iconSize={8}
        />

        {brands.map((brand) => {
          const color = getColor(brand)
          const fillId = `url(#gradient-${brand.replace(/\s+/g, "-")})`
          return (
            <Area
              key={brand}
              type="monotone"
              dataKey={brand}
              stroke={color}
              strokeWidth={1.5}
              fill={fillId}
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0, fill: color }}
            />
          )
        })}
      </AreaChart>
    </ResponsiveContainer>
  )
}
