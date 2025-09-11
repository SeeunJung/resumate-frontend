import { getStatistics } from '@/services/statistics'
import { create } from 'zustand'

interface Statistics {
  monthlyReviewCount: number
  totalReviewCount: number
  totalAnalysisCount: number
  continuousDays: number
}

interface StatisticsStore {
  stats: Statistics | null
  loading: boolean
  fetchStats: () => Promise<void>
}

export const useStatisticsStore = create<StatisticsStore>((set) => ({
  stats: null,
  loading: false,

  fetchStats: async () => {
    set({ loading: true })
    try {
      const res = await getStatistics()
      set({ stats: res })
    } catch (error: any) {
      console.error('통계 조회에 실패했습니다: ', error)
    } finally {
      set({ loading: false })
    }
  },
}))
