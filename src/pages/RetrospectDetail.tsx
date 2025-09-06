import { useParams } from 'react-router-dom'
import DetailCard from '../components/Retrospect/RetrospectDetail/DetailCard'
import DetailHeader from '../components/Retrospect/RetrospectDetail/DetailHeader'
import type { Retrospect } from '../types/Retrospect'
import { useEffect, useState } from 'react'
import { detailRetrospect } from '@/services/retrospect'
import LoadingSpinner from '@/components/common/LoadingSpinner'

function RetrospectiveDetail() {
  const { retroId } = useParams<{ retroId: string }>()
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

  const questions: {
    key: keyof Pick<
      Retrospect,
      'positives' | 'improvements' | 'learnings' | 'aspirations'
    >
    label: string
  }[] = [
    {
      key: 'positives',
      label:
        '1. 좋았던 점 (Good / Liked): 오늘 하루 잘된 점, 성과, 만족스러웠던 부분',
    },
    {
      key: 'improvements',
      label:
        '2. 개선할 점 (Bad / Lacked): 아쉬웠던 점, 부족하거나 방해가 되었던 요소',
    },
    {
      key: 'learnings',
      label: '3. 배운 점 (Learned): 오늘 새롭게 배운 지식, 인사이트',
    },
    {
      key: 'aspirations',
      label:
        '4. 원했던 점 (Longed for / Better): 더 있었으면 좋았을 부분, 내일 시도하고 싶은 변화',
    },
  ]
  return (
    <div className="inline-flex flex-col pb-8 justify-start items-start gap-6">
      <DetailHeader
        reviewDate={retrospect.reviewDate}
        createdDate={retrospect.reviewDate}
      />
      <div className="inline-flex flex-col justify-start gap-3">
        {questions.map((q) => (
          <DetailCard
            key={q.key}
            question={q.label}
            answer={retrospect[q.key] ?? ''}
          />
        ))}
      </div>
    </div>
  )
}

export default RetrospectiveDetail
