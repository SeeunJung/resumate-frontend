import type { Retrospect } from '@/types/Retrospect'
import {
  createRetrospect,
  deleteRetrospect,
  detailRetrospect,
  editRetrospect,
  permanentDeleteRetrospect,
  restoreRetrospect,
  viewFolderRetrospectList,
  viewRetrospectList,
} from './../services/retrospect'
import { create } from 'zustand'

interface GetRetrospectListParams {
  page?: number
  size?: number
  sort?: string
  isCompleted?: boolean
  isDeleted?: boolean
}

interface GetFolderRetrospectListParams {
  folderId?: number
  page?: number
  size?: number
  sort?: string
  isCompleted?: boolean
  isDeleted?: boolean
}

interface RetrospectState {
  retrospects: Retrospect[]
  folderRetrospects: Retrospect[]
  selectedRetrospect: Retrospect | null

  fetchRetrospectList: (params?: GetRetrospectListParams) => Promise<void>
  fetchFolderRetrospectList: (
    params?: GetFolderRetrospectListParams,
  ) => Promise<void>
  fetchRetrospect: (id: number) => Promise<void>
  addRetrospect: (payload: Retrospect) => Promise<void>
  updateRetrospect: (id: number, payload: Retrospect) => Promise<void>
  removeRetrospect: (id: number) => Promise<void>
  removeRetrospectPermanent: (id: number) => Promise<void>
  restoreRetrospect: (
    payload: Pick<Retrospect, 'id' | 'folderId'>,
  ) => Promise<void>
}

export const useRetrospectStore = create<RetrospectState>((set, get) => ({
  retrospects: [],
  folderRetrospects: [],
  selectedRetrospect: null,

  fetchRetrospectList: async (params) => {
    try {
      const res = await viewRetrospectList(params)
      set({ retrospects: res.review })
    } catch (error: any) {
      console.error('회고 목록을 불러오지 못했습니다: ', error)
    }
  },

  fetchFolderRetrospectList: async (params) => {
    try {
      const res = await viewFolderRetrospectList(params)
      set({ folderRetrospects: res.reviews })
    } catch (error: any) {
      console.error('폴더 내 회고 목록을 불러오지 못했습니다: ', error)
    }
  },

  fetchRetrospect: async (id) => {
    try {
      const res = await detailRetrospect({ id })
      set({ selectedRetrospect: res })
    } catch (error: any) {
      console.error('회고를 불러오지 못했습니다: ', error)
    }
  },

  addRetrospect: async (payload) => {
    try {
      const res = await createRetrospect(payload)
      set({ retrospects: [...get().retrospects, res] })
    } catch (error: any) {
      console.error('회고를 추가하지 못했습니다: ', error)
    }
  },

  updateRetrospect: async (id, payload) => {
    try {
      const res = await editRetrospect(id, payload)
      set({
        retrospects: get().retrospects?.map((r) =>
          r.id === id ? { ...r, ...res } : r,
        ),
        selectedRetrospect:
          get().selectedRetrospect?.id === id
            ? { ...get().selectedRetrospect, ...res }
            : get().selectedRetrospect,
      })
    } catch (error: any) {
      console.error('회고를 수정하지 못했습니다: ', error)
    }
  },

  removeRetrospect: async (id) => {
    try {
      await deleteRetrospect(id)
      set({
        retrospects: get().retrospects?.filter((r) => r.id !== id),
      })
    } catch (error: any) {
      console.error('회고를 삭제하지 못했습니다: ', error)
    }
  },

  removeRetrospectPermanent: async (id) => {
    try {
      await permanentDeleteRetrospect({ id })
      set({ retrospects: get().retrospects.filter((r) => r.id !== id) })
    } catch (error: any) {
      console.error('회고를 영구 삭제하지 못했습니다: ', error)
    }
  },

  restoreRetrospect: async (payload) => {
    try {
      const res = await restoreRetrospect(payload)
      set({ retrospects: [...get().retrospects, res] })
    } catch (error: any) {
      console.error('회고를 복원하지 못했습니다: ', error)
    }
  },
}))
