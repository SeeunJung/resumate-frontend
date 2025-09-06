import { getFolder } from '@/services/folder'
import type { Folder } from '@/types/Folder'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface BreadcrumbProps {
  id: number | null
  name: string
  path: string
}

function Breadcrumb() {
  const { id } = useParams<{ id: string }>()
  const currentFolderId = id ? Number(id) : null

  const [folders, setFolders] = useState<Folder[]>([])

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const data = await getFolder()
        setFolders(data)
      } catch (error) {
        console.error('폴더를 불러오지 못했습니다: ', error)
      }
    }
    fetchFolders()
  }, [])

  const buildBreadcrumbPath = (folderId: number | null): BreadcrumbProps[] => {
    if (!folderId) return []
    const currentFolder = folders.find((f) => f.id === folderId)
    if (!currentFolder) return []
    const breadcrumbs: BreadcrumbProps[] = []

    breadcrumbs.unshift({
      id: currentFolder.id ?? null,
      name: currentFolder.name ?? '이름 없음',
      path: `/retrospectives/${currentFolder.id ?? 1}`,
    })

    if (currentFolder.parentId) {
      const parentBreadcrumbs = buildBreadcrumbPath(currentFolder.parentId)
      breadcrumbs.unshift(...parentBreadcrumbs)
    }
    return breadcrumbs
  }

  const breadcrumbs = buildBreadcrumbPath(currentFolderId)
  const fullBreadcrumbs: BreadcrumbProps[] = [
    { id: null, name: '홈', path: '/' },
    ...breadcrumbs,
  ]

  return (
    <div className="py-2">
      <div className="text-[var(--label--subtle)] text-xs font-normal flex gap-2">
        {fullBreadcrumbs.map((breadcrumb, index) => (
          <span key={breadcrumb.id?.toString() || 'home'}>
            <span>{breadcrumb.name}</span>
            {index < fullBreadcrumbs.length - 1 && (
              <span className="mx-2">{'>'}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Breadcrumb
