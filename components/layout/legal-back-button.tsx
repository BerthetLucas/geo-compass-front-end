"use client"

import { ArrowLeft } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/lib/navigation"

export const LegalBackButton = () => {
  const t = useTranslations("common")
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft size={16} />
      {t("back")}
    </button>
  )
}
