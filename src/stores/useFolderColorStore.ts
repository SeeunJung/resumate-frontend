import { themeColors } from '@/const/themeColors'
import { create } from 'zustand'

interface FolderColorState {
  colorMap: Record<number, number>
  assignColor: (folderId: number, idx: number) => void
  getColor: (folderId: number) => { bg: string; text: string; border: string }
}

export const useFolderColorStore = create<FolderColorState>((set, get) => ({
  colorMap: {},
  assignColor: (folderId, idx) =>
    set((state) => ({
      colorMap: {
        ...state.colorMap,
        [folderId]: idx % themeColors.length,
      },
    })),
  getColor: (folderId) => {
    const idx = get().colorMap[folderId]
    return idx !== undefined ? themeColors[idx] : themeColors[0]
  },
}))
