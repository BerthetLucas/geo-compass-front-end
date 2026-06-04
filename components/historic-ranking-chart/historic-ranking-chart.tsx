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
import { ChartTooltip } from "./chart-tooltip"
import { transformData, getUniqueBrands, getBrandColor } from "./utils"

interface HistoricRankingChartProps {
  data: DailyRanking[]
}

const AXIS_STYLE = {
  fontSize: 12,
  fill: "var(--foreground)",
}

export const HistoricRankingChart = ({ data }: HistoricRankingChartProps) => {
  const chartData = transformData(data)
  const brands = getUniqueBrands(data)

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        data={chartData}
        margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
      >
        <defs>
          {brands.map((brand, i) => {
            const id = `gradient-${brand.replace(/\s+/g, "-")}`
            const color = getBrandColor(brand, i)
            return (
              <linearGradient key={brand} id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            )
          })}
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={AXIS_STYLE}
          axisLine={{ stroke: "var(--border)" }}
          tickLine={false}
        />
        <YAxis tick={AXIS_STYLE} axisLine={false} tickLine={false} />
        <Tooltip
          content={<ChartTooltip />}
          cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
        />
        <Legend
          wrapperStyle={{
            fontSize: 12,
            paddingTop: 16,
            color: "var(--foreground)",
          }}
          iconType="rect"
          iconSize={8}
        />
        {brands.map((brand, i) => {
          const color = getBrandColor(brand, i)
          const fillId = `url(#gradient-${brand.replace(/\s+/g, "-")})`
          return (
            <Area
              key={brand}
              type="linear"
              dataKey={brand}
              stroke={color}
              strokeWidth={2}
              fill={fillId}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: color }}
            />
          )
        })}
      </AreaChart>
    </ResponsiveContainer>
  )
}
