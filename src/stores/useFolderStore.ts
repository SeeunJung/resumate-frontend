import { deleteFolder, getFolder, modifyFolderName } from '@/services/folder'
import type { Folder } from '@/types/Folder'
import { create } from 'zustand'

interface FolderStore {
  folders: Folder[]
  loading: boolean
  fetchFolders: () => Promise<void>
  renameFolder: (id: number, newName: string) => Promise<void>
  removeFolder: (id: number) => Promise<void>
}

export const useFolderStore = create<FolderStore>((set, get) => ({
  folders: [],
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
}))
