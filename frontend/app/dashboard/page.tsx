"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Notification } from "@/components/notification"
import { DashboardStats } from "@/components/dashboard-stats"
import { CalendarDays, MoreHorizontal, RefreshCw, X, Bell } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function Dashboard() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      id: 1,
      service: "Получение земельного участка",
      specialist: "Иванов И.И.",
      date: "15.05.2024",
      time: "12:00",
    },
  ])

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Запись подтверждена",
      message: "Ваша запись на приём по услуге 'Получение земельного участка' подтверждена.",
      date: "10.05.2024",
      read: false,
    },
  ])

  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isCancelOpen, setIsCancelOpen] = useState(false)
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)

  const handleOpenDetails = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsDetailsOpen(true)
  }

  const handleOpenCancel = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsCancelOpen(true)
  }

  const handleOpenReschedule = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsRescheduleOpen(true)
  }

  const handleCancelAppointment = () => {
    // API-запрос
    setUpcomingAppointments(upcomingAppointments.filter((a) => a.id !== selectedAppointment.id))
    setIsCancelOpen(false)

    setNotifications([
      {
        id: Date.now(),
        title: "Запись отменена",
        message: `Ваша запись на приём по услуге '${selectedAppointment.service}' была отменена.`,
        date: new Date().toLocaleDateString("ru-RU"),
        read: false,
      },
      ...notifications,
    ])
  }

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Личный кабинет</h1>
        <Button asChild className="rounded-full">
          <Link href="/dashboard/services">
            <CalendarDays className="mr-2 h-4 w-4" />
            Записаться на приём
          </Link>
        </Button>
      </div>

      <DashboardStats />

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5" />
              Предстоящие записи
            </CardTitle>
            <CardDescription>Ваши ближайшие записи на приём</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border rounded-xl p-4 hover:border-primary/50 transition-colors appointment-card"
                    onClick={() => handleOpenDetails(appointment)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{appointment.service}</h3>
                      <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">Подтверждено</div>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Специалист: {appointment.specialist}</p>
                      <p>Дата: {appointment.date}</p>
                      <p>Время: {appointment.time}</p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenCancel(appointment)
                        }}
                      >
                        <X className="mr-1 h-3 w-3" />
                        Отменить
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenReschedule(appointment)
                        }}
                      >
                        <RefreshCw className="mr-1 h-3 w-3" />
                        Перенести
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenDetails(appointment)}>Детали</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenCancel(appointment)}>Отменить</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenReschedule(appointment)}>
                            Перенести
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>У вас нет предстоящих записей</p>
                <Button asChild className="mt-4 rounded-full">
                  <Link href="/dashboard/services">Записаться на приём</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Уведомления
            </CardTitle>
            <CardDescription>Последние обновления и уведомления</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Notification key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>У вас нет новых уведомлений</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Диалог с деталями записи */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Детали записи</DialogTitle>
            <DialogDescription>Информация о вашей записи на приём</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Услуга</p>
                  <p>{selectedAppointment.service}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Специалист</p>
                  <p>{selectedAppointment.specialist}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Дата</p>
                  <p>{selectedAppointment.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Время</p>
                  <p>{selectedAppointment.time}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Статус</p>
                <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs inline-block mt-1">
                  Подтверждено
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Адрес</p>
                <p>г. Симферополь, ул. Севастопольская, д. 64, каб. 45</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Необходимые документы</p>
                <ul className="list-disc list-inside text-sm">
                  <li>Паспорт</li>
                  <li>СНИЛС</li>
                  <li>Заявление (будет выдано на месте)</li>
                </ul>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-row gap-2 sm:justify-between">
            <Button type="button" variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Закрыть
            </Button>
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
                  handleOpenReschedule(selectedAppointment)
                }}
              >
                Перенести
              </Button>
            </div>
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
                <strong>Услуга:</strong> {selectedAppointment.service}
              </p>
              <p>
                <strong>Дата и время:</strong> {selectedAppointment.date}, {selectedAppointment.time}
              </p>
              <p>
                <strong>Специалист:</strong> {selectedAppointment.specialist}
              </p>
            </div>
          )}
          <DialogFooter className="flex flex-row gap-2 sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setIsCancelOpen(false)}>
              Отмена
            </Button>
            <Button type="button" variant="destructive" onClick={handleCancelAppointment}>
              Подтвердить отмену
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог переноса записи */}
      <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Перенос записи</DialogTitle>
            <DialogDescription>Выберите новую дату и время для вашей записи</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-muted/50">
                <p>
                  <strong>Текущая дата и время:</strong> {selectedAppointment.date}, {selectedAppointment.time}
                </p>
                <p>
                  <strong>Услуга:</strong> {selectedAppointment.service}
                </p>
                <p>
                  <strong>Специалист:</strong> {selectedAppointment.specialist}
                </p>
              </div>
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Функция переноса записи будет доступна в ближайшее время
                </p>
                <Button type="button" variant="outline" onClick={() => setIsRescheduleOpen(false)}>
                  Закрыть
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
