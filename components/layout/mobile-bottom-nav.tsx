"use client"

import { usePathname, useRouter, Link } from "@/lib/navigation"
import { useTranslations } from "next-intl"
import { LayoutDashboard, LineChart, MessageSquare, LogOut } from "lucide-react"
import { motion } from "motion/react"
import { signOut } from "@/services/auth"
import { LocaleSwitcher } from "@/components/layout/locale-switcher"

export const MobileBottomNav = () => {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations("nav")
  const tAuth = useTranslations("auth")

  const NAV = [
    { href: "/", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/historic", label: t("history"), icon: LineChart },
    { href: "/prompts", label: t("prompts"), icon: MessageSquare },
  ]

  const handleSignOut = () => {
    signOut()
    router.push("/login")
  }

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 md:hidden">
      <div className="border-t border-border/60 bg-background/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150">
        <div className="flex items-center justify-around px-2 py-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="relative flex min-w-14 flex-col items-center gap-0.5 px-4 py-2"
              >
                {active && (
                  <motion.span
                    layoutId="bottom-nav-indicator"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.div
                  animate={{ scale: active ? 1.08 : 1, y: active ? -1 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Icon
                    size={22}
                    className={active ? "text-primary" : "text-muted-foreground"}
                    strokeWidth={active ? 2.2 : 1.7}
                  />
                </motion.div>
                <span
                  className={`text-[10px] font-medium tracking-tight ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </Link>
            )
          })}
          <button
            onClick={handleSignOut}
            className="flex min-w-14 flex-col items-center gap-0.5 px-4 py-2"
          >
            <LogOut size={22} className="text-muted-foreground" strokeWidth={1.7} />
            <span className="text-[10px] font-medium tracking-tight text-muted-foreground">
              {tAuth("signOut")}
            </span>
          </button>
          <LocaleSwitcher />
        </div>
      </div>
    </nav>
  )
}
