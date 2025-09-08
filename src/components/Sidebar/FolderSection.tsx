import { useEffect } from 'react'
import FolderTree from './FolderTree'
import LoadingSpinner from '../common/LoadingSpinner'
import { useFolderStore } from '@/stores/useFolderStore'
import AddFolderModal from '../common/Modal'

function FolderSection() {
  const { folders, loading, fetchFolders } = useFolderStore()

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="flex items-center justify-between">
        <span className="text-md font-medium">전체 폴더</span>
        <AddFolderModal
          trigger={
            <button className="flex w-5 h-5 items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"
                  fill="#3E3E3E"
                />
              </svg>
            </button>
          }
        />
      </div>
      <FolderTree folders={folders} />
    </div>
  )
}

export default FolderSection
