import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock, FileText, Users } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <Card className="border-none shadow-md overflow-hidden service-card">
        <div className="h-2 bg-primary"></div>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>
          <p className="text-2xl font-bold">1</p>
          <p className="text-muted-foreground text-center">Предстоящие записи</p>
        </CardContent>
      </Card>
      <Card className="border-none shadow-md overflow-hidden service-card">
        <div className="h-2 bg-primary"></div>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <p className="text-2xl font-bold">0</p>
          <p className="text-muted-foreground text-center">Завершённые приёмы</p>
        </CardContent>
      </Card>
      <Card className="border-none shadow-md overflow-hidden service-card">
        <div className="h-2 bg-primary"></div>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <p className="text-2xl font-bold">3</p>
          <p className="text-muted-foreground text-center">Доступные услуги</p>
        </CardContent>
      </Card>
      <Card className="border-none shadow-md overflow-hidden service-card">
        <div className="h-2 bg-primary"></div>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <p className="text-2xl font-bold">5</p>
          <p className="text-muted-foreground text-center">Специалистов</p>
        </CardContent>
      </Card>
    </div>
  )
}
