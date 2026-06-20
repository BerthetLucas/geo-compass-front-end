import type { Prompt } from "@/types/prompt"
import type { BrandRanking, DailyRanking } from "@/types/ranking"
import type { UserSettings } from "@/types/user"
import { DEMO_EMAIL } from "./demo"

export const DEMO_PROMPTS: Prompt[] = [
  {
    id: 1,
    text: "Quelle est la meilleure marque française pour un robot cuiseur ?",
    isActive: false,
  },
  {
    id: 2,
    text: "Quelle marque française recommandes-tu pour une friteuse sans huile ?",
    isActive: false,
  },
  {
    id: 3,
    text: "Quelles marques françaises d'électroménager ont la meilleure réputation ?",
    isActive: false,
  },
  {
    id: 4,
    text: "Quel fer à repasser français acheter pour un usage quotidien ?",
    isActive: false,
  },
  {
    id: 5,
    text: "Quelle marque française propose les meilleures casseroles antiadhésives ?",
    isActive: false,
  },
]

export const DEMO_DAILY_RANKING: BrandRanking[] = [
  { rank: 1, brand: "Tefal", mentions: 52 },
  { rank: 2, brand: "Moulinex", mentions: 44 },
  { rank: 3, brand: "Rowenta", mentions: 37 },
  { rank: 4, brand: "SEB", mentions: 31 },
  { rank: 5, brand: "De Dietrich", mentions: 24 },
  { rank: 6, brand: "Magimix", mentions: 19 },
  { rank: 7, brand: "Brandt", mentions: 13 },
  { rank: 8, brand: "Calor", mentions: 8 },
]

export const DEMO_MODELS: string[] = ["openai", "anthropic", "google"]

export const DEMO_MODEL_RANKING: BrandRanking[] = [
  { rank: 1, brand: "Tefal", mentions: 14 },
  { rank: 2, brand: "Moulinex", mentions: 11 },
  { rank: 3, brand: "Rowenta", mentions: 9 },
  { rank: 4, brand: "SEB", mentions: 7 },
  { rank: 5, brand: "De Dietrich", mentions: 6 },
  { rank: 6, brand: "Magimix", mentions: 4 },
]

function buildDemoHistoric(): DailyRanking[] {
  const brands = [
    "Tefal",
    "Moulinex",
    "Rowenta",
    "SEB",
    "De Dietrich",
    "Magimix",
  ]
  const days: DailyRanking[] = []
  for (let i = 19; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const isoDate = date.toISOString().split("T")[0]
    const rankings: BrandRanking[] = brands.map((brand, idx) => ({
      rank: idx + 1,
      brand,
      mentions: Math.max(5, 47 - idx * 7 + Math.round(Math.sin(i + idx) * 5)),
    }))
    days.push({ date: isoDate, rankings })
  }
  return days
}

export const DEMO_HISTORIC: DailyRanking[] = buildDemoHistoric()

export const DEMO_USER_SETTINGS: UserSettings = {
  email: DEMO_EMAIL,
  emailNotifications: false,
  hasOpenRouterApiKey: true,
}
