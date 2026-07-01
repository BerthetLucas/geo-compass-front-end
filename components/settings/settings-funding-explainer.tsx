import { Heart, KeyRound, ExternalLink } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from "next-intl"

export function SettingsFundingExplainer() {
  const t = useTranslations("settings.funding")

  return (
    <div className="flex flex-col gap-4 rounded-r-lg border-l-2 border-primary/50 bg-primary/6 px-5 py-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Heart className="h-4 w-4 shrink-0 text-primary" />
          <span>{t("donationsTitle")}</span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t("donationsDescription")}
        </p>
        <a
          href="https://paypal.me/lucasberthet338"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary/80"
        >
          {t("donationsLink")}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <Separator className="bg-primary/20" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <KeyRound className="h-4 w-4 shrink-0 text-primary" />
          <span>{t("apiKeyTitle")}</span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t("apiKeyDescription")}
        </p>
        <a
          href="https://openrouter.ai/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary/80"
        >
          {t("apiKeyLink")}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}
