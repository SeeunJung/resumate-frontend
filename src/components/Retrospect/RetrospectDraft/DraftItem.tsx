import type { DraftRetrospect } from '@/types/Retrospect'

interface DraftItemProps {
  draft: DraftRetrospect
  onLoad: (draft: DraftRetrospect) => void
}

function DraftItem({ draft, onLoad }: DraftItemProps) {
  return (
    <div
      className="flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-[var(--gray--light)]"
      onClick={() => onLoad(draft)}
    >
      <div className="flex items-center gap-4">
        <h4 className="justify-center text-md text-[var(--black)] font-medium leading-loose">
          {draft.title}
        </h4>
        <span className="text-xs text-gray-500">하위 태그</span>
      </div>
      <div className="flex">
        <span className="text-xs text-[var(--label--subtle)] font-normal">
          {draft.reviewDate}
        </span>
      </div>
    </div>
  )
}

export default DraftItem
