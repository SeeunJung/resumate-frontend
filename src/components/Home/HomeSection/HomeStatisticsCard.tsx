import { Card } from '@/styles/customStyles'

interface HomeStatisticsCardProps {
  text: string
  stats: number
}

function HomeStatisticsCard({ text, stats }: HomeStatisticsCardProps) {
  return (
    <div
      className={Card(
        'flex',
        'flex-col',
        'p-6',
        'justify-between',
        'aspect-square',
      )}
    >
      <span className="flex justify-start text-sm font-medium whitespace-nowrap">
        {text}
      </span>
      <span className="flex justify-end text-3xl font-bold">{stats}</span>
    </div>
  )
}

export default HomeStatisticsCard
