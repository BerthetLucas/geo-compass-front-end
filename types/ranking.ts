export interface BrandRanking {
  rank: number
  brand: string
  mentions: number
}

export interface DailyRanking {
  date: string // ISO date: "YYYY-MM-DD"
  rankings: BrandRanking[]
}

export interface ComputeRankingResponse {
  success: boolean
  date: string // ISO date: "YYYY-MM-DD"
}

export interface GlobalRankingParams {
  date?: string // ISO date: "YYYY-MM-DD"
}

export interface ModelRankingParams {
  model: string
  date?: string // ISO date: "YYYY-MM-DD"
}

export interface PeriodRankingParams {
  startDate: string // ISO date: "YYYY-MM-DD"
  endDate: string // ISO date: "YYYY-MM-DD"
}
