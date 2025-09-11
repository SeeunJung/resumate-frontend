import { useNavigate } from 'react-router-dom'
import { mainTitle } from '../../../styles/customStyles'
import Button from '../../common/Button'
import AddFolderModal from '@/components/common/Modal'
import CustomBreadcrumb from '../../common/Breadcrumb'

interface RetrospectiveHeaderProps {
  folderName: string
  folderId: number
  onAnalysisClick?: () => void
}

function RetrospectiveHeader({
  folderName,
  folderId,
  onAnalysisClick,
}: RetrospectiveHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="py-4 w-full max-w-screen mx-auto flex flex-col gap-8">
      <CustomBreadcrumb folderName={folderName} />
      <div className="flex justify-between items-center">
        <h1 className={mainTitle()}>{folderName}</h1>
        <div className="flex gap-2">
          <AddFolderModal
            parentId={folderId}
            trigger={
              <Button
                size={'md'}
                variant={'line'}
                className="whitespace-nowrap"
              >
                태그 추가하기
              </Button>
            }
          />

          <Button
            size={'md'}
            variant={'line'}
            className="whitespace-nowrap"
            onClick={() => navigate('/retrospects/new')}
          >
            회고 작성하기
          </Button>
          <Button
            size={'md'}
            variant={'black'}
            className="whitespace-nowrap"
            onClick={onAnalysisClick}
          >
            자소서 소재 뽑기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RetrospectiveHeader
