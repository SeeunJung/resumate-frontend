import { useEntryStore } from '@/stores/useEntryStore'
import { Card } from '@/styles/customStyles'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

interface QuestionCardProps {
  label: string
  question: string
  explanation: string
  name: string
}

function QuestionCard({
  label,
  question,
  explanation,
  name,
}: QuestionCardProps) {
  const { register, watch } = useFormContext()
  const text = watch(name) || ''
  const setFilled = useEntryStore((state) => state.setFilled)
  const MAXLENGTH = 200

  const length = text.length
  const isOverLimit = length > MAXLENGTH

  useEffect(() => {
    setFilled(name, text.trim().length > 0)
  }, [text, name, setFilled])

  return (
    <div
      className={Card(
        'flex',
        'flex-col',
        'justify-start',
        'items-start',
        'self-stretch',
        'bg-[var(--brand--blue--subtlest)]',
        'px-5',
        'py-6',
        'gap-4',
        'overflow-hidden',
        'rounded-[20px]',
        'outline',
        'outline-1',
        'outline-offset-[-1px]',
        'outline-[var(--brand--blue--subtle)]',
      )}
    >
      <div className="flex flex-col justify-start items-start gap-1">
        <span className="text-xs text-[var(--brand--blue--strong)] font-medium leading-relaxed">
          {label}
        </span>
        <h3 className="text-lg font-bold text-[var(--label--brand)]">
          {question}
        </h3>
        <div className="flex justify-start items-center gap-2">
          <span className="text-xs font-normal text-[var(--label--subtle)] leading-loose">
            {explanation}
          </span>
        </div>
      </div>

      <div className="w-full">
        <textarea
          placeholder="내용을 입력하세요"
          {...register(name)}
          className="w-full h-18 px-3 py-2 text-sm bg-white rounded-xl border border-[var(--brand--blue--strong)] placeholder:text-sm outline-[var(--brand--blue--strong)] resize-none"
        />
      </div>

      <div className="flex justify-between items-center w-full">
        {isOverLimit && (
          <p className="text-xs text-[var(--red--strong)]">
            {MAXLENGTH}자를 넘을 수 없습니다.
          </p>
        )}
        <div className="flex items-center ml-auto">
          <span
            className={`text-xs ${
              isOverLimit
                ? 'text-[var(--red--strong)]'
                : 'text-[var(--label--brand)]'
            }`}
          >
            {length}
          </span>
          <span className="text-xs">/{MAXLENGTH}</span>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
