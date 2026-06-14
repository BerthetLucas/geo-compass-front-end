import type { DailyRanking } from "@/types/ranking"

const BRAND_COLORS: Record<string, string> = {
  OpenAI: "var(--brand-openai)",
  Anthropic: "var(--brand-anthropic)",
  "Google DeepMind": "var(--brand-google)",
  "Meta AI": "var(--brand-meta)",
  Mistral: "var(--brand-mistral)",
}

const GOLDEN_ANGLE = 137.508
const MAX_BRANDS = 5

export function getBrandColor(brand: string, fallbackIndex: number): string {
  const known = BRAND_COLORS[brand]
  if (known) return known

  const spreadHue = Math.round((fallbackIndex * GOLDEN_ANGLE) % 360)
  return `hsl(${spreadHue}, 65%, 55%)`
}

export function getGradientId(brand: string): string {
  return `gradient-${brand.replace(/\s+/g, "-")}`
}

function normalizeForGrouping(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
}

function normalizeForDisplay(name: string): string {
  return name.replace(/\s+/g, " ").trim()
}

function mapKeyToFirstSpelling(data: DailyRanking[]): Map<string, string> {
  const firstSpelling = new Map<string, string>()
  for (const day of data) {
    for (const ranking of day.rankings) {
      const key = normalizeForGrouping(ranking.brand)
      if (!firstSpelling.has(key)) {
        firstSpelling.set(key, normalizeForDisplay(ranking.brand))
      }
    }
  }
  return firstSpelling
}

function sumMentionsByBrand(
  rankings: DailyRanking["rankings"],
  displayLabel: (brand: string) => string
): Record<string, number> {
  const totals: Record<string, number> = {}
  for (const ranking of rankings) {
    const label = displayLabel(ranking.brand)
    totals[label] = (totals[label] ?? 0) + ranking.mentions
  }
  return totals
}

function formatDateLabel(date: string, locale: string): string {
  return new Date(date).toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
  })
}

/**
 * Builds everything the chart needs in a single pass over the data:
 * the per-day series (`chartData`) and the top brands by total mentions
 * (`brands`). Brand spellings are canonicalized once and shared.
 */
export function prepareChartData(data: DailyRanking[], locale: string) {
  const canonical = mapKeyToFirstSpelling(data)
  const displayLabel = (brand: string) =>
    canonical.get(normalizeForGrouping(brand)) ?? normalizeForDisplay(brand)

  const chartData = data.map((day) => ({
    date: formatDateLabel(day.date, locale),
    ...sumMentionsByBrand(day.rankings, displayLabel),
  }))

  const totalMentions = new Map<string, number>()
  for (const day of data) {
    for (const ranking of day.rankings) {
      const label = displayLabel(ranking.brand)
      totalMentions.set(
        label,
        (totalMentions.get(label) ?? 0) + ranking.mentions
      )
    }
  }

  const brands = [...totalMentions.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, MAX_BRANDS)
    .map(([label]) => label)

  return { chartData, brands }
}
