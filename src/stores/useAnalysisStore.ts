import { getAnalysis, getAnalysisList } from '@/services/analysis'
import type { Analysis } from '@/types/Analysis'
import { create } from 'zustand'

type Status = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'

interface AnalysisState {
  folderAnalysis: Record<number, Analysis | null>
  folderStatus: Record<number, Status>
  folderError: Record<number, string | null>

  analysisList: Analysis[]
  listStatus: Status
  listError: string | null

  fetchAnalysisList: () => Promise<void>
  fetchAnalysis: (folderId: number) => Promise<void>
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  analysisList: [],
  listStatus: 'IDLE',
  listError: null,

  folderAnalysis: {},
  folderStatus: {},
  folderError: {},

  fetchAnalysisList: async () => {
    set({ listStatus: 'PENDING', listError: null })
    try {
      const res = await getAnalysisList()
      set({
        analysisList: res.analysis,
        listStatus: 'SUCCESS',
      })
    } catch (error: any) {
      set({
        listStatus: 'ERROR',
        listError: error.message ?? '알 수 없는 오류가 발생했습니다.',
      })
    }
  },

  fetchAnalysis: async (folderId) => {
    set((state) => ({
      folderStatus: { ...state.folderStatus, [folderId]: 'PENDING' },
      folderError: { ...state.folderError, [folderId]: null },
    }))
    try {
      const res = await getAnalysis(folderId)
      set((state) => ({
        folderAnalysis: { ...state.folderAnalysis, [folderId]: res },
        folderStatus: { ...state.folderStatus, [folderId]: 'SUCCESS' },
      }))
    } catch (error: any) {
      set((state) => ({
        folderStatus: { ...state.folderStatus, [folderId]: 'ERROR' },
        folderError: {
          ...state.folderError,
          [folderId]: error.message ?? '알 수 없는 오류가 발생했습니다.',
        },
      }))
    }
  },
}))
