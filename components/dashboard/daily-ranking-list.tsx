"use client"

import { motion } from "motion/react"
import { DailyBrandRankCard } from "./daily-brand-rank-card"
import { DashboardSummary } from "./dashboard-summary"
import { fadeUp, stagger } from "@/lib/motion"
import { useGetDailyRankingSuspenseQuery } from "@/hooks/queries/useGetDailyRanking"

export const DailyRankingList = () => {
  const { data: rankings } = useGetDailyRankingSuspenseQuery()
  const maxMentions = Math.max(...rankings.map((b) => b.mentions), 0)

  return (
    <motion.div
      className="flex flex-col gap-8"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <DashboardSummary />
      <section className="flex flex-col gap-3">
        {rankings.map((brand) => (
          <motion.div key={brand.rank} variants={fadeUp}>
            <DailyBrandRankCard
              rank={brand.rank}
              brandName={brand.brand}
              mentionsNbr={brand.mentions}
              maxMentions={maxMentions}
            />
          </motion.div>
        ))}
      </section>
    </motion.div>
  )
}
