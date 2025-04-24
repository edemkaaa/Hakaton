"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateUserProfile } from "@/lib/auth"

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    fullName: "Иванов Иван Иванович",
    passportSeries: "1234",
    passportNumber: "567890",
    snils: "123-456-789 01",
    email: "ivanov@mail.ru",
    phone: "+7 (978) 123-45-67",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      await updateUserProfile(formData)
      setSuccess(true)
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Профиль</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Личные данные</CardTitle>
            <CardDescription>Обновите ваши личные данные и контактную информацию</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {success && (
              <div className="p-3 bg-green-50 text-green-600 text-sm rounded-md">Профиль успешно обновлен</div>
            )}
            <div className="space-y-2">
              <Label htmlFor="fullName">ФИО</Label>
              <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passportSeries">Серия паспорта</Label>
                <Input
                  id="passportSeries"
                  name="passportSeries"
                  value={formData.passportSeries}
                  onChange={handleChange}
                  maxLength={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Номер паспорта</Label>
                <Input
                  id="passportNumber"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  maxLength={6}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="snils">СНИЛС</Label>
              <Input id="snils" name="snils" value={formData.snils} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Сохранение..." : "Сохранить изменения"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Изменить пароль</CardTitle>
          <CardDescription>Обновите ваш пароль для входа в систему</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Текущий пароль</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Новый пароль</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
            <Input id="confirmPassword" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Изменить пароль</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
