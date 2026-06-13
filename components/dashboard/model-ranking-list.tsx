"use client"

import { motion } from "motion/react"
import { DailyBrandRankCard } from "./daily-brand-rank-card"
import { fadeUp, stagger } from "@/lib/motion"
import { useGetModelRankingSuspenseQuery } from "@/hooks/queries/useGetModelRanking"

interface ModelRankingListProps {
  model: string
}

export const ModelRankingList = ({ model }: ModelRankingListProps) => {
  const { data: rankings } = useGetModelRankingSuspenseQuery(model)
  const maxMentions = Math.max(...rankings.map((b) => b.mentions), 0)

  if (rankings.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No data for this model.</p>
    )
  }

  return (
    <motion.section
      className="flex flex-col gap-3"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
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
    </motion.section>
  )
}
