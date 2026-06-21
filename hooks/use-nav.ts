import {
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Settings,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/lib/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { signOut } from "@/services/auth"

export function useNavItems() {
  const t = useTranslations("nav")
  return [
    { href: "/", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/historic", label: t("history"), icon: LineChart },
    { href: "/prompts", label: t("prompts"), icon: MessageSquare },
    { href: "/settings", label: t("settings"), icon: Settings },
  ]
}

export function useSignOut() {
  const router = useRouter()
  const queryClient = useQueryClient()
  return () => {
    signOut()
    queryClient.clear()
    router.push("/login")
  }
}
