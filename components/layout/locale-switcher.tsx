"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/lib/navigation"
import { locales, type Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={cn(
            "rounded px-1.5 py-0.5 text-xs font-medium tracking-wider uppercase transition-colors",
            {
              "bg-primary/10 text-primary": l === locale,
              "text-muted-foreground hover:text-foreground": l !== locale,
            }
          )}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
