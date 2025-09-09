import type { Retrospect } from '@/types/Retrospect'
import axiosInstance from '@/utils/axiosInstance'

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

export const createRetrospect = async (payload: Retrospect) => {
  const res = await axiosInstance.post('/review', payload)
  return res.data.result
}

export const editRetrospect = async (id: number, payload: Retrospect) => {
  const res = await axiosInstance.put(`/review/${id}`, payload)
  return res.data.result
}

export const deleteRetrospect = async (id: number) => {
  const res = await axiosInstance.delete(`/review/${id}`)
  return res.data
}

export const permanentDeleteRetrospect = async (
  payload: Pick<Retrospect, 'id'>,
) => {
  const res = await axiosInstance.delete(`/review/${payload.id}/permanent`)
  return res.data
}

export const restoreRetrospect = async (
  payload: Pick<Retrospect, 'id' | 'folderId'>,
) => {
  const res = await axiosInstance.patch(
    `/review/${payload.id}/restore?folderId=${payload.folderId}`,
  )
  return res.data
}

export const detailRetrospect = async (payload: Pick<Retrospect, 'id'>) => {
  const res = await axiosInstance.get(`/review/${payload.id}`)
  return res.data.result
}

export const viewRetrospectList = async (params?: GetRetrospectListParams) => {
  const res = await axiosInstance.get('/review', { params })
  return res.data.result
}

export const viewFolderRetrospectList = async (
  params?: GetFolderRetrospectListParams,
) => {
  const res = await axiosInstance.get('/review', { params })
  return res.data.result
}
