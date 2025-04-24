"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getUserAppointments } from "@/lib/appointments"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Appointment {
  id: number
  service: string
  subService: string
  specialist: string
  date: string
  time: string
  status: "pending" | "completed" | "cancelled"
}

export function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getUserAppointments()
        setAppointments(data)
      } catch (error) {
        console.error("Ошибка при получении записей:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  if (loading) {
    return <div className="text-center py-6">Загрузка записей...</div>
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">У вас пока нет записей на приём</p>
        <Button>Записаться на приём</Button>
      </div>
    )
  }

  const pendingAppointments = appointments.filter((appointment) => appointment.status === "pending")
  const completedAppointments = appointments.filter((appointment) => appointment.status === "completed")
  const cancelledAppointments = appointments.filter((appointment) => appointment.status === "cancelled")

  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4">
        <TabsTrigger value="all">Все</TabsTrigger>
        <TabsTrigger value="pending">Предстоящие</TabsTrigger>
        <TabsTrigger value="completed">Завершённые</TabsTrigger>
        <TabsTrigger value="cancelled">Отменённые</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <AppointmentTable appointments={appointments} />
      </TabsContent>
      <TabsContent value="pending">
        <AppointmentTable appointments={pendingAppointments} />
      </TabsContent>
      <TabsContent value="completed">
        <AppointmentTable appointments={completedAppointments} />
      </TabsContent>
      <TabsContent value="cancelled">
        <AppointmentTable appointments={cancelledAppointments} />
      </TabsContent>
    </Tabs>
  )
}

function AppointmentTable({ appointments }: { appointments: Appointment[] }) {
  if (appointments.length === 0) {
    return <div className="text-center py-6 text-muted-foreground">Нет записей</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium">Услуга</th>
            <th className="py-3 px-4 text-left font-medium">Специалист</th>
            <th className="py-3 px-4 text-left font-medium">Дата</th>
            <th className="py-3 px-4 text-left font-medium">Время</th>
            <th className="py-3 px-4 text-left font-medium">Статус</th>
            <th className="py-3 px-4 text-left font-medium">Действия</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border-b">
              <td className="py-3 px-4">{appointment.service}</td>
              <td className="py-3 px-4">{appointment.specialist}</td>
              <td className="py-3 px-4">{appointment.date}</td>
              <td className="py-3 px-4">{appointment.time}</td>
              <td className="py-3 px-4">
                <StatusBadge status={appointment.status} />
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  {appointment.status === "pending" && (
                    <>
                      <Button variant="outline" size="sm">
                        Отменить
                      </Button>
                      <Button variant="outline" size="sm">
                        Перенести
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm">
                    Детали
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  let className = "inline-block px-2 py-1 rounded text-xs "
  let label = ""

  switch (status) {
    case "pending":
      className += "bg-blue-100 text-blue-800"
      label = "Ожидается"
      break
    case "completed":
      className += "bg-green-100 text-green-800"
      label = "Завершено"
      break
    case "cancelled":
      className += "bg-red-100 text-red-800"
      label = "Отменено"
      break
    default:
      className += "bg-gray-100 text-gray-800"
      label = status
  }

  return <span className={className}>{label}</span>
}
