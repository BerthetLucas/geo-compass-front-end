"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { HistoricRankingChart } from "./historic-ranking-chart/historic-ranking-chart"
import { Card } from "@/components/ui/card"
import { fadeUp, EASE_OUT } from "@/lib/motion"
import { useGetRankingHistoricSuspenseQuery } from "@/hooks/queries/useGetRankingHistoric"

export const HistoricRankingSection = () => {
  const { data } = useGetRankingHistoricSuspenseQuery()
  const t = useTranslations("historic")

  return (
    <motion.section
      className="mx-10 mt-10 flex flex-col gap-5"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.35, duration: 0.4, ease: EASE_OUT }}
    >
      <div className="mb-5 flex flex-col gap-1">
        <h2 className="text-xl">{t("chartTitle")}</h2>
        <p>{t("chartSubtitle")}</p>
      </div>
      <Card className="p-6">
        <HistoricRankingChart data={data} />
      </Card>
    </motion.section>
  )
}
