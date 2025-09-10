import HomeStatisticsCard from './HomeStatisticsCard'

function HomeStatistics() {
  return (
    <div className="grid grid-cols-2 gap-2 min-w-60">
      <HomeStatisticsCard
        text="이번달 회고 수"
        stats={11}
      />
      <HomeStatisticsCard
        text="총 회고 수"
        stats={37}
      />
      <HomeStatisticsCard
        text="AI 재료화 수"
        stats={5}
      />
      <HomeStatisticsCard
        text="연속 회고 수"
        stats={8}
      />
    </div>
  )
}

export default HomeStatistics
