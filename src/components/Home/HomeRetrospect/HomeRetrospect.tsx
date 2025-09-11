import LoadingSpinner from '@/components/common/LoadingSpinner'
import { viewRetrospectList } from '@/services/retrospect'
import { Card } from '@/styles/customStyles'
import type { Retrospect } from '@/types/Retrospect'
import { useEffect, useState } from 'react'
import HomeRetrospectItem from './HomeRetrospectIem'

function HomeRetrospect() {
  const [retrospects, setRetrospects] = useState<Retrospect[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRetrospects = async () => {
      try {
        const data = await viewRetrospectList()
        const latestFive = data.reviews.slice(0, 5)
        setRetrospects(latestFive)
      } catch (error) {
        console.error('회고 목록 불러오기 실패: ', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRetrospects()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (retrospects.length === 0) {
    return (
      <div className={Card('flex', 'flex-col', 'p-6', 'min-w-60', 'mt-4')}>
        <span className="text-xs text-[var(--brand--black--default)]">
          최근 회고가 없습니다.
        </span>
      </div>
    )
  }

  return (
    <div className={Card('flex', 'flex-col', 'gap-2', 'px-2', 'py-4')}>
      <span className="text-lg font-bold p-2">최근 작성한 회고</span>
      {retrospects.map((retrospect) => (
        <HomeRetrospectItem
          key={retrospect.id}
          retrospect={retrospect}
        />
      ))}
    </div>
  )
}

export default HomeRetrospect
