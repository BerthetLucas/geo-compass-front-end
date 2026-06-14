"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/lib/navigation"
import { locales, type Locale } from "@/i18n/routing"

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
          className={`text-xs font-medium uppercase tracking-wider px-1.5 py-0.5 rounded transition-colors ${
            l === locale
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
