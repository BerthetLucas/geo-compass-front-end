"use client"

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
import type { Prompt } from "@/types/prompt"

interface PromptCardProps {
  prompt: Prompt
  onEdit: (prompt: Prompt) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function PromptCard({
  prompt,
  onEdit,
  onToggle,
  onDelete,
}: PromptCardProps) {
  const badgeVariant = prompt.isActive ? "default" : "secondary"
  const badgeLabel = prompt.isActive ? "active" : "inactive"
  const toggleLabel = prompt.isActive ? "Set inactive" : "Set active"
  const cardClassName = cn(
    "flex flex-col gap-3 px-4 py-3 transition-opacity",
    !prompt.isActive && "opacity-60"
  )
  const dotClassName = cn(
    "size-2 shrink-0 rounded-full",
    prompt.isActive ? "bg-emerald-400" : "bg-muted-foreground"
  )

  return (
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
              <DropdownMenuItem onClick={() => onEdit(prompt)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onToggle(prompt.id)}>
                {toggleLabel}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(prompt.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <p className="text-sm leading-relaxed">{prompt.text}</p>
    </Card>
  )
}
