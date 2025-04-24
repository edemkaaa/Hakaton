"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { services, specialists } from "@/lib/data"
import { AppointmentCalendar } from "@/components/appointment-calendar"
import { TimeSlotPicker } from "@/components/time-slot-picker"
import { createAppointmentByAdmin } from "@/lib/appointments"

export default function CreateAppointmentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    passportSeries: "",
    passportNumber: "",
    serviceId: "",
    subServiceId: "",
    specialistId: "",
  })
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const selectedService = services.find((service) => service.id === Number.parseInt(formData.serviceId))

  const subServices = selectedService?.subServices || []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return

    setLoading(true)
    try {
      await createAppointmentByAdmin({
        ...formData,
        serviceId: Number.parseInt(formData.serviceId),
        subServiceId: Number.parseInt(formData.subServiceId),
        specialistId: Number.parseInt(formData.specialistId),
        date: selectedDate,
        time: selectedTime,
      })
      router.push("/admin/appointments")
    } catch (error) {
      console.error("Ошибка при создании записи:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Создание записи</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Данные посетителя</CardTitle>
            <CardDescription>Введите данные посетителя для создания записи</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">ФИО</Label>
              <Input id="fullName" name="fullName" required value={formData.fullName} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passportSeries">Серия паспорта</Label>
                <Input
                  id="passportSeries"
                  name="passportSeries"
                  required
                  maxLength={4}
                  value={formData.passportSeries}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Номер паспорта</Label>
                <Input
                  id="passportNumber"
                  name="passportNumber"
                  required
                  maxLength={6}
                  value={formData.passportNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Услуга</Label>
              <Select
                value={formData.serviceId}
                onValueChange={(value) => {
                  handleSelectChange("serviceId", value)
                  handleSelectChange("subServiceId", "")
                }}
              >
                <SelectTrigger id="service">
                  <SelectValue placeholder="Выберите услугу" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id.toString()}>
                      {service.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.serviceId && (
              <div className="space-y-2">
                <Label htmlFor="subService">Подуслуга</Label>
                <Select
                  value={formData.subServiceId}
                  onValueChange={(value) => handleSelectChange("subServiceId", value)}
                >
                  <SelectTrigger id="subService">
                    <SelectValue placeholder="Выберите подуслугу" />
                  </SelectTrigger>
                  <SelectContent>
                    {subServices.map((subService) => (
                      <SelectItem key={subService.id} value={subService.id.toString()}>
                        {subService.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="specialist">Специалист</Label>
              <Select
                value={formData.specialistId}
                onValueChange={(value) => handleSelectChange("specialistId", value)}
              >
                <SelectTrigger id="specialist">
                  <SelectValue placeholder="Выберите специалиста" />
                </SelectTrigger>
                <SelectContent>
                  {specialists.map((specialist) => (
                    <SelectItem key={specialist.id} value={specialist.id.toString()}>
                      {specialist.name} - {specialist.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <Label>Дата приёма</Label>
              <AppointmentCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            </div>

            {selectedDate && formData.specialistId && (
              <div className="space-y-2">
                <Label>Время приёма</Label>
                <TimeSlotPicker
                  specialistId={Number.parseInt(formData.specialistId)}
                  date={selectedDate}
                  selectedTime={selectedTime}
                  onSelectTime={setSelectedTime}
                />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={
                !formData.fullName ||
                !formData.passportSeries ||
                !formData.passportNumber ||
                !formData.serviceId ||
                !formData.subServiceId ||
                !formData.specialistId ||
                !selectedDate ||
                !selectedTime ||
                loading
              }
            >
              {loading ? "Создание записи..." : "Создать запись"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
