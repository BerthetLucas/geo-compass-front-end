import type { DailyRanking } from "@/types/ranking"

const BRAND_COLORS: Record<string, string> = {
  OpenAI: "var(--brand-openai)",
  Anthropic: "var(--brand-anthropic)",
  "Google DeepMind": "var(--brand-google)",
  "Meta AI": "var(--brand-meta)",
  Mistral: "var(--brand-mistral)",
}

// Golden-angle hue spread → distinct colors for any brand count
const GOLDEN_ANGLE = 137.508

export function getBrandColor(brand: string, fallbackIndex: number): string {
  if (BRAND_COLORS[brand]) return BRAND_COLORS[brand]
  const hue = Math.round((fallbackIndex * GOLDEN_ANGLE) % 360)
  return `hsl(${hue}, 65%, 55%)`
}

export function getGradientId(brand: string): string {
  return `gradient-${brand.replace(/\s+/g, "-")}`
}

// Grouping key: strip accents + case + extra spaces so "Pâgero" === "pagero"
function brandKey(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
}

function cleanLabel(name: string): string {
  return name.replace(/\s+/g, " ").trim()
}

// Map normalized key -> canonical display label (first spelling seen)
function buildCanonicalMap(data: DailyRanking[]): Map<string, string> {
  const map = new Map<string, string>()
  for (const day of data) {
    for (const r of day.rankings) {
      const key = brandKey(r.brand)
      if (!map.has(key)) map.set(key, cleanLabel(r.brand))
    }
  }
  return map
}

export function transformData(data: DailyRanking[]) {
  const canonical = buildCanonicalMap(data)
  return data.map((day) => {
    const dateLabel = new Date(day.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    const mentions: Record<string, number> = {}
    for (const r of day.rankings) {
      const label = canonical.get(brandKey(r.brand)) ?? cleanLabel(r.brand)
      mentions[label] = (mentions[label] ?? 0) + r.mentions
    }
    return { date: dateLabel, ...mentions }
  })
}

const MAX_BRANDS = 5

// Top brands by total mentions over the whole period
export function getUniqueBrands(data: DailyRanking[]): string[] {
  const canonical = buildCanonicalMap(data)
  const totals = new Map<string, number>()
  for (const day of data) {
    for (const r of day.rankings) {
      const label = canonical.get(brandKey(r.brand)) ?? cleanLabel(r.brand)
      totals.set(label, (totals.get(label) ?? 0) + r.mentions)
    }
  }
  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_BRANDS)
    .map(([label]) => label)
}
