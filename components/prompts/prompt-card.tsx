"use client"

import { useState } from "react"
import { MoreHorizontal } from "lucide-react"
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
import type { Prompt } from "@/types/prompt"

interface PromptCardProps {
  prompt: Prompt
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [editOpen, setEditOpen] = useState(false)
  const updateMutation = useUpdatePromptMutation()
  const deleteMutation = useDeletePromptMutation()
  const { id, isActive, text } = prompt

  const cardClassName = cn(
    "flex flex-col gap-3 px-4 py-3 transition-opacity",
    !isActive && "opacity-60"
  )
  const dotClassName = cn(
    "size-2 shrink-0 rounded-full",
    isActive ? "bg-emerald-400" : "bg-muted-foreground"
  )
  const badgeVariant = isActive ? "default" : "secondary"
  const badgeLabel = isActive ? "active" : "inactive"
  const toggleLabel = isActive ? "Set inactive" : "Set active"

  const handleToggle = () => {
    updateMutation.mutate({
      id,
      data: { isActive: !isActive },
    })
  }

  const handleEdit = (values: { text: string }) => {
    updateMutation.mutate({ id: id, data: { text: values.text } })
  }

  const handleDelete = () => {
    deleteMutation.mutate(id)
  }

  return (
    <>
      <Card className={cardClassName}>
        <div className="flex items-center gap-2">
          <span className={dotClassName} />
          <Badge variant={badgeVariant}>{badgeLabel}</Badge>
          <div className="ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Prompt actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEditOpen(true)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleToggle}>
                  {toggleLabel}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleDelete}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="text-sm leading-relaxed">{text}</p>
      </Card>

      <PromptDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit prompt"
        defaultValues={{ text }}
        submitLabel="Save"
        onSubmit={handleEdit}
      />
    </>
  )
}
