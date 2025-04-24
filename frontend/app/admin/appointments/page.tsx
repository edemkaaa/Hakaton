"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Check, ChevronLeft, ChevronRight, Clock, FileText, MoreHorizontal, Search, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAdminAppointments, markAppointmentAsCompleted } from "@/lib/appointments"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination"

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

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isCompleteOpen, setIsCompleteOpen] = useState(false)
  const [isCancelOpen, setIsCancelOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDate, setFilterDate] = useState("all")

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
      setIsCompleteOpen(false)
    } catch (error) {
      console.error("Ошибка при отметке записи как завершенной:", error)
    }
  }

  const handleCancelAppointment = async (id: number) => {
    try {
      // В реальном приложении здесь будет API-запрос
      setAppointments((prev) =>
        prev.map((appointment) => (appointment.id === id ? { ...appointment, status: "cancelled" } : appointment)),
      )
      setIsCancelOpen(false)
    } catch (error) {
      console.error("Ошибка при отмене записи:", error)
    }
  }

  const handleOpenDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailsOpen(true)
  }

  const handleOpenComplete = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsCompleteOpen(true)
  }

  const handleOpenCancel = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsCancelOpen(true)
  }

  const filteredAppointments = appointments.filter(
    (appointment) =>
      (appointment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.specialist.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || appointment.status === filterStatus) &&
      (filterDate === "all" ||
        (filterDate === "today" && appointment.date === new Date().toLocaleDateString("ru-RU")) ||
        (filterDate === "tomorrow" &&
          appointment.date === new Date(Date.now() + 86400000).toLocaleDateString("ru-RU")) ||
        (filterDate === "week" &&
          new Date(appointment.date.split(".").reverse().join("-")) <= new Date(Date.now() + 7 * 86400000))),
  )

  const todayAppointments = filteredAppointments.filter(
    (appointment) => appointment.date === new Date().toLocaleDateString("ru-RU"),
  )
  const pendingAppointments = filteredAppointments.filter((appointment) => appointment.status === "pending")
  const completedAppointments = filteredAppointments.filter((appointment) => appointment.status === "completed")
  const cancelledAppointments = filteredAppointments.filter((appointment) => appointment.status === "cancelled")

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Управление записями</h1>
        </div>
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Загрузка записей...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Управление записями</h1>
        <Button asChild className="rounded-full">
          <Link href="/admin/appointments/create">
            <Calendar className="mr-2 h-4 w-4" />
            Создать запись
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-none shadow-md overflow-hidden service-card">
          <div className="h-2 bg-primary"></div>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">{todayAppointments.length}</p>
            <p className="text-muted-foreground text-center">Записей сегодня</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md overflow-hidden service-card">
          <div className="h-2 bg-primary"></div>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">{pendingAppointments.length}</p>
            <p className="text-muted-foreground text-center">Ожидают</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md overflow-hidden service-card">
          <div className="h-2 bg-primary"></div>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">{completedAppointments.length}</p>
            <p className="text-muted-foreground text-center">Завершено</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md overflow-hidden service-card">
          <div className="h-2 bg-primary"></div>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <X className="h-6 w-6 text-primary" />
            </div>
            <p className="text-2xl font-bold">{cancelledAppointments.length}</p>
            <p className="text-muted-foreground text-center">Отменено</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск по имени, услуге..."
              className="pl-10 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="pending">Ожидающие</SelectItem>
                <SelectItem value="completed">Завершённые</SelectItem>
                <SelectItem value="cancelled">Отменённые</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Дата" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все даты</SelectItem>
                <SelectItem value="today">Сегодня</SelectItem>
                <SelectItem value="tomorrow">Завтра</SelectItem>
                <SelectItem value="week">Ближайшая неделя</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="today">
          <TabsList className="mb-4">
            <TabsTrigger value="today">Сегодня</TabsTrigger>
            <TabsTrigger value="pending">Ожидающие</TabsTrigger>
            <TabsTrigger value="completed">Завершённые</TabsTrigger>
            <TabsTrigger value="all">Все</TabsTrigger>
          </TabsList>
          <TabsContent value="today">
            <AdminAppointmentTable
              appointments={todayAppointments}
              onMarkAsCompleted={handleOpenComplete}
              onCancelAppointment={handleOpenCancel}
              onViewDetails={handleOpenDetails}
            />
          </TabsContent>
          <TabsContent value="pending">
            <AdminAppointmentTable
              appointments={pendingAppointments}
              onMarkAsCompleted={handleOpenComplete}
              onCancelAppointment={handleOpenCancel}
              onViewDetails={handleOpenDetails}
            />
          </TabsContent>
          <TabsContent value="completed">
            <AdminAppointmentTable
              appointments={completedAppointments}
              onMarkAsCompleted={handleOpenComplete}
              onCancelAppointment={handleOpenCancel}
              onViewDetails={handleOpenDetails}
            />
          </TabsContent>
          <TabsContent value="all">
            <AdminAppointmentTable
              appointments={filteredAppointments}
              onMarkAsCompleted={handleOpenComplete}
              onCancelAppointment={handleOpenCancel}
              onViewDetails={handleOpenDetails}
            />
          </TabsContent>
        </Tabs>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink className="rounded-full">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Пред.
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="rounded-full" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="rounded-full">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="rounded-full">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className="rounded-full">
                След.
                <ChevronRight className="h-4 w-4 ml-2" />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Диалог с деталями записи */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Детали записи</DialogTitle>
            <DialogDescription>Информация о записи на приём</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Посетитель</p>
                  <p>{selectedAppointment.user}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Услуга</p>
                  <p>{selectedAppointment.service}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Специалист</p>
                  <p>{selectedAppointment.specialist}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Дата и время</p>
                  <p>
                    {selectedAppointment.date}, {selectedAppointment.time}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Статус</p>
                <StatusBadge status={selectedAppointment.status} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Контактная информация</p>
                <p>Телефон: +7 (999) 123-45-67</p>
                <p>Email: user@example.com</p>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-row gap-2 sm:justify-between">
            <Button type="button" variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Закрыть
            </Button>
            {selectedAppointment && selectedAppointment.status === "pending" && (
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDetailsOpen(false)
                    handleOpenCancel(selectedAppointment)
                  }}
                >
                  Отменить запись
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setIsDetailsOpen(false)
                    handleOpenComplete(selectedAppointment)
                  }}
                >
                  Отметить как завершенную
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог завершения записи */}
      <Dialog open={isCompleteOpen} onOpenChange={setIsCompleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Завершение записи</DialogTitle>
            <DialogDescription>Вы уверены, что хотите отметить запись как завершенную?</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <p>
                <strong>Посетитель:</strong> {selectedAppointment.user}
              </p>
              <p>
                <strong>Услуга:</strong> {selectedAppointment.service}
              </p>
              <p>
                <strong>Дата и время:</strong> {selectedAppointment.date}, {selectedAppointment.time}
              </p>
            </div>
          )}
          <DialogFooter className="flex flex-row gap-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setIsCompleteOpen(false)}>
              Отмена
            </Button>
            <Button type="button" onClick={() => selectedAppointment && handleMarkAsCompleted(selectedAppointment.id)}>
              Подтвердить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог отмены записи */}
      <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Отмена записи</DialogTitle>
            <DialogDescription>Вы уверены, что хотите отменить запись на приём?</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <p>
                <strong>Посетитель:</strong> {selectedAppointment.user}
              </p>
              <p>
                <strong>Услуга:</strong> {selectedAppointment.service}
              </p>
              <p>
                <strong>Дата и время:</strong> {selectedAppointment.date}, {selectedAppointment.time}
              </p>
            </div>
          )}
          <DialogFooter className="flex flex-row gap-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setIsCancelOpen(false)}>
              Отмена
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => selectedAppointment && handleCancelAppointment(selectedAppointment.id)}
            >
              Подтвердить отмену
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function AdminAppointmentTable({
  appointments,
  onMarkAsCompleted,
  onCancelAppointment,
  onViewDetails,
}: {
  appointments: Appointment[]
  onMarkAsCompleted: (appointment: Appointment) => void
  onCancelAppointment: (appointment: Appointment) => void
  onViewDetails: (appointment: Appointment) => void
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
            <tr
              key={appointment.id}
              className="border-b hover:bg-muted/50 cursor-pointer"
              onClick={() => onViewDetails(appointment)}
            >
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onViewDetails(appointment)
                          }}
                        >
                          Детали
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onMarkAsCompleted(appointment)
                          }}
                        >
                          Отметить как завершенную
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation()
                            onCancelAppointment(appointment)
                          }}
                        >
                          Отменить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                  {appointment.status !== "pending" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewDetails(appointment)
                      }}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  )}
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
  let className = "inline-block px-2 py-1 rounded-full text-xs "
  let label = ""

  switch (status) {
    case "pending":
      className += "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      label = "Ожидается"
      break
    case "completed":
      className += "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      label = "Завершено"
      break
    case "cancelled":
      className += "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      label = "Отменено"
      break
    default:
      className += "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      label = status
  }

  return <span className={className}>{label}</span>
}
