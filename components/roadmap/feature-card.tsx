import { type LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  soonLabel: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  soonLabel,
}: FeatureCardProps) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <Icon className="h-3.5 w-3.5 text-primary" />
            </div>
            {title}
          </div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Badge variant="secondary">
            {soonLabel}
          </Badge>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
