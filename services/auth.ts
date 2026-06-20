import apiClient from "@/lib/api"
import { AuthResponse, SignInRequest, SignUpRequest } from "@/types/auth"
import Cookies from "js-cookie"
import { DEMO_EMAIL, setDemoMode } from "@/lib/demo"

export async function login(credentials: SignInRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    "/auth/login",
    credentials
  )
  Cookies.set("token", response.data.access_token, { expires: 7 })
  setDemoMode(credentials.email === DEMO_EMAIL)
  return response.data
}

export async function register(
  credentials: SignUpRequest
): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(
    "/auth/register",
    credentials
  )
  Cookies.set("token", response.data.access_token, { expires: 7 })
  return response.data
}

export function signOut(): void {
  Cookies.remove("token")
  setDemoMode(false)
}
