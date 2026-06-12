import axios from "axios"
import { BASE_URL } from "../config/config"
import Cookies from "js-cookie"

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("token")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

export default apiClient
