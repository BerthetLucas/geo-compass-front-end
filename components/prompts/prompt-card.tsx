"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useUpdatePromptMutation } from "@/hooks/mutation/useUpdatePromptMutation"
import { useDeletePromptMutation } from "@/hooks/mutation/useDeletePromptMutation"
import { PromptDialog } from "./prompt-dialog"
import { useTranslations } from "next-intl"
import type { Prompt } from "@/types/prompt"
import { cardHoverSpring } from "@/lib/motion"

interface PromptCardProps {
  prompt: Prompt
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const updateMutation = useUpdatePromptMutation()
  const deleteMutation = useDeletePromptMutation()
  const t = useTranslations("prompts")
  const { id, isActive, text } = prompt

  const dotClassName = cn(
    "size-2 shrink-0 rounded-full",
    isActive ? "bg-primary" : "bg-muted-foreground"
  )
  const badgeVariant = isActive ? "default" : "secondary"

  const handleToggle = () => {
    updateMutation.mutate({ id, data: { isActive: !isActive } })
  }

  const handleEdit = (values: { text: string }) => {
    updateMutation.mutate({ id, data: { text: values.text } })
  }

  const handleDelete = () => {
    deleteMutation.mutate(id)
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -2 }}
        transition={cardHoverSpring}
        className={cn("transition-opacity duration-200", !isActive && "opacity-60")}
      >
        <Card
          className="flex flex-col gap-3 px-4 py-3"
          style={{ boxShadow: "var(--shadow-card)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "var(--shadow-card-hover)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "var(--shadow-card)"
          }}
        >
          <div className="flex items-center gap-2">
            <span className={dotClassName} />
            <Badge variant={badgeVariant}>
              {isActive ? t("active") : t("inactive")}
            </Badge>
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm">
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">{t("actions")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setEditOpen(true)}>
                    {t("edit")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleToggle}>
                    {isActive ? t("setInactive") : t("setActive")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={handleDelete}>
                    {t("delete")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-sm leading-relaxed">{text}</p>
        </Card>
      </motion.div>

      <PromptDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title={t("editTitle")}
        defaultValues={{ text }}
        submitLabel={t("save")}
        onSubmit={handleEdit}
      />
    </>
  )
}
