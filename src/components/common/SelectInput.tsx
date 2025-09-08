import { cn } from '@/utils/cn'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface SelectInputProps {
  placeholder: string
  name?: string
  value: string
  onChange: (value: string) => void
  options: string[]
}

function SelectInput({
  placeholder,
  value,
  onChange,
  options,
}: SelectInputProps) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger
        className={cn(
          'flex',
          'justify-between',
          'w-full',
          'items-center',
          'text-black',
          'text-sm',
          'font-normal',
          'px-3',
          'py-2',
          'bg-white',
          'rounded-md',
          'border',
          'border-[var(--gray)]',
        )}
      >
        <SelectValue
          placeholder={placeholder}
          className="placeholder:text-[var(--label--subtle)]"
        />
      </SelectTrigger>

      <SelectContent className="bg-white rounded-md border shadow-md">
        {options.map((opt) => (
          <SelectItem
            key={opt}
            value={opt}
            className="cursor-pointer px-3 py-1.5 text-xs hover:bg-[var(--gray--light)]"
          >
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectInput
