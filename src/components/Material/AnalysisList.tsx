import type { Analysis } from '@/types/Analysis'
import AnalysisListItem from './AnalysisListItem'
import { Card } from '@/styles/customStyles'

interface AnalysisListProps {
  analyses: Analysis[]
}

function AnalysisList({ analyses }: AnalysisListProps) {
  return (
    <div className={Card('p-4')}>
      {analyses?.map((analysis) => (
        <AnalysisListItem
          key={analysis.id}
          analysis={analysis}
        />
      ))}
    </div>
  )
}

export default AnalysisList
