import AnalysisList from '@/components/Material/AnalysisList'
import { useAnalysisStore } from '@/stores/useAnalysisStore'
import { mainTitle } from '@/styles/customStyles'
import { useEffect } from 'react'

function RetrospectMaterialList() {
  const { analysisList, fetchAnalysisList } = useAnalysisStore()

  useEffect(() => {
    fetchAnalysisList()
  }, [])

  if (!analysisList.length) {
    return (
      <div className="flex justify-center items-center">
        <span className="text-md text-black text-bold">
          분석 데이터가 존재하지 않습니다.
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col py-16">
      <h2 className={mainTitle()}>소재 보관함</h2>
      <AnalysisList analyses={analysisList} />
    </div>
  )
}

export default RetrospectMaterialList
