import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import type { Folder } from '@/types/Folder'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { useState } from 'react'
import Button from './Button'
import { useFolderStore } from '@/stores/useFolderStore'
import { deleteFolder, modifyFolderName } from '@/services/folder'
import { cn } from '@/lib/utils'

export function FolderDropDown({ node }: { node: Folder }) {
  const [newName, setNewName] = useState('')
  const { fetchFolders } = useFolderStore()

  const handleRename = async () => {
    try {
      await modifyFolderName(node.id!, newName)
      await fetchFolders()
    } catch (error) {
      console.error('폴더 이름 변경 실패:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteFolder(node.id!)
      await fetchFolders()
    } catch (error) {
      console.error('폴더 삭제 실패: ', error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-5 h-5 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5.40039 10.6001C6.17341 10.6003 6.7998 11.2274 6.7998 12.0005C6.79959 12.7734 6.17328 13.3997 5.40039 13.3999C4.62732 13.3999 4.00021 12.7735 4 12.0005C4 11.2273 4.62719 10.6001 5.40039 10.6001Z"
              fill="#3E3E3E"
            />
            <path
              d="M12.002 10.6001C12.775 10.6003 13.4014 11.2274 13.4014 12.0005C13.4012 12.7734 12.7748 13.3997 12.002 13.3999C11.2289 13.3999 10.6018 12.7735 10.6016 12.0005C10.6016 11.2273 11.2288 10.6001 12.002 10.6001Z"
              fill="#3E3E3E"
            />
            <path
              d="M18.5996 10.6001C19.3726 10.6003 19.999 11.2274 19.999 12.0005C19.9988 12.7734 19.3725 13.3997 18.5996 13.3999C17.8265 13.3999 17.1994 12.7735 17.1992 12.0005C17.1992 11.2273 17.8264 10.6001 18.5996 10.6001Z"
              fill="#3E3E3E"
            />
          </svg>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white">
        {/* 이름 변경 모달 */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              이름 변경하기
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="bg-white w-[300px]">
            <DialogHeader>
              <DialogTitle>폴더 이름 변경</DialogTitle>
            </DialogHeader>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={node.name}
              className={cn(
                'flex',
                'justify-between',
                'w-full',
                'items-center',
                'text-black',
                'text-sm',
                'font-normal',
                'px-3',
                'py-2',
                'bg-white',
                'rounded-md',
                'border',
                'border-[var(--gray)]',
              )}
            />
            <DialogFooter>
              <Button
                variant={'black'}
                size={'lg'}
                onClick={handleRename}
              >
                수정하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DropdownMenuSeparator />

        {/* 폴더 삭제 모달 */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="text-[var(--red--strong)]"
              onSelect={(e) => e.preventDefault()}
            >
              삭제하기
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="bg-white w-[300px]">
            <DialogHeader>
              <DialogTitle>폴더를 삭제하시겠습니까?</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant={'redLine'}
                size={'lg'}
                onClick={handleDelete}
              >
                삭제하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
