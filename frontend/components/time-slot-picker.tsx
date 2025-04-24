"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getAvailableTimeSlots } from "@/lib/appointments"
import { useEffect, useState } from "react"

interface TimeSlotPickerProps {
  specialistId: number
  date: Date | null
  selectedTime: string | null
  onSelectTime: (time: string) => void
}

export function TimeSlotPicker({ specialistId, date, selectedTime, onSelectTime }: TimeSlotPickerProps) {
  const [timeSlots, setTimeSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTimeSlots = async () => {
      if (!date) return

      setLoading(true)
      try {
        const slots = await getAvailableTimeSlots(specialistId, date)
        setTimeSlots(slots)
      } catch (error) {
        console.error("Ошибка при получении доступных слотов времени:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTimeSlots()
  }, [specialistId, date])

  if (!date) {
    return <div className="text-center py-4 text-muted-foreground">Сначала выберите дату</div>
  }

  if (loading) {
    return <div className="text-center py-4 text-muted-foreground">Загрузка доступных слотов...</div>
  }

  if (timeSlots.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">Нет доступных слотов на выбранную дату</div>
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
      {timeSlots.map((time) => (
        <Button
          key={time}
          variant="outline"
          className={cn("h-10", selectedTime === time && "bg-primary text-primary-foreground")}
          onClick={() => onSelectTime(time)}
        >
          {time}
        </Button>
      ))}
    </div>
  )
}
