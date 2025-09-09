import { create } from 'zustand'

interface RetrospectEntryState {
  filled: Record<string, boolean>
  setFilled: (key: string, value: boolean) => void
}

export const useEntryStore = create<RetrospectEntryState>((set) => ({
  filled: {
    positives: false,
    improvements: false,
    learnings: false,
    aspirations: false,
  },
  setFilled: (key, value) =>
    set((state) => ({
      filled: { ...state.filled, [key]: value },
    })),
}))
