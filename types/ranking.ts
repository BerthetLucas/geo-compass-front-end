export interface BrandRanking {
  rank: number
  brand: string
  mentions: number
}

export interface DailyRanking {
  date: string
  rankings: BrandRanking[]
}

export interface PeriodRankingParams {
  startDate: string
  endDate: string
}
