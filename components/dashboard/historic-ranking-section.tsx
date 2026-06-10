"use client"

import { motion } from "motion/react"

import { HistoricRankingChart } from "./historic-ranking-chart/historic-ranking-chart"
import { Card } from "@/components/ui/card"
import { fadeUp, EASE_OUT } from "@/lib/motion"
import type { DailyRanking } from "@/types/ranking"

interface HistoricRankingSectionProps {
  data: DailyRanking[]
}

export const HistoricRankingSection = ({
  data,
}: HistoricRankingSectionProps) => {
  return (
    <motion.section
      className="mx-10 mt-10 flex flex-col gap-5"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.35, duration: 0.4, ease: EASE_OUT }}
    >
      <div className="mb-5 flex flex-col gap-1">
        <h2 className="text-xl">Historic Rankings</h2>
        <p>Les résultats des jours précédents</p>
      </div>
      <Card className="p-6">
        <HistoricRankingChart data={data} />
      </Card>
    </motion.section>
  )
}
