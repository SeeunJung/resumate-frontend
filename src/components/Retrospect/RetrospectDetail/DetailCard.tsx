import type { IconProps } from '@/components/common/Icons'
import { mainText } from '../../../styles/customStyles'

interface DetailCardProps {
  question: string
  answer: string
  icon: React.ComponentType<IconProps>
}

function DetailCard({ question, answer, icon: Icon }: DetailCardProps) {
  return (
    <div className="flex flex-col self-stretch justify-start items-start gap-2">
      <div className="flex items-center justify-start gap-2">
        <div className="flex justify-center items-center p-2 bg-white rounded-full outline outline-offset-[-1px] outline-[var(--brand--blue--subtle)]">
          <Icon />
        </div>
        <span className="justify-center text-xl font-bold text-[var(--label--brand)] break-keep">
          {question}
        </span>
      </div>
      <div className="pl-14 inline-flex justify-center items-center gap-1">
        <div
          className={mainText(
            'flex-1',
            'justify-start',
            'leading-loose',
            'break-keep',
          )}
        >
          {answer}
        </div>
      </div>
    </div>
  )
}

export default DetailCard
