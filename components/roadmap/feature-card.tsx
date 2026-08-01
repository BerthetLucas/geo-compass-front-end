import { type LucideIcon } from "lucide-react"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FeatureCardBadge } from "./feature-card-badge"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  newFeature?: boolean
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  newFeature = false,
}: FeatureCardProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Icon className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="min-w-0 wrap-break-word">{title}</span>
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <FeatureCardBadge newFeature={newFeature} />
        </CardAction>
      </CardHeader>
    </Card>
  )
}
