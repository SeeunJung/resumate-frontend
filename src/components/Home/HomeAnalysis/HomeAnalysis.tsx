import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useAnalysisStore } from '@/stores/useAnalysisStore'
import { Card } from '@/styles/customStyles'
import { useEffect, useMemo } from 'react'

function HomeAnalysis() {
  const {
    analysisList,
    listStatus,
    fetchAnalysisList,
    fetchAnalysis,
    folderAnalysis,
    folderStatus,
  } = useAnalysisStore()

  useEffect(() => {
    if (listStatus === 'IDLE') {
      fetchAnalysisList()
    }
  }, [listStatus, fetchAnalysisList])

  const latestAnalysis = useMemo(() => {
    if (analysisList.length === 0) return null
    return analysisList.reduce((latest, current) =>
      new Date(current.completedAt) > new Date(latest.completedAt)
        ? current
        : latest,
    )
  }, [analysisList])

  useEffect(() => {
    if (latestAnalysis && latestAnalysis.status === 'SUCCESS') {
      fetchAnalysis(latestAnalysis.folderId)
    }
  }, [latestAnalysis])

  if (listStatus === 'PENDING') {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
      </div>
    )
  }

  if (!latestAnalysis) {
    return (
      <div className="flex justify-center items-center">
        <span>아직 분석 결과가 없습니다.</span>
      </div>
    )
  }

  const analysisDetail = folderAnalysis[latestAnalysis.folderId]
  const analysisDetailStatus = folderStatus[latestAnalysis.folderId]

  if (analysisDetailStatus === 'PENDING') {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
      </div>
    )
  }

  if (!analysisDetail) {
    return (
      <div className="flex justify-center items-center">
        <span>분석 상세 정보를 불러올 수 없습니다.</span>
      </div>
    )
  }

  return (
    <div className={Card('flex', 'flex-col', 'p-6', 'min-w-60', 'gap-6')}>
      <div className="flex flex-col justify-start items-start gap-4">
        <span className="flex justify-start text-[var(--black)] text-lg font-extrabold">
          요약
        </span>

        <div className="flex flex-col self-stretch justify-start items-start gap-1">
          <span className="flex text-black text-md font-bold leading-loose">
            경험 요약
          </span>
          <div className="flex self-stretch justify-start text-black text-sm leading-relaxed">
            {analysisDetail.summary || '요약 정보가 없습니다'}
          </div>
        </div>

        <div>
          <span className="flex text-black text-md font-bold leading-loose">
            강점 TOP 3
          </span>
          <div className="flex self-stretch justify-start text-black text-sm leading-relaxed">
            {analysisDetail.keyword || '강점 정보가 없습니다.'}
          </div>
        </div>

        <div>
          <span className="flex text-black text-md font-bold leading-loose">
            추천 항목
          </span>
          <div className="flex self-stretch justify-start text-black text-sm leading-relaxed">
            {analysisDetail.recKeyword || '추천 항목 정보가 없습니다.'}
          </div>
        </div>
      </div>
      <span className="flex justify-end text-black text-xs leading-relaxed cursor-pointer hover:underline">
        자세히 보러 가기 →
      </span>
    </div>
  )
}

export default HomeAnalysis
