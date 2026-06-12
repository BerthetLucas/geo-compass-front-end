import axios from "axios"
import { BASE_URL } from "../config/config"
import Cookies from "js-cookie"

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

async function getToken(): Promise<string | undefined> {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers")
    return (await cookies()).get("token")?.value
  }
  return Cookies.get("token")
}

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken()
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("token")
    }

    return Promise.reject(error)
  }
)

export default apiClient
