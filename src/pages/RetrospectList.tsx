import { useParams } from 'react-router-dom'
import RetrospectiveHeader from '../components/Retrospect/RetrospectHeader'
import RetrospectiveWrapper from '../components/Retrospect/RetrospectList/RetrospectWrapper'
import { useEffect, useMemo, useState } from 'react'
import type { Folder } from '@/types/Folder'
import { getFolder } from '@/services/folder'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { requestAnalysis } from '@/services/analysis'
import { useFolderColorStore } from '@/stores/useFolderColorStore'

function RetrospectiveList() {
  const { folderId } = useParams<{ folderId: string }>()
  const [subFolders, setSubFolders] = useState<Folder[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFolders, setSelectedFolders] = useState<number[]>([])
  const rootFolderId = Number(folderId)
  const assignColor = useFolderColorStore((state) => state.assignColor)
  const getColor = useFolderColorStore((state) => state.getColor)

  useEffect(() => {
    const fetchFolders = async () => {
      if (!folderId) return
      try {
        const data = await getFolder(rootFolderId, true)
        setSubFolders(data)
        data.forEach((folder, idx) => {
          assignColor(folder.id!, idx)
        })
      } catch (error) {
        console.error('폴더를 불러오지 못했습니다: ', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFolders()
  }, [rootFolderId])

  const allSubFolderIds = useMemo(
    () =>
      subFolders
        ?.map((folder) => folder.id)
        .filter((id): id is number => typeof id === 'number'),
    [subFolders],
  )
  const isAllSelected = useMemo(
    () =>
      allSubFolderIds.length > 0 &&
      allSubFolderIds.every((id) => selectedFolders.includes(id)),
    [allSubFolderIds, selectedFolders],
  )

  const toggleFolderSelection = (folderId: number) => {
    setSelectedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId],
    )
  }

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedFolders([])
    } else {
      setSelectedFolders(allSubFolderIds)
    }
  }

  const handleAnalysisClick = async () => {
    if (selectedFolders.length === 0) return alert('폴더를 선택해주세요.')
    try {
      const data = await requestAnalysis(selectedFolders)
      console.log(data)
    } catch (error) {
      console.error('분석 요청 실패: ', error)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!folderId) {
    return <div>잘못된 폴더 ID입니다.</div>
  }

  const parentName = subFolders[0]?.parentName ?? ''

  return (
    <div className="flex flex-col gap-6">
      <RetrospectiveHeader
        folderName={parentName}
        onAnalysisClick={handleAnalysisClick}
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={isAllSelected}
            onChange={toggleSelectAll}
          />
          <span className="text-sm text-[var(--black)]">전체 선택</span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-6">
          {subFolders.map((folder) => (
            <div
              key={folder.id}
              className="flex-shrink-0 basis-[280px] max-w-[400px] w-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(25%-1rem)]"
            >
              <RetrospectiveWrapper
                folder={folder}
                color={getColor(folder.id!)}
                selectedFolders={selectedFolders}
                toggleFolderSelection={toggleFolderSelection}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RetrospectiveList
