import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, FileText } from "lucide-react"
import Link from "next/link"
import { AppointmentList } from "@/components/appointment-list"

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Мои записи</h1>
        <Button asChild>
          <Link href="/dashboard/services">Новая запись</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <CalendarDays className="h-12 w-12 text-primary mb-4" />
            <p className="text-2xl font-bold">1</p>
            <p className="text-muted-foreground">Предстоящие</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <Clock className="h-12 w-12 text-primary mb-4" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-muted-foreground">Завершённые</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <FileText className="h-12 w-12 text-primary mb-4" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-muted-foreground">Отменённые</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все записи</CardTitle>
          <CardDescription>История ваших записей на приём</CardDescription>
        </CardHeader>
        <CardContent>
          <AppointmentList />
        </CardContent>
      </Card>
    </div>
  )
}
