import { useNavigate, useParams } from 'react-router-dom'
import DetailCard from '../components/Retrospect/RetrospectDetail/DetailCard'
import DetailHeader from '../components/Retrospect/RetrospectDetail/DetailHeader'
import type { Retrospect } from '../types/Retrospect'
import { useEffect, useState } from 'react'
import { detailRetrospect } from '@/services/retrospect'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { retrospectDetailItems } from '@/const/retrospectDetailItems'

function RetrospectiveDetail() {
  const { retroId } = useParams<{ retroId: string }>()
  const navigate = useNavigate()
  const [retrospect, setRetrospect] = useState<Retrospect | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!retroId) return

    const fetchDetail = async () => {
      try {
        const data = await detailRetrospect({ id: Number(retroId) })
        setRetrospect(data)
      } catch (error) {
        console.error('회고를 불러오지 못했습니다: ', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [retroId])

  const handleEdit = () => {
    navigate('/retrospects/new', { state: { initialData: retrospect } })
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!retrospect) {
    return (
      <div>
        <span>회고를 찾을 수 없습니다.</span>
      </div>
    )
  }

  return (
    <div className="inline-flex flex-col md:px-10 pb-8 justify-start items-start gap-5">
      <DetailHeader
        title={retrospect.title}
        reviewDate={retrospect.reviewDate}
        retroId={Number(retroId)}
        folderId={retrospect.folderId}
        folderName={retrospect.folderName!}
        onEdit={handleEdit}
      />
      <div className="inline-flex flex-col justify-start px-14 md:px-28 py-16 rounded-xl outline outline-offset-[-1px] outline-[var(--brand--blue--subtle)] gap-6">
        {retrospectDetailItems.map((q) => (
          <DetailCard
            key={q.key}
            question={q.label}
            answer={retrospect[q.key] ?? ''}
            icon={q.icon}
          />
        ))}
      </div>
    </div>
  )
}

export default RetrospectiveDetail
