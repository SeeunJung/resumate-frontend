import useModal from '@/hooks/useModal'
import { mainTitle } from '../../../styles/customStyles'
import Breadcrumb from '../../common/Breadcrumb'
import DetailHeaderButtons from './DetailHeaderButtons'
import AlertModal from '@/components/common/AlertModal'
import Tag from '@/components/common/Tag'

interface DetailHeaderProps {
  title: string
  reviewDate: string
  retroId: number
  folderId: number
  folderName: string
  onEdit: () => void
}

function DetailHeader({
  title,
  reviewDate,
  retroId,
  folderId,
  folderName,
  onEdit,
}: DetailHeaderProps) {
  const { modalOpen, setModalOpen, modalContent, openModal } = useModal()

  return (
    <div className="py-4 w-full max-w-screen mx-auto flex flex-col gap-3">
      <Breadcrumb />
      <div className="inline-flex justify-between items-end">
        <div className="inline-flex flex-col justify-start items-start gap-1.5">
          <Tag
            folderId={folderId}
            folderName={folderName}
          />
          <div className="flex">
            <h2 className={mainTitle()}>{title}</h2>
          </div>
          <span className="text-xs text-[var(--label--default)]">
            {reviewDate}
          </span>
        </div>

        <DetailHeaderButtons
          retroId={retroId}
          onEdit={onEdit}
          openModal={openModal}
        />
        <AlertModal
          isOpen={modalOpen}
          onOpenChange={setModalOpen}
          contents={modalContent}
        />
      </div>
    </div>
  )
}

export default DetailHeader
