import { useEffect, useState } from 'react'
import type { Folder } from '../../types/Folder'
import FolderTree from './FolderTree'
import { getFolder } from '@/services/folder'
import LoadingSpinner from '../common/LoadingSpinner'

function FolderSection() {
  const [folders, setFolders] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const data = await getFolder()
        setFolders(data)
      } catch (error) {
        console.error('폴더 불러오기 실패: ', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFolders()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="flex flex-col gap-2 px-2">
      <div className="flex items-center justify-between">
        <span className="text-md font-medium">전체 폴더</span>
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
      </div>
      <FolderTree folders={folders} />
    </div>
  )
}

export default FolderSection
