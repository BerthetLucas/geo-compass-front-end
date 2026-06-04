export interface BrandRanking {
  rank: number
  brand: string
  mentions: number
}

export interface DailyRanking {
  date: string
  rankings: BrandRanking[]
}

export interface ComputeRankingResponse {
  success: boolean
  date: string
}

export interface GlobalRankingParams {
  date?: string
}

export interface ModelRankingParams {
  model: string
  date?: string
}

export interface PeriodRankingParams {
  startDate: string
  endDate: string
}
