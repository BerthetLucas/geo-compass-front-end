import apiClient from "@/lib/api"
import { BrandRanking } from "@/types/ranking"

export async function getGeoDailyRanking(): Promise<BrandRanking[]> {
  const response = await apiClient.get("/geo/global")
  return response.data
}
