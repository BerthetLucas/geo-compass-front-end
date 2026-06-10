"use client"

import { motion } from "motion/react"

import { DailyBrandRankCard } from "./daily-brand-rank-card"
import { fadeUp, stagger } from "@/lib/motion"
import type { BrandRanking } from "@/types/ranking"

interface DailyRankingListProps {
  rankings: BrandRanking[]
}

export const DailyRankingList = ({ rankings }: DailyRankingListProps) => {
  return (
    <motion.section
      className="mx-10 flex flex-col gap-5"
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
          />
        </motion.div>
      ))}
    </motion.section>
  )
}
