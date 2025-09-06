import { useEffect, useState } from 'react'
import RetrospectivePreviewCard from './RetrospectPreviewCard'
import type { Retrospect } from '@/types/Retrospect'
import { viewFolderRetrospectList } from '@/services/retrospect'
import LoadingSpinner from '@/components/common/LoadingSpinner'

interface PreviewCardGridProps {
  folderId: number
}

function PreviewCardGrid({ folderId }: PreviewCardGridProps) {
  const [retrospects, setRetrospects] = useState<Retrospect[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRetrospects = async () => {
      try {
        const data = await viewFolderRetrospectList({
          folder: folderId,
        })
        setRetrospects(data.reviews)
      } catch (error) {
        console.error('회고를 불러오지 못했습니다: ', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRetrospects()
  }, [folderId])

  if (loading) {
    return <LoadingSpinner />
  }

  if (retrospects.length === 0) {
    return (
      <div>
        <span>회고가 존재하지 않습니다.</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {retrospects.map((retrospect) => (
        <RetrospectivePreviewCard
          key={retrospect.id}
          retrospect={retrospect}
        />
      ))}
    </div>
  )
}

export default PreviewCardGrid
