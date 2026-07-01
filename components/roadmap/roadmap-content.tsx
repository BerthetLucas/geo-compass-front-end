"use client"

import { Bot, BellRing } from "lucide-react"
import { useTranslations } from "next-intl"
import { FeatureCard } from "./feature-card"

const features = [
  { key: "modelSelection", icon: Bot },
  { key: "emailAlerts", icon: BellRing },
] as const

export function RoadmapContent() {
  const t = useTranslations("roadmap")

  return (
    <section className="mx-10 flex flex-col gap-6 pb-16">
      <div>
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>
      <div className="flex flex-col gap-3">
        {features.map(({ key, icon }) => (
          <FeatureCard
            key={key}
            icon={icon}
            title={t(`features.${key}.title`)}
            description={t(`features.${key}.description`)}
            soonLabel={t("soon")}
          />
        ))}
      </div>
    </section>
  )
}
