import LoadingSpinner from '@/components/common/LoadingSpinner'
import { viewRetrospectList } from '@/services/retrospect'
import type { DraftRetrospect } from '@/types/Retrospect'
import { useEffect, useState } from 'react'
import DraftItem from './DraftItem'
import { Card } from '@/styles/customStyles'
import { useFormContext } from 'react-hook-form'

interface DraftModalProps {
  isOpen: boolean
  onClose: () => void
}

function DraftModal({ isOpen, onClose }: DraftModalProps) {
  const [drafts, setDrafts] = useState<DraftRetrospect[]>([])
  const [loading, setLoading] = useState(false)
  const { reset } = useFormContext()

  useEffect(() => {
    if (!isOpen) return
    const fetchDrafts = async () => {
      setLoading(true)
      try {
        const res = await viewRetrospectList({
          sort: 'REVIEW_DATE_DESC',
          isCompleted: false,
          isDeleted: false,
        })
        setDrafts(res.reviews)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchDrafts()
  }, [isOpen])

  const handleLoadDraft = (draft: DraftRetrospect) => {
    reset({
      folderId: draft.folderId ?? 0,
      title: draft.title ?? '',
      reviewDate: draft.reviewDate ?? '',
      positives: draft.positives ?? '',
      improvements: draft.improvements ?? '',
      learnings: draft.learnings ?? '',
      aspirations: draft.aspirations ?? '',
      isCompleted: draft.isCompleted ?? false,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="absolute inset-0 bg-white/5 backdrop-blur-xs" />
      <div
        className={Card(
          'relative',
          'flex',
          'flex-col',
          'justify-start',
          'gap-1',
          'w-[600px]',
          'max-h-[80vh]',
          'bg-white',
          'px-4',
          'py-5',
          'shadow-[0px_0px_6px_0px_rgba(0,0,0,0.08)]',
          'outline',
          'outline-offset-[-1px]',
          'outline-[var(--brand--black--default)]',
        )}
      >
        <div className="flex justify-end">
          <button
            className="w-5 h-5 cursor-pointer"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M17.293 5.29314C17.6835 4.90261 18.3166 4.90261 18.7071 5.29314C19.0975 5.68367 19.0976 6.3167 18.7071 6.7072L13.4141 12.0002L18.7071 17.2931C19.0975 17.6837 19.0976 18.3167 18.7071 18.7072C18.3166 19.0977 17.6835 19.0976 17.293 18.7072L12 13.4142L6.70708 18.7072C6.31658 19.0977 5.68355 19.0976 5.29302 18.7072C4.90249 18.3167 4.90249 17.6837 5.29302 17.2931L10.586 12.0002L5.29302 6.7072C4.90249 6.31668 4.90249 5.68366 5.29302 5.29314C5.68354 4.90261 6.31655 4.90261 6.70708 5.29314L12 10.5861L17.293 5.29314Z"
                fill="#555555"
              />
            </svg>
          </button>
        </div>

        <header className="flex flex-col self-stretch px-3 py-6 gap-3">
          <div className="flex justify-between items-end">
            <h3 className="justify-center text-black text-xl font-bold">
              임시저장 글 불러오기
            </h3>
            <div className="flex gap-1">
              <span className="justify-start text-xs font-medium text-[var(--brand--black--default)]">
                총
              </span>
              <span className="justify-start text-xs font-medium text-[var(--brand--blue--strong)]">
                {drafts.length}
              </span>
              <span className="justify-start text-xs font-medium text-[var(--brand--black--default)]">
                개
              </span>
            </div>
          </div>
          <div className="self-stretch h-px relative">
            <div className="w-full h-px left-0 top-0 absolute bg-[var(--gray)]" />
          </div>
        </header>

        <div className="flex flex-col justify-start flex-1 gap-2 overflow-y-scroll">
          {loading && <LoadingSpinner />}
          {!loading && drafts.length === 0 && <p>임시저장 글이 없습니다.</p>}
          {drafts.map((draft) => (
            <DraftItem
              key={draft.id}
              draft={draft}
              onLoad={handleLoadDraft}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default DraftModal
