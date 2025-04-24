"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { services, specialists } from "@/lib/data"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentCalendar } from "@/components/appointment-calendar"
import { TimeSlotPicker } from "@/components/time-slot-picker"
import { createAppointment } from "@/lib/appointments"

export default function SubServiceBookingPage({
  params,
}: {
  params: { serviceId: string; subServiceId: string }
}) {
  const router = useRouter()
  const serviceId = Number.parseInt(params.serviceId)
  const subServiceId = Number.parseInt(params.subServiceId)

  const service = services.find((s) => s.id === serviceId)
  const subService = service?.subServices.find((s) => s.id === subServiceId)

  const [selectedSpecialist, setSelectedSpecialist] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (!service || !subService) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Услуга не найдена</h1>
        <Button asChild>
          <Link href="/dashboard/services">Вернуться к списку услуг</Link>
        </Button>
      </div>
    )
  }

  const filteredSpecialists = specialists.filter((specialist) => specialist.services.includes(serviceId))

  const handleBookAppointment = async () => {
    if (!selectedSpecialist || !selectedDate || !selectedTime) {
      return
    }

    setLoading(true)
    try {
      await createAppointment({
        serviceId,
        subServiceId,
        specialistId: selectedSpecialist,
        date: selectedDate,
        time: selectedTime,
      })

      router.push("/dashboard/appointments")
    } catch (error) {
      console.error("Ошибка при создании записи:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/services/${serviceId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{subService.title}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Запись на приём</CardTitle>
          <CardDescription>Выберите специалиста, дату и время для записи</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">1. Выберите специалиста</h3>
              <RadioGroup
                value={selectedSpecialist?.toString()}
                onValueChange={(value) => setSelectedSpecialist(Number.parseInt(value))}
              >
                <div className="grid gap-4">
                  {filteredSpecialists.map((specialist) => (
                    <div
                      key={specialist.id}
                      className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:border-primary"
                      onClick={() => setSelectedSpecialist(specialist.id)}
                    >
                      <RadioGroupItem value={specialist.id.toString()} id={`specialist-${specialist.id}`} />
                      <Label htmlFor={`specialist-${specialist.id}`} className="flex-1 cursor-pointer">
                        <div className="font-medium">{specialist.name}</div>
                        <div className="text-sm text-muted-foreground">{specialist.position}</div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {selectedSpecialist && (
              <div>
                <h3 className="text-lg font-medium mb-4">2. Выберите дату и время</h3>
                <Tabs defaultValue="calendar">
                  <TabsList className="mb-4">
                    <TabsTrigger value="calendar">
                      <Calendar className="h-4 w-4 mr-2" />
                      Календарь
                    </TabsTrigger>
                    <TabsTrigger value="time">
                      <Clock className="h-4 w-4 mr-2" />
                      Время
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="calendar">
                    <AppointmentCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
                  </TabsContent>
                  <TabsContent value="time">
                    <TimeSlotPicker
                      specialistId={selectedSpecialist}
                      date={selectedDate}
                      selectedTime={selectedTime}
                      onSelectTime={setSelectedTime}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            )}

            <div className="pt-4 border-t">
              <Button
                onClick={handleBookAppointment}
                disabled={!selectedSpecialist || !selectedDate || !selectedTime || loading}
                className="w-full"
              >
                {loading ? "Создание записи..." : "Записаться на приём"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
