import LoadingSpinner from '@/components/common/LoadingSpinner'
import Tag from '@/components/common/Tag'
import AnalysisContent from '@/components/Material/AnalysisContent'
import AnalysisHeader from '@/components/Material/AnalysisHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getFolder } from '@/services/folder'
import { useAnalysisStore } from '@/stores/useAnalysisStore'
import { useFolderStore } from '@/stores/useFolderStore'
import type { Folder } from '@/types/Folder'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function RetrospectMaterial() {
  const { parentId } = useParams<{ parentId: string }>()
  const [subFolders, setSubFolders] = useState<Folder[]>([])
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null)
  const { folderAnalysis, fetchAnalysis, folderStatus } = useAnalysisStore()
  const parentFolders = useFolderStore((state) => state.parentFolders)
  const fetchParentFolders = useFolderStore((state) => state.fetchParentFolders)

  useEffect(() => {
    if (parentFolders.length === 0) fetchParentFolders()
  }, [parentFolders.length])

  const parentFolder = parentFolders.find((f) => f.id === Number(parentId))

  useEffect(() => {
    if (!parentId) return
    getFolder(Number(parentId), true).then((folders) => {
      setSubFolders(folders)
      if (folders.length > 0) setSelectedFolderId(folders[0].id!)
    })
  }, [parentId])

  useEffect(() => {
    if (selectedFolderId != null) {
      fetchAnalysis(selectedFolderId)
    }
  }, [selectedFolderId])

  return (
    <div className="flex flex-col justify-start items-start gap-4 py-10">
      <AnalysisHeader
        folderName={parentFolder?.name || '이름을 불러올 수 없습니다.'}
      />
      <Tabs
        value={selectedFolderId?.toString()}
        onValueChange={(val) => setSelectedFolderId(Number(val))}
      >
        <TabsList className="flex flex-wrap gap-2">
          {subFolders?.map((folder) => (
            <TabsTrigger
              key={folder.id}
              value={folder.id!.toString()}
              className="border-none p-0 shadow-none"
            >
              <Tag
                folderName={folder.name!}
                folderId={folder.id!}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {subFolders?.map((folder) => (
          <TabsContent
            key={folder.id}
            value={folder.id!.toString()}
          >
            {folderStatus[folder.id!] === 'PENDING' ? (
              <div className="flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : folderAnalysis[folder.id!] ? (
              <div className="flex flex-col gap-4">
                <AnalysisContent
                  analysis={folderAnalysis[folder.id!]}
                  folderId={folder.id!}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center text-md text-semibold">
                분석 결과가 존재하지 않습니다.
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default RetrospectMaterial
