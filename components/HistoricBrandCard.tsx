import { Badge } from "./ui/badge"
import { Card } from "./ui/card"

interface HistoricBrandCardProps {
  date: string
  brands: string[]
}

export const HistoricBrandCard = ({ date, brands }: HistoricBrandCardProps) => {
  const formatedDate = new Date(date).toLocaleDateString("fr-FR")

  return (
    <Card className="mt-2 flex min-w-40 flex-col items-start p-3">
      <Badge variant="outline">{formatedDate}</Badge>
      <div className="flex flex-col items-start gap-2">
        {brands.map((brand, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Badge>{index}</Badge>
            <p className="truncate">{brand}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
