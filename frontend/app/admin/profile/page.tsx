"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Lock, Mail, Phone, User } from "lucide-react"

export default function AdminProfilePage() {
  const [personalData, setPersonalData] = useState({
    fullName: "Администратор Системы",
    email: "admin@example.com",
    phone: "+7 (999) 123-45-67",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [loading, setLoading] = useState(false)

  const handlePersonalDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdatePersonalData = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Имитация задержки сети
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Профиль обновлен",
        description: "Ваши личные данные были успешно обновлены.",
        action: <ToastAction altText="Закрыть">Закрыть</ToastAction>,
      })
    }, 1000)
  }

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Новый пароль и подтверждение не совпадают.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Имитация задержки сети
    setTimeout(() => {
      setLoading(false)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast({
        title: "Пароль обновлен",
        description: "Ваш пароль был успешно изменен.",
        action: <ToastAction altText="Закрыть">Закрыть</ToastAction>,
      })
    }, 1000)
  }

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Профиль администратора</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="border-none shadow-md md:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Аватар" />
                <AvatarFallback className="text-2xl">АС</AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>Администратор Системы</CardTitle>
            <CardDescription>admin@example.com</CardDescription>
            <div className="flex justify-center mt-2">
              <Badge>Администратор</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Логин</p>
                  <p className="font-medium">admin</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">admin@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Телефон</p>
                  <p className="font-medium">+7 (999) 123-45-67</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full rounded-full" variant="outline">
              Загрузить фото
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-md md:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Настройки профиля</CardTitle>
                <TabsList>
                  <TabsTrigger value="personal">Личные данные</TabsTrigger>
                  <TabsTrigger value="security">Безопасность</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>Управляйте своими личными данными и настройками безопасности</CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="personal">
                <form onSubmit={handleUpdatePersonalData}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">ФИО</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={personalData.fullName}
                        onChange={handlePersonalDataChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={personalData.email}
                        onChange={handlePersonalDataChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" name="phone" value={personalData.phone} onChange={handlePersonalDataChange} />
                    </div>
                    <Button type="submit" className="w-full rounded-full" disabled={loading}>
                      {loading ? "Сохранение..." : "Сохранить изменения"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="security">
                <form onSubmit={handleUpdatePassword}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Текущий пароль</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          className="pl-10"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Новый пароль</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          className="pl-10"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          className="pl-10"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full rounded-full" disabled={loading}>
                      {loading ? "Сохранение..." : "Изменить пароль"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
