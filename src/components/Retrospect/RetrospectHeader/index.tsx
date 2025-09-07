import { useNavigate } from 'react-router-dom'
import { mainTitle } from '../../../styles/customStyles'
import Breadcrumb from '../../common/Breadcrumb'
import Button from '../../common/Button'

interface RetrospectiveHeaderProps {
  folderName: string
}

function RetrospectiveHeader({ folderName }: RetrospectiveHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="py-4 w-full max-w-screen mx-auto flex flex-col gap-8">
      <Breadcrumb />
      <div className="flex justify-between items-center">
        <h1 className={mainTitle()}>{folderName}</h1>
        <div className="flex gap-2">
          <Button
            size={'md'}
            variant={'line'}
            className="whitespace-nowrap"
            onClick={() => navigate('/retrospectives/new')}
          >
            회고 작성하기
          </Button>
          <Button
            size={'md'}
            variant={'black'}
            className="whitespace-nowrap"
          >
            자소서 재료 뽑기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RetrospectiveHeader
