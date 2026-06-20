import type { Prompt } from "@/types/prompt"
import type { BrandRanking, DailyRanking } from "@/types/ranking"
import type { UserSettings } from "@/types/user"
import { DEMO_EMAIL } from "./demo"

export const DEMO_PROMPTS: Prompt[] = [
  { id: 1, text: "Quelles sont les meilleures chaussures de running pour un marathon ?", isActive: true },
  { id: 2, text: "Recommande-moi des chaussures trail pour débutant.", isActive: true },
  { id: 3, text: "Quelles marques proposent les meilleures semelles pour la course sur route ?", isActive: true },
  { id: 4, text: "Quelle chaussure choisir pour courir en hivern sur terrain mixte ?", isActive: false },
  { id: 5, text: "Quelles sont les innovations récentes en matière de chaussures de running ?", isActive: false },
]

export const DEMO_DAILY_RANKING: BrandRanking[] = [
  { rank: 1, brand: "Nike", mentions: 47 },
  { rank: 2, brand: "Adidas", mentions: 39 },
  { rank: 3, brand: "Hoka", mentions: 31 },
  { rank: 4, brand: "Asics", mentions: 28 },
  { rank: 5, brand: "Brooks", mentions: 22 },
  { rank: 6, brand: "New Balance", mentions: 18 },
  { rank: 7, brand: "Salomon", mentions: 12 },
  { rank: 8, brand: "Saucony", mentions: 9 },
]

export const DEMO_MODELS: string[] = [
  "gpt-4o",
  "claude-3-5-sonnet-20241022",
  "gemini-1.5-pro",
  "llama-3.1-70b-instruct",
]

export const DEMO_MODEL_RANKING: BrandRanking[] = [
  { rank: 1, brand: "Nike", mentions: 12 },
  { rank: 2, brand: "Hoka", mentions: 10 },
  { rank: 3, brand: "Adidas", mentions: 9 },
  { rank: 4, brand: "Asics", mentions: 7 },
  { rank: 5, brand: "Brooks", mentions: 5 },
  { rank: 6, brand: "New Balance", mentions: 4 },
]

function buildDemoHistoric(): DailyRanking[] {
  const brands = ["Nike", "Adidas", "Hoka", "Asics", "Brooks", "New Balance"]
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
