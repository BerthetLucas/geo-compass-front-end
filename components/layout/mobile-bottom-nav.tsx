"use client"

import { usePathname, Link } from "@/lib/navigation"
import { motion } from "motion/react"
import { useNavItems } from "@/hooks/use-nav"
import { cn } from "@/lib/utils"

export const MobileBottomNav = () => {
  const pathname = usePathname()
  const navItems = useNavItems()

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 md:hidden">
      <div className="border-t border-border/60 bg-background/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150">
        <div className="flex items-center justify-around px-2 py-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="relative flex min-w-0 flex-1 flex-col items-center gap-0.5 px-2 py-2"
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
                    className={cn({
                      "text-primary": active,
                      "text-muted-foreground": !active,
                    })}
                    strokeWidth={active ? 2.2 : 1.7}
                  />
                </motion.div>
                <span
                  className={cn("text-xs font-medium tracking-tight", {
                    "text-primary": active,
                    "text-muted-foreground": !active,
                  })}
                >
                  {label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
