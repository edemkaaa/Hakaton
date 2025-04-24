"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Database, Mail, Save, Server, Smartphone } from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminSettingsPage() {
  const { theme, setTheme } = useTheme()

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    logLevel: "info",
    sessionTimeout: "30",
    maxUploadSize: "10",
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "admin@example.com",
    smtpPassword: "********",
    senderEmail: "no-reply@example.com",
    senderName: "Администрация города",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    adminEmailNotifications: true,
    userRegistrationNotifications: true,
    appointmentNotifications: true,
  })

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: "30",
    backupLocation: "local",
  })

  const handleSystemSettingChange = (key: string, value: any) => {
    setSystemSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleEmailSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmailSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (key: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }))
  }

  const handleBackupSettingChange = (key: string, value: any) => {
    setBackupSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSaveSettings = (settingType: string) => {
    toast({
      title: "Настройки сохранены",
      description: `Настройки ${settingType} были успешно сохранены.`,
      action: <ToastAction altText="Закрыть">Закрыть</ToastAction>,
    })
  }

  const handleBackupNow = () => {
    toast({
      title: "Резервное копирование",
      description: "Резервное копирование запущено. Это может занять некоторое время.",
      action: <ToastAction altText="Закрыть">Закрыть</ToastAction>,
    })
  }

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Настройки системы</h1>
      </div>

      <Tabs defaultValue="system" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            Система
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Уведомления
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Резервное копирование
          </TabsTrigger>
        </TabsList>

        <TabsContent value="system">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Системные настройки
              </CardTitle>
              <CardDescription>Настройте основные параметры работы системы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode" className="font-medium">
                      Режим обслуживания
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Временно отключить доступ к системе для пользователей
                    </p>
                  </div>
                  <Switch
                    id="maintenance-mode"
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => handleSystemSettingChange("maintenanceMode", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="debug-mode" className="font-medium">
                      Режим отладки
                    </Label>
                    <p className="text-sm text-muted-foreground">Включить подробное логирование для отладки</p>
                  </div>
                  <Switch
                    id="debug-mode"
                    checked={systemSettings.debugMode}
                    onCheckedChange={(checked) => handleSystemSettingChange("debugMode", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="log-level">Уровень логирования</Label>
                  <Select
                    value={systemSettings.logLevel}
                    onValueChange={(value) => handleSystemSettingChange("logLevel", value)}
                  >
                    <SelectTrigger id="log-level">
                      <SelectValue placeholder="Выберите уровень логирования" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="error">Только ошибки</SelectItem>
                      <SelectItem value="warn">Предупреждения и ошибки</SelectItem>
                      <SelectItem value="info">Информационные сообщения</SelectItem>
                      <SelectItem value="debug">Отладочная информация</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Время сессии (минуты)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => handleSystemSettingChange("sessionTimeout", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-upload-size">Максимальный размер загрузки (МБ)</Label>
                  <Input
                    id="max-upload-size"
                    type="number"
                    value={systemSettings.maxUploadSize}
                    onChange={(e) => handleSystemSettingChange("maxUploadSize", e.target.value)}
                  />
                </div>

                <Button className="w-full sm:w-auto" onClick={() => handleSaveSettings("системы")}>
                  <Save className="mr-2 h-4 w-4" />
                  Сохранить настройки
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Настройки Email
              </CardTitle>
              <CardDescription>Настройте параметры отправки электронной почты</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-server">SMTP сервер</Label>
                    <Input
                      id="smtp-server"
                      name="smtpServer"
                      value={emailSettings.smtpServer}
                      onChange={handleEmailSettingChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP порт</Label>
                    <Input
                      id="smtp-port"
                      name="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={handleEmailSettingChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-username">SMTP имя пользователя</Label>
                    <Input
                      id="smtp-username"
                      name="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={handleEmailSettingChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">SMTP пароль</Label>
                    <Input
                      id="smtp-password"
                      name="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={handleEmailSettingChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender-email">Email отправителя</Label>
                    <Input
                      id="sender-email"
                      name="senderEmail"
                      value={emailSettings.senderEmail}
                      onChange={handleEmailSettingChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-name">Имя отправителя</Label>
                    <Input
                      id="sender-name"
                      name="senderName"
                      value={emailSettings.senderName}
                      onChange={handleEmailSettingChange}
                    />
                  </div>
                </div>

                <Button className="w-full sm:w-auto" onClick={() => handleSaveSettings("email")}>
                  <Save className="mr-2 h-4 w-4" />
                  Сохранить настройки
                </Button>

                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    toast({
                      title: "Тестовое письмо",
                      description: "Тестовое письмо успешно отправлено.",
                      action: <ToastAction altText="Закрыть">Закрыть</ToastAction>,
                    })
                  }}
                >
                  Отправить тестовое письмо
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Настройки уведомлений
              </CardTitle>
              <CardDescription>Настройте параметры отправки уведомлений</CardDescription>
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
                        <p className="text-sm text-muted-foreground">Отправлять уведомления по email</p>
                      </div>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={() => handleNotificationChange("emailNotifications")}
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
                        <p className="text-sm text-muted-foreground">Отправлять уведомления по SMS</p>
                      </div>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={() => handleNotificationChange("smsNotifications")}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Типы уведомлений</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="admin-email-notifications" className="font-medium">
                        Уведомления администраторам
                      </Label>
                      <p className="text-sm text-muted-foreground">Отправлять уведомления администраторам</p>
                    </div>
                    <Switch
                      id="admin-email-notifications"
                      checked={notificationSettings.adminEmailNotifications}
                      onCheckedChange={() => handleNotificationChange("adminEmailNotifications")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="user-registration-notifications" className="font-medium">
                        Уведомления о регистрации
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Отправлять уведомления при регистрации новых пользователей
                      </p>
                    </div>
                    <Switch
                      id="user-registration-notifications"
                      checked={notificationSettings.userRegistrationNotifications}
                      onCheckedChange={() => handleNotificationChange("userRegistrationNotifications")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="appointment-notifications" className="font-medium">
                        Уведомления о записях
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Отправлять уведомления о новых и измененных записях
                      </p>
                    </div>
                    <Switch
                      id="appointment-notifications"
                      checked={notificationSettings.appointmentNotifications}
                      onCheckedChange={() => handleNotificationChange("appointmentNotifications")}
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full sm:w-auto" onClick={() => handleSaveSettings("уведомлений")}>
                <Save className="mr-2 h-4 w-4" />
                Сохранить настройки
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Резервное копирование
              </CardTitle>
              <CardDescription>Настройте параметры резервного копирования данных</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-backup" className="font-medium">
                      Автоматическое резервное копирование
                    </Label>
                    <p className="text-sm text-muted-foreground">Включить автоматическое резервное копирование</p>
                  </div>
                  <Switch
                    id="auto-backup"
                    checked={backupSettings.autoBackup}
                    onCheckedChange={(checked) => handleBackupSettingChange("autoBackup", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Частота резервного копирования</Label>
                  <Select
                    value={backupSettings.backupFrequency}
                    onValueChange={(value) => handleBackupSettingChange("backupFrequency", value)}
                  >
                    <SelectTrigger id="backup-frequency">
                      <SelectValue placeholder="Выберите частоту" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Каждый час</SelectItem>
                      <SelectItem value="daily">Ежедневно</SelectItem>
                      <SelectItem value="weekly">Еженедельно</SelectItem>
                      <SelectItem value="monthly">Ежемесячно</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup-retention">Срок хранения резервных копий (дни)</Label>
                  <Input
                    id="backup-retention"
                    type="number"
                    value={backupSettings.backupRetention}
                    onChange={(e) => handleBackupSettingChange("backupRetention", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup-location">Место хранения резервных копий</Label>
                  <Select
                    value={backupSettings.backupLocation}
                    onValueChange={(value) => handleBackupSettingChange("backupLocation", value)}
                  >
                    <SelectTrigger id="backup-location">
                      <SelectValue placeholder="Выберите место хранения" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Локальное хранилище</SelectItem>
                      <SelectItem value="cloud">Облачное хранилище</SelectItem>
                      <SelectItem value="ftp">FTP-сервер</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="w-full sm:w-auto" onClick={() => handleSaveSettings("резервного копирования")}>
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить настройки
                  </Button>

                  <Button variant="outline" className="w-full sm:w-auto" onClick={handleBackupNow}>
                    <Database className="mr-2 h-4 w-4" />
                    Создать резервную копию сейчас
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
