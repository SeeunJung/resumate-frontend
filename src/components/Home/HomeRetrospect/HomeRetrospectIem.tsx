import Tag from '@/components/common/Tag'
import type { Retrospect } from '@/types/Retrospect'
import { useNavigate } from 'react-router-dom'

interface HomeRetrospectItemProps {
  retrospect: Retrospect
}

function HomeRetrospectItem({ retrospect }: HomeRetrospectItemProps) {
  const navigate = useNavigate()

  return (
    <div
      className="flex justify-between px-2 py-1 rounded-md items-center hover:bg-[var(--gray--light)] cursor-pointer"
      onClick={() =>
        navigate(`/retrospects/${retrospect.folderId}/${retrospect.id}`)
      }
    >
      <div className="flex">
        <span className="w-30">
          <Tag
            folderId={retrospect.folderId}
            folderName={retrospect.folderName!}
          />
        </span>
        <span className="flex justify-start text-[var(--black)] text-sm font-medium leading-relaxed whitespace-nowrap">
          {retrospect.title}
        </span>
      </div>
      <span className="flex justify-start text-[var(--brand--black--default)] text-sm font-medium leading-relaxed whitespace-nowrap">
        {retrospect.reviewDate}
      </span>
    </div>
  )
}

export default HomeRetrospectItem
