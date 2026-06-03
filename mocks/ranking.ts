import type {
  BrandRanking,
  DailyRanking,
  ComputeRankingResponse,
} from "@/types/ranking"

export const mockBrandRankings: BrandRanking[] = [
  { rank: 1, brand: "OpenAI", mentions: 142 },
  { rank: 2, brand: "Anthropic", mentions: 98 },
  { rank: 3, brand: "Google DeepMind", mentions: 87 },
  { rank: 4, brand: "Meta AI", mentions: 65 },
  { rank: 5, brand: "Mistral", mentions: 43 },
]

export const mockComputeRankingResponse: ComputeRankingResponse = {
  success: true,
  date: "2026-06-02",
}

export const mockGlobalRanking: BrandRanking[] = mockBrandRankings

export const mockModelRanking: BrandRanking[] = [
  { rank: 1, brand: "OpenAI", mentions: 58 },
  { rank: 2, brand: "Anthropic", mentions: 45 },
  { rank: 3, brand: "Mistral", mentions: 22 },
  { rank: 4, brand: "Google DeepMind", mentions: 19 },
  { rank: 5, brand: "Meta AI", mentions: 11 },
]

export const mockPeriodRanking: DailyRanking[] = [
  {
    date: "2026-05-27",
    rankings: [
      { rank: 1, brand: "OpenAI", mentions: 130 },
      { rank: 2, brand: "Anthropic", mentions: 88 },
      { rank: 3, brand: "Google DeepMind", mentions: 72 },
    ],
  },
  {
    date: "2026-05-28",
    rankings: [
      { rank: 1, brand: "OpenAI", mentions: 145 },
      { rank: 2, brand: "Google DeepMind", mentions: 95 },
      { rank: 3, brand: "Anthropic", mentions: 90 },
    ],
  },
  {
    date: "2026-05-29",
    rankings: [
      { rank: 1, brand: "Anthropic", mentions: 102 },
      { rank: 2, brand: "OpenAI", mentions: 99 },
      { rank: 3, brand: "Meta AI", mentions: 61 },
    ],
  },
  {
    date: "2026-05-30",
    rankings: [
      { rank: 1, brand: "OpenAI", mentions: 155 },
      { rank: 2, brand: "Anthropic", mentions: 110 },
      { rank: 3, brand: "Google DeepMind", mentions: 88 },
    ],
  },
  {
    date: "2026-05-31",
    rankings: [
      { rank: 1, brand: "OpenAI", mentions: 160 },
      { rank: 2, brand: "Anthropic", mentions: 115 },
      { rank: 3, brand: "Google DeepMind", mentions: 92 },
    ],
  },
  {
    date: "2026-06-01",
    rankings: [
      { rank: 1, brand: "OpenAI", mentions: 138 },
      { rank: 2, brand: "Anthropic", mentions: 104 },
      { rank: 3, brand: "Mistral", mentions: 55 },
    ],
  },
  {
    date: "2026-06-02",
    rankings: mockBrandRankings,
  },
]
