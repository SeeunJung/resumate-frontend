import { useFolderColorStore } from '@/stores/useFolderColorStore'
import { Card } from '@/styles/customStyles'
import type { Analysis } from '@/types/Analysis'

interface AnalysisContentProps {
  analysis: Analysis | null
  folderId: number
}

function AnalysisContent({ analysis, folderId }: AnalysisContentProps) {
  if (!analysis)
    return (
      <div className="flex justify-center items-center">
        분석 결과가 존재하지 않습니다.
      </div>
    )
  const getColor = useFolderColorStore((state) => state.getColor)
  const color = getColor(folderId)

  return (
    <div className="flex justify-start items-start gap-4 mt-4">
      <section
        className={`flex flex-col min-w-80 ${color.bg} gap-6 p-6 rounded-xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.08)]`}
      >
        <span className="flex justify-start text-[var(--black)] text-lg font-extrabold">
          요약
        </span>
        <div className="flex flex-col self-stretch justify-start items-start gap-1">
          <span className="flex text-black text-md font-bold leading-loose">
            경험 요약
          </span>
          <div className="flex self-stretch justify-start text-black text-sm leading-relaxed">
            {analysis.summary}
          </div>
        </div>
        <div>
          <span className="flex text-black text-md font-bold leading-loose">
            강점 TOP 3
          </span>
          <div className="flex self-stretch justify-start text-black text-sm leading-relaxed">
            {analysis.keyword}
          </div>
        </div>
        <div>
          <span className="flex text-black text-md font-bold leading-loose">
            추천 항목
          </span>
          <div className="flex self-stretch justify-start text-black text-sm leading-relaxed">
            {analysis.recKeyword}
          </div>
        </div>
      </section>

      <div className="flex flex-col justify-start gap-5">
        <section className={Card('p-6')}>
          <span className="flex text-black text-md font-bold leading-loose">
            사용자의 경험에서 드러나는 강점과 역량
          </span>
          <div className="flex self-stretch justify-start text-black text-sm leading-relaxed">
            {analysis.strength}
          </div>
        </section>

        <section className={Card('p-6')}>
          <span className="flex text-black text-md font-bold leading-loose">
            어떤 자소서 항목에 활용하면 좋은지 추천
          </span>
          <div className="flex self-stretch justify-start text-black text-sm leading-relaxed">
            {analysis.suggestion}
          </div>
        </section>
      </div>
    </div>
  )
}

export default AnalysisContent
