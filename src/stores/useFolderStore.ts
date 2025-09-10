import { deleteFolder, getFolder, modifyFolderName } from '@/services/folder'
import type { Folder } from '@/types/Folder'
import { create } from 'zustand'

interface FolderStore {
  folders: Folder[]
  parentFolders: Folder[]
  subFolders: Folder[]
  loading: boolean
  fetchFolders: () => Promise<void>
  fetchParentFolders: () => Promise<void>
  fetchSubFolders: (parentId: number) => Promise<void>
  renameFolder: (id: number, newName: string) => Promise<void>
  removeFolder: (id: number) => Promise<void>

  getParentFolderBySubfolderId: (subfolderId: number) => Folder | undefined
}

export const useFolderStore = create<FolderStore>((set, get) => ({
  folders: [],
  parentFolders: [],
  subFolders: [],
  loading: false,

  fetchFolders: async () => {
    set({ loading: true })
    try {
      const data = await getFolder()
      set({ folders: data })
    } catch (error) {
      console.error('폴더 불러오기 실패: ', error)
    } finally {
      set({ loading: false })
    }
  },

  fetchParentFolders: async () => {
    set({ loading: true })
    try {
      const data = await getFolder(undefined, false)
      set({ parentFolders: data })
    } catch (error) {
      console.error('폴더 불러오기 실패: ', error)
    } finally {
      set({ loading: false })
    }
  },

  fetchSubFolders: async (parentId) => {
    set({ loading: true })
    try {
      const data = await getFolder(parentId)
      set({ subFolders: data })
    } catch (error) {
      console.error('하위 폴더 불러오기 실패: ', error)
    } finally {
      set({ loading: false })
    }
  },

  renameFolder: async (id, newName) => {
    try {
      await modifyFolderName(id, newName)
      set({
        folders: get().folders.map((folder) =>
          folder.id === id ? { ...folder, name: newName } : folder,
        ),
      })
    } catch (error) {
      console.error('폴더 이름 수정 실패: ', error)
    }
  },

  removeFolder: async (id: number) => {
    try {
      await deleteFolder(id)
      set({
        folders: get().folders.filter((folder) => folder.id !== id),
      })
    } catch (error) {
      console.error('폴더 삭제 실패: ', error)
    }
  },

  getParentFolderBySubfolderId: (subfolderId: number) => {
    const subFolder = get().subFolders.find((f) => f.id === subfolderId)
    if (!subFolder?.parentId) return undefined
    return get().parentFolders.find((f) => f.id === subFolder.parentId)
  },
}))
