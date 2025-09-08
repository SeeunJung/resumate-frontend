import type { IconProps } from '@/components/common/Icons'

interface ProgressIndicatorCardProps {
  sectionKey: string
  label: string
  filled: boolean
  icon: React.ComponentType<IconProps>
}

function ProgressIndicatorCard({
  sectionKey,
  label,
  filled,
  icon: Icon,
}: ProgressIndicatorCardProps) {
  return (
    <div
      className={`flex justify-between items-center w-full p-3 gap-4 rounded-sm overflow-hidden
        ${filled ? 'bg-[var(--brand--blue--subtler)] text-[var(--brand--blue--strong)]' : 'bg-white border-[var(--gray)]'}`}
    >
      <div className="flex flex-col flex-1 justify-start items-start gap-1 whitespace-nowrap">
        <h4 className="text-sm font-bold leading-loose">{label}</h4>
        <span className="text-xs text-[var(--label--subtle)] font-medium leading-tight">
          {sectionKey}
        </span>
      </div>

      <div className="flex justify-center items-center p-1.5 rounded-full border border-[var(--gray)] ">
        <Icon />
      </div>
    </div>
  )
}

export default ProgressIndicatorCard
