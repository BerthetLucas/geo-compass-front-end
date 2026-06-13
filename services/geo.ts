import apiClient from "@/lib/api"
import {
  BrandRanking,
  DailyRanking,
  PeriodRankingParams,
} from "@/types/ranking"

export async function getGeoDailyRanking(): Promise<BrandRanking[]> {
  const response = await apiClient.get("/geo/global")
  return response.data
}

export async function getGeoAvailableModels(date?: string): Promise<string[]> {
  const response = await apiClient.get("/geo/models", { params: date ? { date } : undefined })
  return response.data
}

export async function getGeoModelRanking(model: string, date?: string): Promise<BrandRanking[]> {
  const response = await apiClient.get(`/geo/model/${encodeURIComponent(model)}`, {
    params: date ? { date } : undefined,
  })
  return response.data
}

function toISODate(date: Date): string {
  return date.toISOString().split("T")[0]
}

function getDefaultStartDate(): string {
  const date = new Date()
  date.setDate(date.getDate() - 20)
  return toISODate(date)
}

function getDefaultEndDate(): string {
  return toISODate(new Date())
}

export async function getGeoRankingByPeriod({
  startDate = getDefaultStartDate(),
  endDate = getDefaultEndDate(),
}: Partial<PeriodRankingParams> = {}): Promise<DailyRanking[]> {
  const response = await apiClient.get("/geo/period", {
    params: { startDate, endDate },
  })
  return response.data
}
