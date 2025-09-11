import { mainTitle } from '@/styles/customStyles'
import Breadcrumb from '../common/Breadcrumb'

interface AnalysisHeaderProps {
  folderName: string
}

function AnalysisHeader({ folderName }: AnalysisHeaderProps) {
  return (
    <div className="py-4 w-full max-w-screen mx-auto flex flex-col gap-8">
      <Breadcrumb />
      <div className="flex justify-between items-center">
        <h1 className={mainTitle()}>{folderName}</h1>
      </div>
    </div>
  )
}

export default AnalysisHeader
