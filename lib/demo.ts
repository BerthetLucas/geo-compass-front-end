import Cookies from "js-cookie"

export const DEMO_EMAIL = "geocompassdemo@demo.fr"

export const isDemoMode = (): boolean =>
  typeof window !== "undefined" && Cookies.get("demo_mode") === "true"

// Server-aware variant for use in query functions that run during SSR.
// On the server, reads the cookie via next/headers so demo detection stays
// consistent between server and client (avoids 401s and hydration mismatches).
export const isDemoModeAsync = async (): Promise<boolean> => {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers")
    return (await cookies()).get("demo_mode")?.value === "true"
  }
  return Cookies.get("demo_mode") === "true"
}

export const setDemoMode = (v: boolean): void => {
  if (v) {
    Cookies.set("demo_mode", "true", { expires: 7 })
  } else {
    Cookies.remove("demo_mode")
  }
}
