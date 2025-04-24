import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, FileText, Users } from "lucide-react"
import Link from "next/link"
import { AdminAppointmentList } from "@/components/admin-appointment-list"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Панель администратора</h1>
        <Button asChild>
          <Link href="/admin/appointments/create">Создать запись</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <CalendarDays className="h-12 w-12 text-primary mb-4" />
            <p className="text-2xl font-bold">12</p>
            <p className="text-muted-foreground">Записей сегодня</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <Clock className="h-12 w-12 text-primary mb-4" />
            <p className="text-2xl font-bold">5</p>
            <p className="text-muted-foreground">Ожидают</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <FileText className="h-12 w-12 text-primary mb-4" />
            <p className="text-2xl font-bold">3</p>
            <p className="text-muted-foreground">Завершено</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <Users className="h-12 w-12 text-primary mb-4" />
            <p className="text-2xl font-bold">45</p>
            <p className="text-muted-foreground">Пользователей</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Сегодняшние записи</CardTitle>
          <CardDescription>Записи на приём на сегодня</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminAppointmentList />
        </CardContent>
      </Card>
    </div>
  )
}
