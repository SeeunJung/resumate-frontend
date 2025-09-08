import Tooltip from '@/components/common/Tooltip'
import { Card } from '@/styles/customStyles'
import { useState } from 'react'

interface QuestionCardProps {
  label: string
  question: string
  explanation: string
  tooltip: string
}

function QuestionCard({
  label,
  question,
  explanation,
  tooltip,
}: QuestionCardProps) {
  const [text, setText] = useState('')
  const MAXLENGTH = 200

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setText(value)
  }

  const length = text.length
  const isOverLimit = length > MAXLENGTH

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
          <Tooltip instruction={tooltip} />
        </div>
      </div>

      <div className="w-full">
        <textarea
          placeholder="내용을 입력하세요"
          value={text}
          onChange={handleChange}
          className="w-full h-18 px-2 py-1 bg-white rounded-xl border border-[var(--brand--blue--strong)] placeholder:text-sm"
        />
      </div>

      <div className="flex justify-end items-center ml-auto">
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
  )
}

export default QuestionCard
