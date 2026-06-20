import Cookies from "js-cookie"

export const DEMO_EMAIL = "geocompassdemo@demo.fr"

export const isDemoMode = (): boolean =>
  typeof window !== "undefined" && Cookies.get("demo_mode") === "true"

export const setDemoMode = (v: boolean): void => {
  if (v) {
    Cookies.set("demo_mode", "true", { expires: 7 })
  } else {
    Cookies.remove("demo_mode")
  }
}
