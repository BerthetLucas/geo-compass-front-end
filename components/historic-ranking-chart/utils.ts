import type { DailyRanking } from "@/types/ranking"

const BRAND_COLORS: Record<string, string> = {
  OpenAI: "var(--brand-openai)",
  Anthropic: "var(--brand-anthropic)",
  "Google DeepMind": "var(--brand-google)",
  "Meta AI": "var(--brand-meta)",
  Mistral: "var(--brand-mistral)",
}

const FALLBACK_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

export function getBrandColor(brand: string, fallbackIndex: number): string {
  return (
    BRAND_COLORS[brand] ??
    FALLBACK_COLORS[fallbackIndex % FALLBACK_COLORS.length]
  )
}

export function transformData(data: DailyRanking[]) {
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

export function getUniqueBrands(data: DailyRanking[]): string[] {
  const seen = new Set<string>()
  for (const day of data) {
    for (const r of day.rankings) seen.add(r.brand)
  }
  return [...seen]
}
