import type { Analysis } from '@/types/Analysis'
import { useNavigate } from 'react-router-dom'
import Tag from '../common/Tag'
import { Card } from '@/styles/customStyles'

interface AnalysisListItemProps {
  analysis: Analysis
}

function AnalysisListItem({ analysis }: AnalysisListItemProps) {
  const navigate = useNavigate()
  const [parentName, childName] = analysis.folderName.split('/')
  const date = analysis.completedAt ? analysis.completedAt.split('T')[0] : '-'

  const statusDesign: Record<Analysis['status'], string> = {
    SUCCESS:
      'flex justify-center items-center px-4 py-1 w-fit rounded-full leading-normal border-none text-xs font-semibold bg-[var(--brand--green--subtler)] text-[var(--status--success)]',
    PENDING:
      'flex justify-center items-center px-4 py-1 w-fit rounded-full leading-normal border-none text-xs font-semibold bg-[var(--brand--blue--subtler)] text-[var(--brand--blue)]',
    ERROR:
      'flex justify-center items-center px-4 py-1 w-fit rounded-full leading-normal border-none text-xs font-semibold bg-[var(--brand--red--light)] text-[var(--status--danger)]',
    IDLE: 'flex justify-center items-center px-4 py-1 w-fit rounded-full leading-normal border-none text-xs font-semibold bg-[var(--gray--subtle)] text-[var(--gray--dark)]',
  }

  return (
    <div
      className={Card(
        'grid',
        'grid-cols-4',
        'items-center',
        'p-4',
        'mb-2',
        'hover:bg-[var(--gray--light)]',
        'cursor-pointer',
      )}
      onClick={() => navigate(`/materials`)}
    >
      <span className="flex justify-start text-[var(--black)] text-sm font-medium leading-relaxed">
        {parentName || '대분류 없음'}
      </span>
      <div className="justify-start items-center">
        <Tag
          folderId={analysis.folderId}
          folderName={childName || '태그 없음'}
        />
      </div>
      <span className="flex justify-start text-[var(--black)] text-sm font-medium leading-relaxed">
        {date}
      </span>
      <div className="justify-start items-center">
        <span className={statusDesign[analysis.status]}>{analysis.status}</span>
      </div>
    </div>
  )
}

export default AnalysisListItem
