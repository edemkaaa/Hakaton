"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Lock, Mail, Moon, Smartphone } from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
    push: true,
    reminders: true,
    statusUpdates: true,
    marketing: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    shareData: false,
    analytics: true,
  })

  const handleNotificationChange = (key: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))

    toast({
      title: "Настройки обновлены",
      description: "Ваши настройки уведомлений были успешно сохранены.",
      action: <ToastAction altText="Отменить">Отменить</ToastAction>,
    })
  }

  const handlePrivacyChange = (key: string) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))

    toast({
      title: "Настройки обновлены",
      description: "Ваши настройки конфиденциальности были успешно сохранены.",
      action: <ToastAction altText="Отменить">Отменить</ToastAction>,
    })
  }

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Настройки</h1>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Уведомления
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Moon className="h-4 w-4" />
            Внешний вид
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Приватность
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>
                Настройте способы получения уведомлений о ваших записях и других событиях
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Каналы уведомлений</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label htmlFor="email-notifications" className="font-medium">
                          Email уведомления
                        </Label>
                        <p className="text-sm text-muted-foreground">Получать уведомления на email</p>
                      </div>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.email}
                      onCheckedChange={() => handleNotificationChange("email")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label htmlFor="sms-notifications" className="font-medium">
                          SMS уведомления
                        </Label>
                        <p className="text-sm text-muted-foreground">Получать уведомления по SMS</p>
                      </div>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notificationSettings.sms}
                      onCheckedChange={() => handleNotificationChange("sms")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <Label htmlFor="push-notifications" className="font-medium">
                          Push-уведомления
                        </Label>
                        <p className="text-sm text-muted-foreground">Получать push-уведомления в браузере</p>
                      </div>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notificationSettings.push}
                      onCheckedChange={() => handleNotificationChange("push")}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Типы уведомлений</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reminders" className="font-medium">
                        Напоминания о записях
                      </Label>
                      <p className="text-sm text-muted-foreground">Напоминания о предстоящих записях</p>
                    </div>
                    <Switch
                      id="reminders"
                      checked={notificationSettings.reminders}
                      onCheckedChange={() => handleNotificationChange("reminders")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="status-updates" className="font-medium">
                        Обновления статуса
                      </Label>
                      <p className="text-sm text-muted-foreground">Уведомления об изменении статуса записей</p>
                    </div>
                    <Switch
                      id="status-updates"
                      checked={notificationSettings.statusUpdates}
                      onCheckedChange={() => handleNotificationChange("statusUpdates")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing" className="font-medium">
                        Маркетинговые сообщения
                      </Label>
                      <p className="text-sm text-muted-foreground">Информация о новых услугах и акциях</p>
                    </div>
                    <Switch
                      id="marketing"
                      checked={notificationSettings.marketing}
                      onCheckedChange={() => handleNotificationChange("marketing")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Настройки внешнего вида</CardTitle>
              <CardDescription>Настройте внешний вид приложения по вашему вкусу</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Тема</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${theme === "light" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setTheme("light")}
                  >
                    <div className="h-20 bg-white border rounded-md mb-2"></div>
                    <p className="font-medium text-center">Светлая</p>
                  </div>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${theme === "dark" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setTheme("dark")}
                  >
                    <div className="h-20 bg-gray-900 border rounded-md mb-2"></div>
                    <p className="font-medium text-center">Тёмная</p>
                  </div>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${theme === "system" ? "border-primary bg-primary/5" : ""}`}
                    onClick={() => setTheme("system")}
                  >
                    <div className="h-20 bg-gradient-to-r from-white to-gray-900 border rounded-md mb-2"></div>
                    <p className="font-medium text-center">Системная</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Настройки конфиденциальности</CardTitle>
              <CardDescription>Управляйте настройками конфиденциальности вашего аккаунта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Данные и аналитика</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="share-data" className="font-medium">
                        Обмен данными
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Разрешить обмен анонимными данными для улучшения сервиса
                      </p>
                    </div>
                    <Switch
                      id="share-data"
                      checked={privacySettings.shareData}
                      onCheckedChange={() => handlePrivacyChange("shareData")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics" className="font-medium">
                        Аналитика использования
                      </Label>
                      <p className="text-sm text-muted-foreground">Разрешить сбор данных о использовании приложения</p>
                    </div>
                    <Switch
                      id="analytics"
                      checked={privacySettings.analytics}
                      onCheckedChange={() => handlePrivacyChange("analytics")}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Управление данными</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Экспортировать мои данные
                  </Button>
                  <Button variant="destructive" className="w-full sm:w-auto">
                    Удалить мой аккаунт
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
