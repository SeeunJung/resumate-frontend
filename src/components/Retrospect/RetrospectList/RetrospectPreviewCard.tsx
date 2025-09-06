import { useNavigate, useParams } from 'react-router-dom'
import { Card } from '../../../styles/customStyles'
import type { Retrospect } from '../../../types/Retrospect'
import { truncateText } from '../../../utils/truncateText'

interface RetrospectCardProps {
  retrospect: Retrospect
}

function RetrospectivePreviewCard({ retrospect }: RetrospectCardProps) {
  const { folderId } = useParams<{ folderId: string }>()
  const navigate = useNavigate()
  const { positives, improvements, learnings, aspirations } = retrospect
  const available = positives || improvements || learnings || aspirations
  const previewText = truncateText(available, 50)

  return (
    <div
      className={Card(
        'p-6 flex flex-col justify-between h-full cursor-pointer',
      )}
      onClick={() => navigate(`/retrospectives/${folderId}/${retrospect.id}`)}
    >
      <div>
        <h3 className="text-lg font-bold whitespace-nowrap">
          {retrospect.title}
        </h3>
        {previewText && (
          <p className="text-sm text-[var(--gray--dark)]">{previewText}</p>
        )}
      </div>
      <div className="text-right text-xs text-[var(--gray--dark)] mt-auto">
        {retrospect.reviewDate} 작성
      </div>
    </div>
  )
}

export default RetrospectivePreviewCard
