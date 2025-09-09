import { defaultInput } from '@/styles/customStyles'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '../ui/dropdown-menu'
import { cn } from '@/lib/utils'

// shadcn DropdownMenu를 활용한 SelectDropdown 컴포넌트
interface SelectDropdownProps {
  placeholder: string
  value: string
  options: Array<{ label: string; value: string | number; isSpecial?: boolean }>
  onChange: (value: string | number) => void
  disabled?: boolean
}

function SelectDropdown({
  placeholder,
  value,
  options,
  onChange,
  disabled = false,
}: SelectDropdownProps) {
  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            defaultInput('w-full'),
            disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer',
            'flex justify-between items-center',
          )}
          disabled={disabled}
        >
          <span
            className={value ? 'text-black' : 'text-[var(--label--subtle)]'}
          >
            {value || placeholder}
          </span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white w-full min-w-[200px]">
        {options.map((option, index) => (
          <div key={option.value}>
            {/* 특별한 옵션(새 폴더 추가 등) 앞에 구분선 추가 */}
            {option.isSpecial && index > 0 && <DropdownMenuSeparator />}

            <DropdownMenuItem
              className={cn(
                'cursor-pointer',
                option.isSpecial &&
                  'text-[var(--brand--blue--strong)] font-medium',
              )}
              onSelect={() => handleSelect(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SelectDropdown

// import { useEffect, useRef, useState } from "react";
// import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";

// interface SelectDropdownProps{
//   placeholder: string
//   value: string
//   options: Array<{label: string; value: string}>
//   onChange: (value: string) => void
//   disabled?: boolean
// }

// function SelectDropdown({placeholder, value, options, onChange, disabled} : DropdownProps){
//   const handleSelect = (optionValue: string) => {
//     onChange(optionValue)
//   }

//   return(
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button
//       </DropdownMenuTrigger>
//     </DropdownMenu>
//   )
// }
