import axiosInstance from '@/utils/axiosInstance'

interface GetAnalysisListParams {
  page?: number
  size?: number
}

export const requestAnalysis = async (folders: number[]) => {
  const params = folders.map((id) => `folders=${id}`).join('&')
  const res = await axiosInstance.post(`/analysis?${params}`)
  return res.data
}

export const getAnalysis = async (folderId: number) => {
  const res = await axiosInstance.get(`/analysis/${folderId}`)
  return res.data.result
}

export const getAnalysisList = async (params?: GetAnalysisListParams) => {
  const res = await axiosInstance.get('/analysis', { params })
  return res.data.result
}
