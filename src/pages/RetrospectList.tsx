import { useParams } from 'react-router-dom'
import RetrospectiveHeader from '../components/Retrospect/RetrospectHeader'
import RetrospectiveWrapper from '../components/Retrospect/RetrospectList/RetrospectWrapper'
import { themeColors } from '../const/themeColors'
import { useEffect, useState } from 'react'
import type { Folder } from '@/types/Folder'
import { getFolder } from '@/services/folder'
import LoadingSpinner from '@/components/common/LoadingSpinner'

function RetrospectiveList() {
  const { folderId } = useParams<{ folderId: string }>()
  const [subFolders, setSubFolders] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)
  const rootFolderId = Number(folderId)

  useEffect(() => {
    const fetchFolders = async () => {
      if (!folderId) return
      try {
        const data = await getFolder(rootFolderId, true)
        setSubFolders(data)
      } catch (error) {
        console.error('폴더를 불러오지 못했습니다: ', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFolders()
  }, [rootFolderId])

  if (loading) {
    return <LoadingSpinner />
  }

  if (!folderId) {
    return <div>잘못된 폴더 ID입니다.</div>
  }

  const parentName = subFolders[0]?.parentName ?? ''

  return (
    <div className="flex flex-col gap-6">
      <RetrospectiveHeader folderName={parentName} />
      <div className="flex flex-wrap gap-x-4 gap-y-6">
        {subFolders.map((folder, idx) => (
          <div
            key={folder.id}
            className="flex-shrink-0 basis-[280px] max-w-[400px] w-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(25%-1rem)]"
          >
            <RetrospectiveWrapper
              folder={folder}
              color={themeColors[idx % themeColors.length]}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RetrospectiveList
