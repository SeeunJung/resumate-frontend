import { addFolder } from '@/services/folder'
import { useFolderStore } from '@/stores/useFolderStore'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import Button from './Button'

interface AddFolderModalProps {
  parentId?: null | number
  trigger?: React.ReactNode
}
export function AddFolderModal({
  parentId = null,
  trigger,
}: AddFolderModalProps) {
  const [folderName, setFolderName] = useState('')
  const [loading, setLoading] = useState(false)
  const { fetchFolders } = useFolderStore()

  const handleAdd = async () => {
    if (!folderName.trim()) return
    setLoading(true)
    try {
      await addFolder({ parentId, name: folderName, order: 0 })
      setFolderName('')
      await fetchFolders()
    } catch (error) {
      console.error('폴더 추가 실패: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex flex-col bg-white w-[300px] gap-4">
        <DialogHeader>
          <DialogTitle className="flex justify-start">새 폴더 추가</DialogTitle>
        </DialogHeader>

        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="폴더 이름"
          className="flex justify-between w-full items-center text-black text-sm font-normal px-3 py-2 bg-white rounded-md border border-[var(--gray)]"
        />
        <DialogFooter>
          <Button
            variant={'black'}
            onClick={handleAdd}
            disabled={loading}
            size={'lg'}
            className="flex w-fit ml-auto"
          >
            추가하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddFolderModal
