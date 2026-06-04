"use client"

import { motion } from "motion/react"

import { DailyBrandRankCard } from "@/components/DailyBrandRankCard"
import { HistoricRankingChart } from "@/components/historic-ranking-chart/historic-ranking-chart"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { mockBrandRankings, mockPeriodRanking } from "@/mocks/ranking"
import { fadeUp, stagger } from "@/lib/motion"

export default function Page() {
  const formattedDate = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <motion.section
        className="mx-10 mb-10 flex flex-col items-start justify-between gap-5 md:flex-row"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-5 flex flex-col gap-1">
          <h1 className="text-2xl">Rankings</h1>
          <p>Les résultats du jour</p>
        </div>
        <Badge variant="outline" className="p-3 capitalize">
          {formattedDate}
        </Badge>
      </motion.section>

      <motion.section
        className="mx-10 flex flex-col gap-5"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {mockBrandRankings.map((brand) => (
          <motion.div key={brand.rank} variants={fadeUp}>
            <DailyBrandRankCard
              rank={brand.rank}
              brandName={brand.brand}
              mentionsNbr={brand.mentions}
            />
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        className="mx-10 mt-10 flex flex-col gap-5"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.35, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-5 flex flex-col gap-1">
          <h2 className="text-xl">Historic Rankings</h2>
          <p>Les résultats des jours précédents</p>
        </div>
        <Card className="p-6">
          <HistoricRankingChart data={mockPeriodRanking} />
        </Card>
      </motion.section>
    </>
  )
}
