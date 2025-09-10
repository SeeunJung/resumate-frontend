import React from 'react'
import { Calendar } from '@/components/ui/calendar'

function CustomCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <div className="h-full overflow-y-scroll">
      <Calendar
        mode="single"
        defaultMonth={date}
        selected={date}
        onSelect={setDate}
        className="h-full w-full rounded-lg border-none shadow-md cursor-pointer"
      />
    </div>
  )
}

export default CustomCalendar
