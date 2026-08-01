import { useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"

interface FeatureCardBadgeProps {
  newFeature?: boolean
}

export function FeatureCardBadge({
  newFeature = false,
}: FeatureCardBadgeProps) {
  const t = useTranslations("roadmap")

  if (newFeature) {
    return (
      <Badge variant="success" className="shrink-0">
        {t("new")}
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className="shrink-0">
      {t("soon")}
    </Badge>
  )
}
