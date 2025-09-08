import { Card } from '@/styles/customStyles'
import InfoInput from './InfoInput'
function InfoCard() {
  return (
    <div
      className={Card(
        'flex',
        'flex-col',
        'justify-start',
        'items-start',
        'px-5',
        'py-6',
        'gap-4',
        'bg-[var(--white)]',
        'rounded-[20px]',
        'outline',
        'outline-1',
        'outline-offset-[-1px]',
        'outline-[var(--brand--blue--subtle)]',
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="justify-center text-[var(--label--subtle)] text-xs font-medium leading-relaxed">
          Info
        </span>
        <h3 className="justify-center text-lg font-bold">회고 기본 정보</h3>
      </div>

      <InfoInput />
    </div>
  )
}

export default InfoCard
