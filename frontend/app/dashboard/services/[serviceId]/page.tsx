"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight, FileText } from "lucide-react"
import Link from "next/link"
import { services } from "@/lib/data"

export default function ServiceDetailsPage({
  params,
}: {
  params: { serviceId: string }
}) {
  const router = useRouter()
  const serviceId = Number.parseInt(params.serviceId)
  const service = services.find((s) => s.id === serviceId)

  if (!service) {
    return (
      <div className="container mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Услуга не найдена</h1>
        <Button asChild className="rounded-full">
          <Link href="/dashboard/services">Вернуться к списку услуг</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild className="rounded-full">
          <Link href="/dashboard/services">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{service.title}</h1>
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <div className="h-2 bg-primary"></div>
        <CardHeader>
          <CardTitle>Описание услуги</CardTitle>
          <CardDescription>{service.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-6">{service.fullDescription}</p>
          <div className="border-t pt-6 mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-medium">Необходимые документы:</h3>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-4">
              {service.requiredDocuments.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8">Доступные подуслуги</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {service.subServices.map((subService) => (
          <Card key={subService.id} className="border-none shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-2 bg-primary"></div>
            <CardHeader>
              <CardTitle>{subService.title}</CardTitle>
              <CardDescription>{subService.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Button asChild className="w-full rounded-full">
                <Link href={`/dashboard/services/${serviceId}/sub/${subService.id}`}>
                  Выбрать <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
