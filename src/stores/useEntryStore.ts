import { create } from 'zustand'

type SectionKey = 'info' | 'situation' | 'task' | 'action' | 'result'

interface RetrospectEntryState {
  filled: { [key: string]: boolean }
  setFilled: (key: SectionKey, value: boolean) => void
}

export const useEntryStore = create<RetrospectEntryState>((set) => ({
  filled: {
    info: false,
    situation: false,
    task: false,
    action: false,
    result: false,
  },
  setFilled: (key, value) =>
    set((state) => ({
      filled: { ...state.filled, [key]: value },
    })),
}))
