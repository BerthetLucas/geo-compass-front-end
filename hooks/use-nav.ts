import {
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Settings,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/lib/navigation"
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
  return () => {
    signOut()
    router.push("/login")
  }
}
