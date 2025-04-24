"use client"
import { Calendar } from "@/components/ui/calendar"
import { ru } from "date-fns/locale"

interface AppointmentCalendarProps {
  selectedDate: Date | null
  onSelectDate: (date: Date | null) => void
}

export function AppointmentCalendar({ selectedDate, onSelectDate }: AppointmentCalendarProps) {
  // Получаем текущую дату
  const today = new Date()

  // Создаем дату через 3 месяца от текущей
  const threeMonthsFromNow = new Date()
  threeMonthsFromNow.setMonth(today.getMonth() + 3)

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onSelectDate}
      locale={ru}
      className="rounded-md border"
      fromDate={today}
      toDate={threeMonthsFromNow}
      disabled={[
        { dayOfWeek: [0, 6] }, // Отключаем выходные дни (воскресенье и суббота)
      ]}
    />
  )
}
