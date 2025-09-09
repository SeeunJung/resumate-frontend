import type { Folder } from '@/types/Folder'
import axiosInstance from '@/utils/axiosInstance'

interface FolderResponse {
  message: string
  result?: Folder[]
}

export const getFolder = async (
  parentId?: number,
  children?: boolean,
): Promise<Folder[]> => {
  const res = await axiosInstance.get('/folder', {
    params: {
      ...(parentId ? { parentId } : {}),
      ...(children !== undefined ? { children } : {}),
    },
  })
  return res.data.result
}

export const addFolder = async (
  payload: Pick<Folder, 'parentId' | 'name' | 'order'>,
) => {
  const res = await axiosInstance.post('/folder', payload)
  return res.data
}

export const deleteFolder = async (id: number): Promise<FolderResponse> => {
  const res = await axiosInstance.delete(`/folder/${id}`)
  return res.data
}

export const modifyFolderName = async (
  id: number,
  payload: string,
): Promise<FolderResponse> => {
  const res = await axiosInstance.patch(`/folder/${id}`, payload)
  return res.data
}
