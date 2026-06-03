import { Card } from "./ui/card"

interface HistoricBrandCardProps {
  date: string
  brands: string[]
}

export const HistoricBrandCard = ({ date, brands }: HistoricBrandCardProps) => {
  return (
    <Card className="flex flex-col items-start justify-between p-5">
      <h3 className="text-lg font-semibold">{date}</h3>
      <div>
        {brands.map((brand, index) => (
          <p key={index}>{brand}</p>
        ))}
      </div>
    </Card>
  )
}
