import { useEffect } from 'react'
import HomeStatisticsCard from './HomeStatisticsCard'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useStatisticsStore } from '@/stores/useStatisticsStore'

function HomeStatistics() {
  const { stats, loading, fetchStats } = useStatisticsStore()

  useEffect(() => {
    if (!stats) fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2 min-w-60">
      <HomeStatisticsCard
        text="이번달 회고 수"
        stats={stats?.monthlyReviewCount ?? 0}
      />
      <HomeStatisticsCard
        text="총 회고 수"
        stats={stats?.totalReviewCount ?? 0}
      />
      <HomeStatisticsCard
        text="AI 재료화 수"
        stats={stats?.totalAnalysisCount ?? 0}
      />
      <HomeStatisticsCard
        text="연속 회고 수"
        stats={stats?.continuousDays ?? 0}
      />
    </div>
  )
}

export default HomeStatistics
