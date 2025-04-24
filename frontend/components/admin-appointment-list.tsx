"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getAdminAppointments, markAppointmentAsCompleted } from "@/lib/appointments"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Appointment {
  id: number
  user: string
  service: string
  subService: string
  specialist: string
  date: string
  time: string
  status: "pending" | "completed" | "cancelled"
}

export function AdminAppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAdminAppointments()
        setAppointments(data)
      } catch (error) {
        console.error("Ошибка при получении записей:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const handleMarkAsCompleted = async (id: number) => {
    try {
      await markAppointmentAsCompleted(id)
      setAppointments((prev) =>
        prev.map((appointment) => (appointment.id === id ? { ...appointment, status: "completed" } : appointment)),
      )
    } catch (error) {
      console.error("Ошибка при отметке записи как завершенной:", error)
    }
  }

  if (loading) {
    return <div className="text-center py-6">Загрузка записей...</div>
  }

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialist.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const todayAppointments = filteredAppointments.filter(
    (appointment) => appointment.date === new Date().toLocaleDateString("ru-RU"),
  )
  const pendingAppointments = filteredAppointments.filter((appointment) => appointment.status === "pending")
  const completedAppointments = filteredAppointments.filter((appointment) => appointment.status === "completed")

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Поиск по имени, услуге..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="today">
        <TabsList className="mb-4">
          <TabsTrigger value="today">Сегодня</TabsTrigger>
          <TabsTrigger value="pending">Ожидающие</TabsTrigger>
          <TabsTrigger value="completed">Завершённые</TabsTrigger>
          <TabsTrigger value="all">Все</TabsTrigger>
        </TabsList>
        <TabsContent value="today">
          <AdminAppointmentTable appointments={todayAppointments} onMarkAsCompleted={handleMarkAsCompleted} />
        </TabsContent>
        <TabsContent value="pending">
          <AdminAppointmentTable appointments={pendingAppointments} onMarkAsCompleted={handleMarkAsCompleted} />
        </TabsContent>
        <TabsContent value="completed">
          <AdminAppointmentTable appointments={completedAppointments} onMarkAsCompleted={handleMarkAsCompleted} />
        </TabsContent>
        <TabsContent value="all">
          <AdminAppointmentTable appointments={filteredAppointments} onMarkAsCompleted={handleMarkAsCompleted} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AdminAppointmentTable({
  appointments,
  onMarkAsCompleted,
}: {
  appointments: Appointment[]
  onMarkAsCompleted: (id: number) => void
}) {
  if (appointments.length === 0) {
    return <div className="text-center py-6 text-muted-foreground">Нет записей</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium">Посетитель</th>
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
              <td className="py-3 px-4">{appointment.user}</td>
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
                    <Button variant="outline" size="sm" onClick={() => onMarkAsCompleted(appointment.id)}>
                      Отметить как завершенное
                    </Button>
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
